const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  const candidates = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        if (iface.address.startsWith('192.168.56.') || name.toLowerCase().includes('virtual') || name.toLowerCase().includes('vbox')) {
          continue;
        }
        candidates.push({ name, ip: iface.address });
      }
    }
  }
  const preferred = candidates.find(c => /wi-?fi|wlan|inal[aá]mbric/i.test(c.name)) 
                 || candidates.find(c => /ethernet|eth/i.test(c.name))
                 || candidates[0];
  return preferred ? preferred.ip : '127.0.0.1';
}

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';
  
  const filePath = path.join(__dirname, decodeURIComponent(reqUrl));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Archivo no encontrado');
      return;
    }

    // Soporte para streaming de audio (Range header)
    if (ext === '.mp3' && req.headers.range) {
      const range = req.headers.range;
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  const url = `http://localhost:${PORT}`;
  const mobileUrl = `http://${localIp}:${PORT}`;
  console.log(`\n=================================================`);
  console.log(`❤️  Web de Aniversario de David & Sofía iniciada`);
  console.log(`💻  En este ordenador: ${url}`);
  console.log(`📱  En el móvil (WiFi de casa): ${mobileUrl}`);
  console.log(`⚠️  ATENCIÓN: El ordenador debe estar ENCENDIDO.`);
  console.log(`    Si se apaga o se suspende, la web no cargará.`);
  console.log(`🎵  Canción: Emborracharme - Lori Meyers`);
  console.log(`=================================================\n`);
  
  exec(`start ${url}`);
});
