import {
  CURATED_PROGRAMS,
  CURATORIAL_LENSES,
  type CuratorialLens,
  type DoubleFeatureProgram,
  type FilmEntry,
} from '../data/programs';

export interface SearchMovieResult {
  id: string;
  title: string;
  castInfo: string;
  year: number;
  posterUrl?: string;
}

interface ImdbSuggestionItem {
  id?: string;
  l?: string;
  s?: string;
  y?: number;
  q?: string;
  qid?: string;
  i?: { imageUrl?: string };
}

interface ImdbSuggestionResponse {
  d?: ImdbSuggestionItem[];
}

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  error?: { message?: string };
}

class ModelResponseError extends Error {}

const CACHE_KEY = 'double_feature_curator_cache_v3';

function getCachedProgram(cacheId: string): DoubleFeatureProgram | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw) as Record<string, DoubleFeatureProgram>;
    return cache[cacheId] || null;
  } catch {
    return null;
  }
}

function saveProgramToCache(cacheId: string, program: DoubleFeatureProgram) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const cache = raw ? (JSON.parse(raw) as Record<string, DoubleFeatureProgram>) : {};
    cache[cacheId] = program;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignorar si localStorage está lleno
  }
}

export async function searchMoviesOnline(query: string): Promise<SearchMovieResult[]> {
  const clean = query.trim();
  if (!clean) return [];

  const firstChar = clean[0].toLowerCase().replace(/[^a-z0-9]/g, 'a') || 'a';
  const imdbUrl = `https://v3.sg.media-imdb.com/suggestion/${firstChar}/${encodeURIComponent(
    clean.toLowerCase()
  )}.json`;

  const res = await fetch(imdbUrl);
  if (!res.ok) {
    throw new Error('Error al conectar con el catálogo de IMDb.');
  }

  const data = (await res.json()) as ImdbSuggestionResponse;
  if (!Array.isArray(data.d)) return [];

  return data.d
    .filter(
      (item) =>
        (item.qid === 'movie' || item.q === 'feature') &&
        typeof item.l === 'string' &&
        typeof item.y === 'number'
    )
    .slice(0, 8)
    .map(
      (item): SearchMovieResult => ({
        id: String(item.id || `m-${item.l}-${item.y}`),
        title: String(item.l),
        castInfo: item.s ? String(item.s) : 'Archivo 35mm',
        year: Number(item.y),
        posterUrl: item.i?.imageUrl,
      })
    );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new ModelResponseError(`Falta el campo "${field}" en la respuesta del modelo.`);
  }
  return value.trim();
}

function optionalText(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function positiveInt(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : fallback;
}

function parseFilm(raw: unknown, label: string, fallbackYear: number): FilmEntry {
  if (!isRecord(raw)) {
    throw new ModelResponseError(`Falta "${label}" en la respuesta del modelo.`);
  }
  return {
    title: requiredText(raw.title, `${label}.title`),
    director: requiredText(raw.director, `${label}.director`),
    year: positiveInt(raw.year, fallbackYear),
    durationMin: positiveInt(raw.durationMin, 110),
    country: optionalText(raw.country, 'Internacional'),
    format: optionalText(raw.format, '35mm'),
    tagline: optionalText(raw.tagline, ''),
  };
}

function buildProgram(rawText: string, movie: SearchMovieResult): DoubleFeatureProgram {
  const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  const parsed: unknown = JSON.parse(cleanJson);

  if (!isRecord(parsed)) {
    throw new ModelResponseError('La respuesta del modelo no es un objeto JSON.');
  }

  const filmA: FilmEntry = {
    ...parseFilm(parsed.filmA, 'filmA', movie.year),
    posterUrl: movie.posterUrl,
  };
  const filmB = parseFilm(parsed.filmB, 'filmB', movie.year);

  return {
    id: `df-${movie.id}-${Date.now()}`,
    cycleTitle: requiredText(parsed.cycleTitle, 'cycleTitle'),
    themeAxis: requiredText(parsed.themeAxis, 'themeAxis'),
    moodBadge: optionalText(parsed.moodBadge, 'Programa Doble · 35mm'),
    curatorNote: requiredText(parsed.curatorNote, 'curatorNote'),
    filmA,
    filmB,
  };
}

async function requestGemini(prompt: string, apiKey: string): Promise<string> {
  const model = (import.meta.env.VITE_GEMINI_MODEL || 'gemini-flash-latest').trim();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const errData = (await response.json().catch(() => ({}))) as GeminiResponse;
    throw new Error(
      errData.error?.message || `Error en Gemini API (Status ${response.status})`
    );
  }

  const json = (await response.json()) as GeminiResponse;
  const parts = json.candidates?.[0]?.content?.parts ?? [];
  const rawText = parts.map((part) => part.text ?? '').join('');

  if (!rawText.trim()) {
    throw new ModelResponseError('El modelo no devolvió contenido.');
  }

  return rawText;
}

export async function generateDoubleFeature(
  movie: SearchMovieResult,
  options?: {
    lens?: CuratorialLens;
    excludedTitles?: string[];
    forceRefresh?: boolean;
  }
): Promise<DoubleFeatureProgram> {
  const lens = options?.lens || 'THEMATIC_MIRROR';
  const excluded = options?.excludedTitles || [];
  const cacheKey = `${movie.id}-${lens}`;

  if (!options?.forceRefresh && excluded.length === 0) {
    const presetMatch = CURATED_PROGRAMS.find(
      (p) => p.filmA.title.toLowerCase() === movie.title.toLowerCase()
    );
    if (presetMatch && lens === 'THEMATIC_MIRROR') {
      return {
        ...presetMatch,
        filmA: {
          ...presetMatch.filmA,
          posterUrl: movie.posterUrl || presetMatch.filmA.posterUrl,
        },
      };
    }

    const cached = getCachedProgram(cacheKey);
    if (cached) return cached;
  }

  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error('Falta configurar VITE_GEMINI_API_KEY en tu archivo .env');
  }

  const lensObj =
    CURATORIAL_LENSES.find((l) => l.id === lens) || CURATORIAL_LENSES[0];

  const exclusionRule =
    excluded.length > 0
      ? `IMPORTANTE: NO elijas ninguna de estas películas porque ya fueron sugeridas antes: ${excluded.join(
          ', '
        )}. Buscá una alternativa completamente distinta.`
      : '';

  const prompt = `Actuá como el programador jefe de una filmoteca de prestigio internacional (como la Cineteca di Bologna, Film Forum o MUBI).
El usuario acaba de elegir como Primera Función la película: "${movie.title}" (Año: ${movie.year}, Elenco de referencia: ${movie.castInfo}).

Enfoque curatorial solicitado: "${lensObj.label}" -> ${lensObj.promptHint}
${exclusionRule}

Tu tarea:
1. Completar los datos reales de "${movie.title}" (su director real, país de origen, duración real en minutos, formato ideal de proyección ej. "35mm Anamórfico" o "35mm B&N", y un tagline evocador en español).
2. Seleccionar UNA Segunda Función (Programa Doble) real y extraordinaria que dialogue profunda, estética, temática o emocionalmente con "${movie.title}". PROHIBIDO elegir secuelas directas o películas obvias de la misma franquicia.
3. Escribir en "curatorNote" un párrafo apasionante en español (de 3 a 4 oraciones) explicando exactamente POR QUÉ estas dos películas funcionan juntas en una función doble.

Respondé ÚNICAMENTE con un objeto JSON válido respetando esta estructura exacta:
{
  "cycleTitle": "Título poético del programa doble",
  "themeAxis": "Frase breve que resume el hilo conductor entre ambas obras",
  "moodBadge": "Etiqueta corta del tono (ej: Neo-Noir & Suspenso · 35mm)",
  "curatorNote": "Explicación profunda de por qué dialogan entre sí.",
  "filmA": {
    "title": "${movie.title}",
    "director": "Nombre real del director de la primera película",
    "year": ${movie.year},
    "durationMin": 120,
    "country": "País real",
    "format": "35mm Color",
    "tagline": "Frase breve y potente sobre la primera película"
  },
  "filmB": {
    "title": "Título de la segunda película recomendada",
    "director": "Nombre real del director de la segunda película",
    "year": 1975,
    "durationMin": 115,
    "country": "País real",
    "format": "35mm",
    "tagline": "Frase breve y potente sobre la segunda película"
  }
}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const rawText = await requestGemini(prompt, apiKey);
      const program = buildProgram(rawText, movie);
      saveProgramToCache(cacheKey, program);
      return program;
    } catch (err) {
      const retryable = err instanceof SyntaxError || err instanceof ModelResponseError;
      if (!retryable) throw err;
    }
  }

  throw new Error('El modelo devolvió una respuesta inválida dos veces. Probá de nuevo.');
}
