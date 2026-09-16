/* KRONOSMV · Test de integridad estructural */
const fs = require("fs");

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

check("README.md", "documento principal");
check("LICENSE-CODE", "licencia de código");
check("LICENSE-CONTENT", "licencia de contenido");
check("SECURITY.md", "política de seguridad");
check("CONTRIBUTING.md", "guía de contribución");
check("CODE_OF_CONDUCT.md", "código de conducta");
check("CHANGELOG.md", "registro de cambios");
check(".gitignore", "exclusiones de git");

check(".github/workflows/pages.yml", "workflow de publicación");
check(".github/workflows/verify.yml", "workflow de verificación");

check("docs/index.html", "plaza central");
check("docs/manifiesto.html", "manifiesto");
check("docs/style.css", "estilos");
check("docs/app.js", "terminal");
check("docs/sitemap.xml", "mapa del sitio");
check("docs/robots.txt", "robots");
check("docs/.nojekyll", "compatibilidad GitHub Pages");

check("docs/ensayos/es/001-monopolios-ia-101-2.html", "ensayo 001 ES");
check("docs/ensayos/en/001-ai-monopolies-101-2.html", "ensayo 001 EN");

check("contenido/es/001-monopolios/vision-humana.md", "visión humana ES");
check("contenido/es/001-monopolios/colaboracion-ia.md", "colaboración IA ES");
check("contenido/es/001-monopolios/proceso.md", "proceso ES");
check("contenido/es/001-monopolios/version-final.md", "versión final ES");
check("contenido/en/001-ai-monopolies/human-vision.md", "visión humana EN");
check("contenido/en/001-ai-monopolies/ai-collaboration.md", "colaboración IA EN");
check("contenido/en/001-ai-monopolies/process.md", "proceso EN");
check("contenido/en/001-ai-monopolies/final-version.md", "versión final EN");

check("crypto/README.md", "documentación crypto");
check("crypto/generar-hashes.sh", "script de generación de hashes");
check("crypto/verificar.sh", "script de verificación");
check("crypto/hashes.txt", "registro de hashes");

console.log("\nVerificaciones de contenido:\n");

checkContenido("docs/index.html", "Marco Antonio Rojas Valdovinos");
checkContenido("docs/index.html", "KRONOSMV");
checkContenido("docs/index.html", "MB-2099-M045");
checkContenido("docs/manifiesto.html", "Humano + IA");
checkContenido("docs/ensayos/es/001-monopolios-ia-101-2.html", "MB-2099-M045");
checkContenido("docs/ensayos/en/001-ai-monopolies-101-2.html", "MB-2099-M045");

// Comprobar que app.js usa rutas correctas
if (fs.existsSync("docs/app.js")) {
  const app = fs.readFileSync("docs/app.js", "utf8");
  if (app.includes('"../ensayos/')) {
    console.log("RUTA SOSPECHOSA en docs/app.js: usa ../ensayos/ (debe ser ./ensayos/)");
    fallos++;
  } else if (app.includes('"./ensayos/')) {
    console.log("OK    rutas relativas correctas en docs/app.js");
  }
}

// Comprobar que SECURITY.md NO recomienda Issue público
if (fs.existsSync("SECURITY.md")) {
  const sec = fs.readFileSync("SECURITY.md", "utf8");
  if (sec.includes("Issue marcado") && !sec.includes("No uses Issues públicos")) {
    console.log("SECURITY.md aún recomienda Issue público");
    fallos++;
  }
}

// Comprobar que no quedan marcadores TU-USUARIO
const archivosMarcador = ["README.md", "docs/sitemap.xml", "docs/robots.txt"];
archivosMarcador.forEach(f => {
  if (!fs.existsSync(f)) return;
  const c = fs.readFileSync(f, "utf8");
  if (c.includes("TU-USUARIO")) {
    console.log(`MARCADOR sin reemplazar en ${f}: TU-USUARIO`);
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