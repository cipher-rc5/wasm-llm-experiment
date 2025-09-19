import { serve } from 'bun';

const server = serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname.startsWith('/api')) {
      return handleApiRoute(request, url);
    }

    // Serve static files and client-side routing
    return handleStaticFile(url.pathname);
  }
});

async function handleApiRoute(request: Request, url: URL): Promise<Response> {
  if (url.pathname === '/api/health') {
    return new Response(JSON.stringify({ status: 'ok' }), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Not Found', { status: 404 });
}

async function handleStaticFile(pathname: string): Promise<Response> {
  // Handle client-side routing - serve index.html for all non-file routes
  if (pathname === '/' || (!pathname.includes('.') && !pathname.startsWith('/src'))) {
    const file = Bun.file('public/index.html');
    const exists = await file.exists();
    if (exists) {
      return new Response(file, { headers: { 'Content-Type': 'text/html' } });
    }
  }

  // Handle TypeScript/JSX files - compile them on the fly
  if (pathname.endsWith('.tsx') || pathname.endsWith('.ts')) {
    try {
      const filePath = `.${pathname}`;
      const file = Bun.file(filePath);
      const exists = await file.exists();

      if (exists) {
        // Use Bun's built-in transpiler to convert TSX/TS to JS
        const result = await Bun.build({
          entrypoints: [filePath],
          target: 'browser',
          format: 'esm',
          minify: false,
          sourcemap: 'inline',
          define: { 'process.env.NODE_ENV': '"development"' }
        });

        if (result.success && result.outputs.length > 0) {
          const compiledCode = await result.outputs[0]!.text();
          return new Response(compiledCode, { headers: { 'Content-Type': 'application/javascript', 'Cache-Control': 'no-cache' } });
        } else {
          console.error('Build failed:', result.logs);
          return new Response('Build failed', { status: 500 });
        }
      }
    } catch (error) {
      console.error('Error compiling TypeScript:', error);
      return new Response('Compilation error', { status: 500 });
    }
  }

  // Serve other static assets from public directory
  const file = Bun.file(`public${pathname}`);
  const exists = await file.exists();

  if (exists) {
    return new Response(file);
  }

  // For development, also try to serve from root directory
  const rootFile = Bun.file(`.${pathname}`);
  const rootExists = await rootFile.exists();

  if (rootExists) {
    return new Response(rootFile);
  }

  return new Response('Not Found', { status: 404 });
}

console.log(` Server running at http://localhost:${server.port}`);
console.log(` Serving from: public/ and src/`);
console.log(` API available at: http://localhost:${server.port}/api/*`);
console.log(` TypeScript compilation enabled`);
