/* KRONOSMV · Test de integridad estructural */
const fs = require("fs");
const path = require("path");

let fallos = 0;

function check(ruta, descripcion) {
  if (fs.existsSync(ruta)) {
    console.log(`OK    ${ruta}`);
  } else {
    console.log(`FALTA ${ruta}  →  ${descripcion}`);
    fallos++;
  }
}

function checkContenido(ruta, fragmento) {
  if (!fs.existsSync(ruta)) return;
  const c = fs.readFileSync(ruta, "utf8");
  if (!c.includes(fragmento)) {
    console.log(`FALTA fragmento en ${ruta}: "${fragmento}"`);
    fallos++;
  }
}

console.log("KRONOSMV · Verificación estructural\n");

// 1. Archivos raíz
check("README.md", "documento principal");
check("LICENSE-CODE", "licencia de código");
check("LICENSE-CONTENT", "licencia de contenido");
check("SECURITY.md", "política de seguridad");
check("CONTRIBUTING.md", "guía de contribución");
check("CODE_OF_CONDUCT.md", "código de conducta");
check("CHANGELOG.md", "registro de cambios");
check(".gitignore", "exclusiones de git");

// 2. Workflows
check(".github/workflows/pages.yml", "workflow de publicación");
check(".github/workflows/verify.yml", "workflow de verificación");

// 3. Docs
check("docs/index.html", "plaza central");
check("docs/manifiesto.html", "manifiesto");
check("docs/style.css", "estilos");
check("docs/app.js", "terminal");
check("docs/sitemap.xml", "mapa del sitio");
check("docs/robots.txt", "robots");
check("docs/.nojekyll", "compatibilidad GitHub Pages");

// 4. Ensayos
check("docs/ensayos/es/001-monopolios-ia-101-2.html", "ensayo 001 ES");
check("docs/ensayos/en/001-ai-monopolies-101-2.html", "ensayo 001 EN");

// 5. Contenido
check("contenido/es/001-monopolios/vision-humana.md", "visión humana ES");
check("contenido/es/001-monopolios/colaboracion-ia.md", "colaboración IA ES");
check("contenido/es/001-monopolios/proceso.md", "proceso ES");
check("contenido/es/001-monopolios/version-final.md", "versión final ES");
check("contenido/en/001-ai-monopolies/human-vision.md", "visión humana EN");
check("contenido/en/001-ai-monopolies/ai-collaboration.md", "colaboración IA EN");
check("contenido/en/001-ai-monopolies/process.md", "proceso EN");
check("contenido/en/001-ai-monopolies/final-version.md", "versión final EN");

// 6. Crypto
check("crypto/README.md", "documentación crypto");
check("crypto/firmar.sh", "script de firma");
check("crypto/verificar.sh", "script de verificación");
check("crypto/hashes.txt", "registro de hashes");

// 7. Tests
check("tests/verify.js", "este archivo");

// 8. Verificaciones de contenido
console.log("\nVerificaciones de contenido:\n");

checkContenido("docs/index.html", "Marco Antonio Rojas Valdovinos");
checkContenido("docs/index.html", "KRONOSMV");
checkContenido("docs/index.html", "MB-2099-M045");
checkContenido("docs/manifiesto.html", "Humano + IA");
checkContenido("docs/ensayos/es/001-monopolios-ia-101-2.html", "MB-2099-M045");
checkContenido("docs/ensayos/en/001-ai-monopolies-101-2.html", "MB-2099-M045");
checkContenido("CHANGELOG.md", "KRONOS-AI");

// 9. Verificar que NO haya rutas rotas ../ensayos/
console.log("\nComprobando rutas ...\n");
const htmls = [
  "docs/index.html",
  "docs/manifiesto.html",
  "docs/ensayos/es/001-monopolios-ia-101-2.html",
  "docs/ensayos/en/001-ai-monopolies-101-2.html"
];
const regex = /\.\.\/ensayos\//;
htmls.forEach(h => {
  if (!fs.existsSync(h)) return;
  const c = fs.readFileSync(h, "utf8");
  if (regex.test(c)) {
    console.log(`RUTA SOSPECHOSA en ${h}: contiene ../ensayos/`);
    fallos++;
  }
});

console.log("");
if (fallos === 0) {
  console.log("VERIFICACIÓN COMPLETA · Todo íntegro");
  process.exit(0);
} else {
  console.log(`VERIFICACIÓN FALLIDA · ${fallos} problema(s)`);
  process.exit(1);
}