/* KRONOSMV · Terminal interactiva 2099 */
(function () {
  const term = document.getElementById("term");
  if (!term) return;

  const out = term.querySelector(".terminal-body");
  const input = term.querySelector("input");

  const VERSION = "1.0.0";
  const SELLO = "MB-2099-M045";
  const AUTOR = "Marco Antonio Rojas Valdovinos";

  const RUTAS = {
    "001": {
      es: "../ensayos/es/001-monopolios-ia-101-2.html",
      en: "../ensayos/en/001-ai-monopolies-101-2.html"
    }
  };

  let idioma = "es";
  const historial = [];
  let idxHistorial = -1;

  function escribir(texto, clase = "") {
    const linea = document.createElement("div");
    linea.className = "line " + clase;
    linea.textContent = texto;
    out.appendChild(linea);
    out.scrollTop = out.scrollHeight;
  }

  function tipear(texto, clase = "", velocidad = 12) {
    return new Promise(resolve => {
      const linea = document.createElement("div");
      linea.className = "line cursor " + clase;
      out.appendChild(linea);
      let i = 0;
      const timer = setInterval(() => {
        linea.textContent = texto.slice(0, ++i);
        out.scrollTop = out.scrollHeight;
        if (i >= texto.length) {
          clearInterval(timer);
          linea.classList.remove("cursor");
          resolve();
        }
      }, velocidad);
    });
  }

  async function arranque() {
    await tipear("KRONOSMV · Archivo 2099", "sys");
    await tipear("Inicializando terminal ...", "dim");
    await tipear("Firma: " + SELLO, "dim");
    await tipear("Autor: " + AUTOR, "dim");
    await tipear("Versión: v" + VERSION, "dim");
    escribir("");
    await tipear("Escribe 'help' para ver comandos.", "");
    escribir("");
  }

  function cmdHelp() {
    escribir("Comandos disponibles:", "sys");
    escribir("  help              muestra esta ayuda");
    escribir("  ls                lista documentos");
    escribir("  enter 001         abre el documento 001");
    escribir("  language es|en    cambia idioma");
    escribir("  status            estado del archivo");
    escribir("  manifest          abre el manifiesto");
    escribir("  whoami            identidad local");
    escribir("  hash              muestra sello SHA-256");
    escribir("  clear             limpia la terminal");
  }

  function cmdLs() {
    escribir("Documentos disponibles:", "sys");
    escribir("  001  Los Monopolios Digitales que Aún No Están  [es · en]");
  }

  function cmdEnter(arg) {
    const doc = RUTAS[arg];
    if (!doc) {
      escribir("Documento no encontrado: " + arg, "err");
      return;
    }
    escribir("Abriendo documento " + arg + " (" + idioma + ") ...", "sys");
    setTimeout(() => { window.location.href = doc[idioma]; }, 500);
  }

  function cmdLanguage(arg) {
    if (arg !== "es" && arg !== "en") {
      escribir("Idioma no soportado. Usa: es | en", "err");
      return;
    }
    idioma = arg;
    escribir("Idioma cambiado a: " + arg, "sys");
  }

  function cmdStatus() {
    escribir("Expediente  : KRONOSMV", "sys");
    escribir("Versión     : v" + VERSION);
    escribir("Sello       : " + SELLO);
    escribir("Autor       : " + AUTOR);
    escribir("Idioma      : " + idioma);
    escribir("Estado      : público · firmado");
  }

  function cmdManifest() {
    escribir("Abriendo manifiesto ...", "sys");
    setTimeout(() => { window.location.href = "./manifiesto.html"; }, 500);
  }

  function cmdWhoami() {
    let p = localStorage.getItem("kronos-passaporte");
    if (!p) {
      p = "VISITANTE-" + Date.now().toString(36).toUpperCase();
      localStorage.setItem("kronos-passaporte", p);
      escribir("Pasaporte emitido: " + p, "sys");
      escribir("Guardado localmente. No se envía a ningún servidor.", "dim");
    } else {
      escribir("Pasaporte activo: " + p, "sys");
    }
  }

  function cmdHash() {
    escribir("Sello SHA-256:", "sys");
    escribir("  Los hashes oficiales viven en crypto/hashes.txt del repositorio.", "dim");
    escribir("  Verificar con: bash crypto/verificar.sh", "dim");
  }

  function cmdClear() { out.innerHTML = ""; }

  function ejecutar(entrada) {
    const partes = entrada.trim().split(/\s+/);
    const cmd = (partes[0] || "").toLowerCase();
    const arg = partes[1] || "";

    if (entrada.trim()) {
      historial.push(entrada);
      idxHistorial = historial.length;
    }

    escribir("> " + entrada, "dim");

    switch (cmd) {
      case "": break;
      case "help": cmdHelp(); break;
      case "ls": cmdLs(); break;
      case "enter": cmdEnter(arg); break;
      case "language":
      case "lang": cmdLanguage(arg); break;
      case "status": cmdStatus(); break;
      case "manifest": cmdManifest(); break;
      case "whoami": cmdWhoami(); break;
      case "hash": cmdHash(); break;
      case "clear": cmdClear(); break;
      default:
        escribir("Comando desconocido: " + cmd, "err");
        escribir("Escribe 'help' para ver opciones.", "dim");
    }
    escribir("");
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value;
      input.value = "";
      ejecutar(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idxHistorial > 0) {
        idxHistorial--;
        input.value = historial[idxHistorial] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (idxHistorial < historial.length - 1) {
        idxHistorial++;
        input.value = historial[idxHistorial] || "";
      } else {
        idxHistorial = historial.length;
        input.value = "";
      }
    }
  });

  term.addEventListener("click", () => input.focus());
  arranque();
})();