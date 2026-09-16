
---

# 🔐 `crypto/`

## 2️⃣8️⃣ `crypto/README.md`

```markdown
# Crypto — Verificación

## Algoritmo

**SHA-256** — Secure Hash Algorithm 2, 256 bits. FIPS 180-4.
Sin dependencias externas.

## Qué hace

- **`generar-hashes.sh`** → genera hashes SHA-256 de los archivos publicados.
- **`verificar.sh`** → recalcula y compara con los hashes registrados.

## Qué prueba

SHA-256 prueba **integridad**: que un archivo no cambió desde que se
calculó su hash. **No prueba autoría.**

## Autoría

La autoría se establece por:

- Sello editorial `MB-2099-M045`
- Historial de commits en GitHub
- Firma GPG opcional de los tags (ver abajo)

## Firmar con GPG (opcional)

Requiere clave GPG configurada localmente.

```bash
gpg --armor --detach-sign crypto/hashes.txt
# Genera crypto/hashes.txt.asc (firma pública)