import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { IncomingMessage } from 'node:http';
import { handleCurateRequest } from './api/curate.ts';

function readRequestBody(req: IncomingMessage): Promise<unknown> {
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

function localApiPlugin(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), '');

  const attachMiddleware = (middlewares: {
    use: (
      route: string,
      fn: (
        req: IncomingMessage,
        res: {
          statusCode: number;
          setHeader: (name: string, value: string) => void;
          end: (chunk?: string) => void;
        },
        next: () => void
      ) => void
    ) => void;
  }) => {
    middlewares.use('/api/curate', async (req, res, next) => {
      if (req.url && req.url !== '/' && !req.url.startsWith('?')) {
        next();
        return;
      }

      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: 'Método no permitido. Usá POST.' }));
        return;
      }

      try {
        const payload = await readRequestBody(req);
        const mergedEnv: Record<string, string | undefined> = {
          ...process.env,
          ...env,
        };
        const clientIp = req.socket?.remoteAddress || 'local';
        const result = await handleCurateRequest(payload, mergedEnv, clientIp);

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
    });
  };

  return {
    name: 'double-feature-local-api',
    configureServer(server) {
      attachMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares);
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), localApiPlugin(mode)],
}));
