import type { DoubleFeatureProgram, FilmEntry } from '../data/programs';

export interface SearchMovieResult {
  id: string;
  title: string;
  director: string;
  year: number;
  durationMin: number;
  country: string;
  posterUrl?: string;
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

  const data = await res.json();
  if (!Array.isArray(data.d)) return [];

  return data.d
    .filter((item: any) => item.qid === 'movie' || item.q === 'feature' || item.y)
    .slice(0, 8)
    .map((item: any) => ({
      id: String(item.id),
      title: String(item.l),
      director: item.s ? String(item.s) : 'Créditos en archivo',
      year: Number(item.y) || 2000,
      durationMin: 118,
      country: 'Internacional',
      posterUrl: item.i?.imageUrl,
    }));
}

export async function generateDoubleFeature(
  movie: SearchMovieResult
): Promise<DoubleFeatureProgram> {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();

  if (!apiKey) {
    throw new Error('Falta configurar VITE_GEMINI_API_KEY en tu archivo .env');
  }

  const prompt = `Actuá como el programador jefe de una filmoteca de prestigio internacional (como la Cineteca di Bologna, Film Forum o MUBI).
El usuario acaba de elegir como Primera Función la película: "${movie.title}" (Año: ${movie.year}, Referencia elenco/créditos: ${movie.director}).

Tu tarea:
1. Completar los datos reales de "${movie.title}" (su director real, país de origen, duración aproximada en minutos, formato ideal de proyección ej. "35mm Anamórfico" o "35mm B&N", y un tagline evocador en español).
2. Seleccionar UNA Segunda Función (Programa Doble) extraordinaria que dialogue profunda, estética, temática o emocionalmente con "${movie.title}". PROHIBIDO elegir secuelas directas o películas obvias de la misma franquicia; buscá un cruce de autor inteligente (puede ser de otra década o país) que enriquezca la experiencia de verlas la misma noche.
3. Escribir en "curatorNote" un párrafo apasionante en español (de 3 a 4 oraciones) explicando exactamente POR QUÉ estas dos películas funcionan juntas en una función doble.

Respondé ÚNICAMENTE con un objeto JSON válido (sin bloques markdown \`\`\`json) respetando esta estructura exacta:
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

  // Usamos gemini-3.8-flash que es el modelo estándar de producción de AI Studio
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `Error en Gemini API (Status ${response.status})`
    );
  }

  const json = await response.json();
  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '';

  if (!rawText) {
    throw new Error('El modelo no devolvió contenido.');
  }

  const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  const parsed = JSON.parse(cleanJson);

  const enrichedFilmA: FilmEntry = {
    ...parsed.filmA,
    posterUrl: movie.posterUrl,
  };

  return {
    id: `df-${Date.now()}`,
    cycleTitle: parsed.cycleTitle,
    themeAxis: parsed.themeAxis,
    moodBadge: parsed.moodBadge,
    curatorNote: parsed.curatorNote,
    filmA: enrichedFilmA,
    filmB: parsed.filmB,
  };
}
