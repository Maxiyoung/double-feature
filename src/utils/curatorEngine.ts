import {
  CURATED_PROGRAMS,
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

interface CurateApiResponse {
  result?: string;
  error?: string;
}

class ModelResponseError extends Error {}

const CACHE_KEY = 'double_feature_curator_cache_v3';
const HISTORY_KEY = 'double_feature_history_v1';
const MAX_CACHE_ENTRIES = 40;
const MAX_HISTORY_ENTRIES = 10;

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
    // Reinsertar al final para mantener orden de uso reciente (LRU básico)
    delete cache[cacheId];
    cache[cacheId] = program;

    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHE_ENTRIES) {
      for (const oldKey of keys.slice(0, keys.length - MAX_CACHE_ENTRIES)) {
        delete cache[oldKey];
      }
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignorar si localStorage está lleno o deshabilitado
  }
}

export function loadHistoryPrograms(): DoubleFeatureProgram[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return CURATED_PROGRAMS;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) return CURATED_PROGRAMS;
    return parsed.slice(0, MAX_HISTORY_ENTRIES) as DoubleFeatureProgram[];
  } catch {
    return CURATED_PROGRAMS;
  }
}

export function saveHistoryPrograms(programs: DoubleFeatureProgram[]): void {
  try {
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(programs.slice(0, MAX_HISTORY_ENTRIES))
    );
  } catch {
    // Ignorar errores de cuota
  }
}

function normalizeAsciiPrefix(text: string): string {
  const deaccented = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const match = deaccented.match(/[a-z0-9]/);
  return match ? match[0] : 'a';
}

export async function searchMoviesOnline(
  query: string,
  signal?: AbortSignal
): Promise<SearchMovieResult[]> {
  const clean = query.trim();
  if (!clean) return [];

  const firstChar = normalizeAsciiPrefix(clean);
  const imdbUrl = `https://v3.sg.media-imdb.com/suggestion/${firstChar}/${encodeURIComponent(
    clean.toLowerCase()
  )}.json`;

  const res = await fetch(imdbUrl, { signal });
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

async function resolvePosterUrl(
  title: string,
  year: number,
  signal?: AbortSignal
): Promise<string | undefined> {
  try {
    const results = await searchMoviesOnline(title, signal);
    if (results.length === 0) return undefined;

    const lowerTitle = title.toLowerCase();
    const exactMatch = results.find(
      (r) => r.title.toLowerCase() === lowerTitle && Math.abs(r.year - year) <= 2
    );
    const titleMatch = results.find((r) => r.title.toLowerCase() === lowerTitle);
    const yearMatch = results.find((r) => Math.abs(r.year - year) <= 1);

    return (exactMatch || titleMatch || yearMatch || results[0])?.posterUrl;
  } catch {
    return undefined;
  }
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

async function requestCuratorBackend(
  movie: SearchMovieResult,
  lens: CuratorialLens,
  excludedTitles: string[],
  signal?: AbortSignal
): Promise<string> {
  const response = await fetch('/api/curate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
    body: JSON.stringify({
      movie: {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        castInfo: movie.castInfo,
      },
      lens,
      excludedTitles,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as CurateApiResponse;

  if (!response.ok) {
    throw new Error(
      data.error || `Error en el servidor de curaduría (Status ${response.status})`
    );
  }

  if (!data.result || !data.result.trim()) {
    throw new ModelResponseError('El modelo no devolvió contenido.');
  }

  return data.result;
}

export async function generateDoubleFeature(
  movie: SearchMovieResult,
  options?: {
    lens?: CuratorialLens;
    excludedTitles?: string[];
    forceRefresh?: boolean;
    signal?: AbortSignal;
  }
): Promise<DoubleFeatureProgram> {
  const lens = options?.lens || 'THEMATIC_MIRROR';
  const excluded = options?.excludedTitles || [];
  const normalizedTitleKey = movie.title.trim().toLowerCase();
  const cacheKey = `${normalizedTitleKey}-${movie.year}-${lens}`;

  if (!options?.forceRefresh && excluded.length === 0) {
    const presetMatch = CURATED_PROGRAMS.find(
      (p) => p.filmA.title.toLowerCase() === normalizedTitleKey
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

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const rawText = await requestCuratorBackend(
        movie,
        lens,
        excluded,
        options?.signal
      );
      const program = buildProgram(rawText, movie);

      const [posterA, posterB] = await Promise.all([
        program.filmA.posterUrl
          ? Promise.resolve(program.filmA.posterUrl)
          : resolvePosterUrl(program.filmA.title, program.filmA.year, options?.signal),
        resolvePosterUrl(program.filmB.title, program.filmB.year, options?.signal),
      ]);

      program.filmA.posterUrl = posterA;
      program.filmB.posterUrl = posterB;

      saveProgramToCache(cacheKey, program);
      return program;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') throw err;
      const retryable = err instanceof SyntaxError || err instanceof ModelResponseError;
      if (!retryable) throw err;
    }
  }

  throw new Error('El modelo devolvió una respuesta inválida dos veces. Probá de nuevo.');
}
