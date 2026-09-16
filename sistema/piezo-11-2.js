// MECÁNICA 11/2 — Módulo de firma en consola
// Presión 11 -> Luz 2
import { KRONOS_CONFIG } from './config.js';

(function () {
  const { autor, sello, genesis } = KRONOS_CONFIG;
  console.log(
    `%cKRONOSMV Activo%c | Autor: ${autor} | Sello: ${sello} | ${genesis}`,
    "color:#0a0;font-weight:bold;",
    "color:#333;"
  );
})();