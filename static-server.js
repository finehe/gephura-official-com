import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// MIME 类型映射
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = createServer((req, res) => {
  console.log(`Request: ${req.url}`);
  
  // 处理根路径请求
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // 为所有路径提供 index.html（除了明确的资源请求）
  if (!filePath.includes('.')) {
    filePath = '/index.html';
  }
  
  // 确定完整文件路径
  filePath = join(__dirname, 'dist', filePath);
  
  try {
    if (existsSync(filePath)) {
      // 获取文件扩展名
      const ext = extname(filePath);
      // 设置内容类型
      res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
      
      // 读取并提供文件
      const content = readFileSync(filePath);
      res.statusCode = 200;
      res.end(content);
    } else {
      // 处理 404
      console.log(`File not found: ${filePath}`);
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  } catch (error) {
    console.error(`Error serving ${filePath}:`, error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
}); 