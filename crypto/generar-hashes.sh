
---

## 2️⃣9️⃣ `crypto/generar-hashes.sh` ✅ RENOMBRADO

```bash
#!/usr/bin/env bash
# KRONOSMV · Generar hashes SHA-256
# Uso: bash crypto/generar-hashes.sh

set -e

ARCHIVOS=(
  "docs/index.html"
  "docs/manifiesto.html"
  "docs/style.css"
  "docs/app.js"
  "docs/ensayos/es/001-monopolios-ia-101-2.html"
  "docs/ensayos/en/001-ai-monopolies-101-2.html"
)

SALIDA="crypto/hashes.txt"

{
  echo "# KRONOSMV · Hashes SHA-256"
  echo "# Generado: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "# Algoritmo: SHA-256"
  echo "#"
  echo "# Formato: <hash>  <ruta>"
  echo ""
  for f in "${ARCHIVOS[@]}"; do
    if [ -f "$f" ]; then
      sha256sum "$f"
    else
      echo "# FALTA: $f"
    fi
  done
} > "$SALIDA"

echo "Hashes generados en $SALIDA"