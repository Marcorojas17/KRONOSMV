// TEST E2E — KRONOSMV
const fs = require('fs');
const path = require('path');

console.log("Iniciando E2E KRONOSMV...\n");

function check(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`FALTA: ${file}`);
  }
  console.log(`OK: ${file}`);
}

// 1. Existencia de archivos clave
check('README.md');
check('index.html');
check('ensayos/001-Monopolios-IA-101-2.md');
check('sistema/config.js');
check('sistema/piezo-11-2.js');

// 2. Firma del autor en HTML
const html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('Marco Antonio Rojas Valdovinos')) {
  throw new Error('FALTA FIRMA DEL AUTOR en index.html');
}
if (!html.includes('KRONOSMV')) {
  throw new Error('FALTA identificador KRONOSMV en index.html');
}

// 3. Sello en config
const config = fs.readFileSync('sistema/config.js', 'utf8');
if (!config.includes('MB-2099-M045')) {
  throw new Error('FALTA sello MB-2099-M045 en config.js');
}

console.log("\nE2E PASADO — Firma verificada — Estructura íntegra");