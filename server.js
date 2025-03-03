import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

async function startServer() {
  const server = await createServer({
    configFile: false,
    root: __dirname,
    server: {
      port: PORT,
      host: HOST,
      strictPort: true
    },
    build: {
      outDir: 'dist'
    },
    preview: {
      port: PORT,
      host: HOST,
      strictPort: true
    }
  });

  await server.listen();
  server.printUrls();
  
  console.log(`Server running at http://${HOST}:${PORT}`);
}

startServer(); 