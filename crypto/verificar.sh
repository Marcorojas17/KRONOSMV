#!/usr/bin/env bash
# KRONOSMV · Verificar integridad SHA-256
# Uso: bash crypto/verificar.sh
# Autor: Marco Antonio Rojas Valdovinos

set -e

ARCHIVO="crypto/hashes.txt"
FALLOS=0

if [ ! -f "$ARCHIVO" ]; then
  echo "ERROR: no existe $ARCHIVO"
  exit 1
fi

echo "Verificando integridad SHA-256 ..."
echo ""

while IFS= read -r linea; do
  case "$linea" in
    \#*|"") continue ;;
  esac

  hash_esperado=$(echo "$linea" | awk '{print $1}')
  ruta=$(echo "$linea" | awk '{print $2}')

  if [ ! -f "$ruta" ]; then
    echo "FALTA  $ruta"
    FALLOS=$((FALLOS + 1))
    continue
  fi

  hash_actual=$(sha256sum "$ruta" | awk '{print $1}')

  if [ "$hash_actual" = "$hash_esperado" ]; then
    echo "OK     $ruta"
  else
    echo "ALTERADO $ruta"
    echo "       esperado: $hash_esperado"
    echo "       actual:   $hash_actual"
    FALLOS=$((FALLOS + 1))
  fi
done < "$ARCHIVO"

echo ""
if [ "$FALLOS" -eq 0 ]; then
  echo "Verificación completa. Todos los archivos íntegros."
  exit 0
else
  echo "Verificación fallida. $FALLOS archivo(s) con problemas."
  exit 1
fi