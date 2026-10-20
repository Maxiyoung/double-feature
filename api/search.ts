import type { IncomingMessage, ServerResponse } from 'node:http';

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

export interface SearchMovieItem {
  id: string;
  title: string;
  castInfo: string;
  year: number;
  posterUrl?: string;
}

function normalizeAsciiPrefix(text: string): string {
  const deaccented = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const match = deaccented.match(/[a-z0-9]/);
  return match ? match[0] : 'a';
}

export async function handleSearchRequest(query: string): Promise<{
  status: number;
  body: { results?: SearchMovieItem[]; error?: string };
}> {
  const clean = query.trim().slice(0, 120);
  if (!clean) {
    return { status: 200, body: { results: [] } };
  }

  const firstChar = normalizeAsciiPrefix(clean);
  const imdbUrl = `https://v3.sg.media-imdb.com/suggestion/${firstChar}/${encodeURIComponent(
    clean.toLowerCase()
  )}.json`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(imdbUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      return {
        status: 502,
        body: { error: 'Error al conectar con el catálogo de IMDb.' },
      };
    }

    const data = (await res.json()) as ImdbSuggestionResponse;
    if (!Array.isArray(data.d)) {
      return { status: 200, body: { results: [] } };
    }

    const results: SearchMovieItem[] = data.d
      .filter(
        (item) =>
          (item.qid === 'movie' || item.q === 'feature') &&
          typeof item.l === 'string' &&
          typeof item.y === 'number'
      )
      .slice(0, 8)
      .map((item) => ({
        id: String(item.id || `m-${item.l}-${item.y}`),
        title: String(item.l),
        castInfo: item.s ? String(item.s) : 'Archivo 35mm',
        year: Number(item.y),
        posterUrl: item.i?.imageUrl,
      }));

    return { status: 200, body: { results } };
  } catch {
    return {
      status: 502,
      body: { error: 'No se pudo consultar el catálogo de películas en este momento.' },
    };
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(
  req: IncomingMessage & { query?: Record<string, string | string[] | undefined> },
  res: ServerResponse
) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Método no permitido. Usá GET.' }));
    return;
  }

  let q = '';
  if (req.query && typeof req.query.q === 'string') {
    q = req.query.q;
  } else if (req.url) {
    const urlObj = new URL(req.url, 'http://localhost');
    q = urlObj.searchParams.get('q') || '';
  }

  const result = await handleSearchRequest(q);
  res.statusCode = result.status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.end(JSON.stringify(result.body));
}
