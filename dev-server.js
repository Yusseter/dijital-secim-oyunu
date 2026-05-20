const fs = require('fs');
const http = require('http');
const path = require('path');

const rootDir = __dirname;
const host = process.env.HOST || '127.0.0.1';
const startPort = Number.parseInt(process.argv[2] || process.env.PORT || '5500', 10);
const maxPort = startPort + 20;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}

function getRequestPath(requestUrl) {
  const url = new URL(requestUrl, `http://${host}:${startPort}`);
  const decodedPath = safeDecode(url.pathname);
  const relativePath = decodedPath.replace(/^\/+/, '') || 'index.html';
  return path.resolve(rootDir, relativePath);
}

function isInsideRoot(filePath) {
  return filePath === rootDir || filePath.startsWith(`${rootDir}${path.sep}`);
}

function sendFile(response, filePath, statusCode = 200) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Dosya okunamadi.');
      return;
    }

    response.writeHead(statusCode, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store'
    });
    response.end(content);
  });
}

function sendNotFound(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Dosya bulunamadi.');
}

function handleRequest(request, response) {
  let filePath = getRequestPath(request.url);

  if (!isInsideRoot(filePath)) {
    sendNotFound(response);
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    if (!statError && stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.stat(filePath, (fileError, fileStat) => {
      if (!fileError && fileStat.isFile()) {
        sendFile(response, filePath);
        return;
      }

      const hasExtension = Boolean(path.extname(filePath));
      if (hasExtension) {
        sendNotFound(response);
        return;
      }

      sendFile(response, path.join(rootDir, '404.html'), 404);
    });
  });
}

function listen(port) {
  const server = http.createServer(handleRequest);

  server.on('error', error => {
    if (error.code === 'EADDRINUSE' && port < maxPort) {
      listen(port + 1);
      return;
    }

    console.error(error);
    process.exit(1);
  });

  server.listen(port, host, () => {
    console.log(`Dev server: http://${host}:${port}/`);
  });
}

listen(startPort);
