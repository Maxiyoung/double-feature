import type { IncomingMessage, ServerResponse } from 'node:http';

type CuratorialLens =
  | 'THEMATIC_MIRROR'
  | 'CROSS_ERA'
  | 'HIDDEN_CULT'
  | 'VISUAL_CONTRAST';

const LENS_CONFIG: Record<CuratorialLens, { label: string; promptHint: string }> = {
  THEMATIC_MIRROR: {
    label: 'Espejo Temático & Filosófico',
    promptHint:
      'Buscá una película que comparta el mismo dilema moral, existencial o psicológico profundo aunque transcurra en otro contexto.',
  },
  CROSS_ERA: {
    label: 'Diálogo entre Décadas / Países',
    promptHint:
      'Elegí obligatoriamente una película de otro país y de al menos 15 años de diferencia que converse con la primera.',
  },
  HIDDEN_CULT: {
    label: 'Joya Oculta de Filmoteca',
    promptHint:
      'Evitá títulos famosos del canon mainstream; elegí una joya de culto o cine de autor menos obvia que sorprenda a un cinéfilo.',
  },
  VISUAL_CONTRAST: {
    label: 'Fotografía & Puesta en Escena',
    promptHint:
      'Conectá ambas películas por su dirección de fotografía, uso de la luz, encuadres, ritmo de montaje o arquitectura espacial.',
  },
};

export interface CurateRequestBody {
  movie?: {
    id?: unknown;
    title?: unknown;
    year?: unknown;
    castInfo?: unknown;
  };
  lens?: unknown;
  excludedTitles?: unknown;
}

export interface CurateHandlerResult {
  status: number;
  body: Record<string, unknown>;
  headers?: Record<string, string>;
}

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  error?: { message?: string };
}

// Rate limit simple en memoria por IP (máx 15 peticiones cada 10 minutos por IP)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  if (ipHits.size > 500) {
    for (const [key, val] of ipHits.entries()) {
      if (val.resetAt <= now) ipHits.delete(key);
    }
  }

  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt <= now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { allowed: true };
}

function sanitizeInput(value: unknown, maxLen: number, fallback = ''): string {
  if (typeof value !== 'string') return fallback;
  return value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, maxLen) || fallback;
}

function isValidLens(value: string): value is CuratorialLens {
  return value in LENS_CONFIG;
}

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  required: [
    'cycleTitle',
    'themeAxis',
    'moodBadge',
    'curatorNote',
    'filmA',
    'filmB',
  ],
  properties: {
    cycleTitle: { type: 'STRING' },
    themeAxis: { type: 'STRING' },
    moodBadge: { type: 'STRING' },
    curatorNote: { type: 'STRING' },
    filmA: {
      type: 'OBJECT',
      required: ['title', 'director', 'year', 'durationMin', 'country', 'format', 'tagline'],
      properties: {
        title: { type: 'STRING' },
        director: { type: 'STRING' },
        year: { type: 'INTEGER' },
        durationMin: { type: 'INTEGER' },
        country: { type: 'STRING' },
        format: { type: 'STRING' },
        tagline: { type: 'STRING' },
      },
    },
    filmB: {
      type: 'OBJECT',
      required: ['title', 'director', 'year', 'durationMin', 'country', 'format', 'tagline'],
      properties: {
        title: { type: 'STRING' },
        director: { type: 'STRING' },
        year: { type: 'INTEGER' },
        durationMin: { type: 'INTEGER' },
        country: { type: 'STRING' },
        format: { type: 'STRING' },
        tagline: { type: 'STRING' },
      },
    },
  },
};

export async function handleCurateRequest(
  payload: unknown,
  env: Record<string, string | undefined>,
  clientIp = 'unknown'
): Promise<CurateHandlerResult> {
  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    return {
      status: 429,
      headers: { 'Retry-After': String(rate.retryAfterSec ?? 60) },
      body: {
        error: `Demasiadas consultas seguidas. Esperá ${rate.retryAfterSec} segundos antes de volver a intentar.`,
      },
    };
  }

  const apiKey = (env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '').trim();
  if (!apiKey || apiKey === 'pega_aqui_tu_api_key_de_google_ai_studio') {
    return {
      status: 500,
      body: {
        error: 'Falta configurar GEMINI_API_KEY en las variables de entorno del servidor.',
      },
    };
  }

  if (typeof payload !== 'object' || payload === null) {
    return { status: 400, body: { error: 'Payload inválido.' } };
  }

  const data = payload as CurateRequestBody;
  const rawMovie = data.movie;
  if (typeof rawMovie !== 'object' || rawMovie === null) {
    return { status: 400, body: { error: 'Faltan los datos de la película.' } };
  }

  const title = sanitizeInput(rawMovie.title, 140);
  if (!title) {
    return { status: 400, body: { error: 'El título de la película es obligatorio.' } };
  }

  const rawYear = Number(rawMovie.year);
  const year =
    Number.isFinite(rawYear) && rawYear >= 1888 && rawYear <= 2035
      ? Math.round(rawYear)
      : 1970;
  const castInfo = sanitizeInput(rawMovie.castInfo, 200, 'Archivo 35mm');

  const rawLens = sanitizeInput(data.lens, 40);
  const lens: CuratorialLens = isValidLens(rawLens) ? rawLens : 'THEMATIC_MIRROR';
  const lensObj = LENS_CONFIG[lens];

  const excluded: string[] = Array.isArray(data.excludedTitles)
    ? data.excludedTitles
        .slice(0, 12)
        .map((item) => sanitizeInput(item, 120))
        .filter(Boolean)
    : [];

  const exclusionRule =
    excluded.length > 0
      ? `IMPORTANTE: NO elijas ninguna de estas películas porque ya fueron sugeridas antes: ${excluded.join(
          ', '
        )}. Buscá una alternativa completamente distinta.`
      : '';

  const prompt = `Actuá como el programador jefe de una filmoteca de prestigio internacional (como la Cineteca di Bologna, Film Forum o MUBI).
El usuario acaba de elegir como Primera Función la película: "${title}" (Año: ${year}, Elenco de referencia: ${castInfo}).

Enfoque curatorial solicitado: "${lensObj.label}" -> ${lensObj.promptHint}
${exclusionRule}

Tu tarea:
1. Completar los datos reales de "${title}" (su director real, país de origen, duración real en minutos, formato ideal de proyección ej. "35mm Anamórfico" o "35mm B&N", y un tagline evocador en español).
2. Seleccionar UNA Segunda Función (Programa Doble) real y extraordinaria que dialogue profunda, estética, temática o emocionalmente con "${title}". PROHIBIDO elegir secuelas directas o películas obvias de la misma franquicia.
3. Escribir en "curatorNote" un párrafo apasionante en español (de 3 a 4 oraciones) explicando exactamente POR QUÉ estas dos películas funcionan juntas en una función doble.`;

  const model = (env.GEMINI_MODEL || env.VITE_GEMINI_MODEL || 'gemini-flash-latest').trim();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model
      )}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: RESPONSE_SCHEMA,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = (await response.json().catch(() => ({}))) as GeminiResponse;
      return {
        status: response.status,
        body: {
          error:
            errData.error?.message ||
            `Error al consultar Gemini API (Status ${response.status})`,
        },
      };
    }

    const json = (await response.json()) as GeminiResponse;
    const parts = json.candidates?.[0]?.content?.parts ?? [];
    const rawText = parts.map((part) => part.text ?? '').join('');

    if (!rawText.trim()) {
      return {
        status: 502,
        body: { error: 'El modelo no devolvió contenido.' },
      };
    }

    return {
      status: 200,
      body: { result: rawText },
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        status: 504,
        body: { error: 'Tiempo de espera agotado al consultar al programador IA.' },
      };
    }
    return {
      status: 500,
      body: {
        error:
          err instanceof Error ? err.message : 'Error interno en el servidor de curaduría.',
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk: Buffer) => {
      raw += chunk.toString('utf8');
      if (raw.length > 16 * 1024) {
        reject(new Error('Payload demasiado grande.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('JSON inválido.'));
      }
    });
    req.on('error', reject);
  });
}

// Handler compatible con Vercel Serverless Functions (Node.js runtime)
export default async function handler(
  req: IncomingMessage & { body?: unknown; headers: Record<string, string | string[] | undefined> },
  res: ServerResponse
) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Método no permitido. Usá POST.' }));
    return;
  }

  // Verificación básica de Origin/Host si está disponible para evitar llamadas cross-site no autorizadas
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (typeof origin === 'string' && typeof host === 'string') {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: 'Origen no autorizado.' }));
        return;
      }
    } catch {
      // Ignorar si la cabecera Origin está mal formada
    }
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp =
    (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : undefined) ||
    req.socket?.remoteAddress ||
    'unknown';

  try {
    const payload = req.body !== undefined ? req.body : await readJsonBody(req);
    const result = await handleCurateRequest(
      payload,
      process.env as Record<string, string | undefined>,
      clientIp
    );

    res.statusCode = result.status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (result.headers) {
      for (const [k, v] of Object.entries(result.headers)) {
        res.setHeader(k, v);
      }
    }
    res.end(JSON.stringify(result.body));
  } catch (err: unknown) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Solicitud inválida.',
      })
    );
  }
}
