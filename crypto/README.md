
---

# 🔐 `crypto/`

## 2️⃣8️⃣ `crypto/README.md`

```markdown
# Crypto — Verificación Criptográfica

## Algoritmo

**SHA-256** — Secure Hash Algorithm 2, 256 bits.
Estándar FIPS 180-4. Sin dependencias externas.

## Objetivo

Permitir que cualquier persona verifique que los archivos publicados
no han sido alterados desde su publicación oficial.

## Cómo funciona

1. Al publicar una versión, se calcula el SHA-256 de cada archivo HTML.
2. Los hashes se registran en `hashes.txt`.
3. Cualquier persona puede recalcular los hashes y compararlos.

## Verificar

```bash
bash crypto/verificar.sh