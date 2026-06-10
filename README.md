# Pasos para levantar el proyecto — Configuración del entorno de trabajo (workspace)

Guía para dejar **backend-bbs** listo en cualquier máquina del equipo, con las mismas versiones de Node, npm, TypeScript y base de datos.

---

## Requisitos del proyecto

| Herramienta | Versión |
|-------------|---------|
| Node.js | `22.19.0` |
| npm | `11.7.0` |
| TypeScript (proyecto) | `5.7.3` |
| Docker | Para Postgres local (`docker compose`) |

El archivo `.nvmrc` define la versión de Node. El `package-lock.json` fija las dependencias exactas.

---

## 1. Clonar e ingresar al proyecto

```bash
git clone <url-del-repo>
cd backend-bbs
```

Abrir en VS Code / Cursor la **carpeta raíz** `backend-bbs` (no una subcarpeta).

---

## 2. Verificar el entorno

### Windows (PowerShell)

```powershell
npm run verify:win
```

Comprueba:

- Node `v22.19.0`
- npm `11.7.0`
- Docker instalado
- TypeScript del proyecto (`node_modules/typescript`)

Si algo falta o no coincide, el script indica qué corregir.

### Linux / macOS (bash)

```bash
npm run verify:linux
```

Mismas comprobaciones que en Windows.

---

## 3. Preparar e instalar lo que falta

Ejecutar **solo si** `verify:win` o `verify:linux` reportó problemas, o es la **primera vez** en la máquina.

### Windows

```powershell
npm run setup:win
```

El script intenta:

1. Usar **nvm-windows** con Node `22.19.0`
2. Ejecutar `npm ci`
3. Levantar Postgres con `docker compose --profile local up -d`
4. Volver a verificar el entorno

> Si no tienes **nvm-windows**, instálalo desde:  
> https://github.com/coreybutler/nvm-windows/releases  
> Luego: `nvm install 22.19.0` y `nvm use 22.19.0`

### Linux / macOS

```bash
npm run setup:linux
```

El script intenta:

1. Usar **nvm** con la versión de `.nvmrc`
2. Ejecutar `npm ci`
3. Levantar Postgres con Docker
4. Volver a verificar el entorno

> Si no tienes **nvm**: https://github.com/nvm-sh/nvm

---

## 4. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` según tu entorno. Mínimo para local con Docker:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/bbs
TYPEORM_SYNC=false
```

---

## 5. Configurar el workspace del IDE (TypeScript)

El repositorio incluye `.vscode/settings.json` para que el editor use **TypeScript del proyecto**, no el del IDE.

1. `Ctrl + Shift + P`
2. **TypeScript: Select TypeScript Version**
3. Elegir **Use Workspace Version**

Si no aparece esa opción, ejecuta antes `npm ci`.

---

## 6. Base de datos y datos de prueba

```bash
npm run db:up      # levantar Postgres (si no está corriendo)
npm run seed       # cargar datos de prueba (vacía tablas antes)
```

Semilla **sin vaciar** tablas existentes:

```bash
npm run seed:keep
```

Entrar a la base con Docker:

```bash
docker exec -it backend-bbs-db psql -U postgres -d bbs
```

Vaciar tablas de desarrollo (sin borrar el volumen de Docker):

**Windows:**

```powershell
npm run db:reset:win
```

**Linux / macOS:**

```bash
npm run db:reset:linux
```

---

## 7. Arrancar la API

```bash
npm run start:dev
```

- URL: `http://localhost:4000`
- Prefijo API: `/api`

---

## Resumen rápido

| Sistema | Verificar | Preparar entorno | Vaciar BD |
|---------|-----------|------------------|-----------|
| **Windows** | `npm run verify:win` | `npm run setup:win` | `npm run db:reset:win` |
| **Linux / macOS** | `npm run verify:linux` | `npm run setup:linux` | `npm run db:reset:linux` |

Flujo típico:

```text
git pull → verify:win|linux → setup:win|linux (si hace falta) → .env → npm run seed → npm run start:dev
```

---

## Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run verify:win` | Verifica entorno (Windows) |
| `npm run setup:win` | Instala y prepara entorno (Windows) |
| `npm run verify:linux` | Verifica entorno (Linux/macOS) |
| `npm run setup:linux` | Instala y prepara entorno (Linux/macOS) |
| `npm run db:up` | Levanta Postgres en Docker |
| `npm run db:down` | Detiene contenedores |
| `npm run db:logs` | Logs del contenedor Postgres |
| `npm run db:reset:win` | Vacía tablas de desarrollo (Windows) |
| `npm run db:reset:linux` | Vacía tablas de desarrollo (Linux/macOS) |
| `npm run seed` | Semilla de datos (vacía tablas antes) |
| `npm run seed:keep` | Semilla sin vaciar tablas |
| `npm run build` | Compilar proyecto |

---

## Problemas frecuentes

**El IDE muestra errores de TypeScript pero `npm run build` funciona**  
→ Usar **Use Workspace Version** en el selector de TypeScript (paso 5).

**`password authentication failed` o `ECONNREFUSED` en Postgres**  
→ Revisar que Docker esté corriendo (`npm run db:up`) y que `DATABASE_URL` en `.env` coincida con `docker-compose.yml`.

**Aviso `DeprecationWarning` de `pg` al iniciar**  
→ Advertencia del driver PostgreSQL al conectar; si la API arranca, se puede ignorar en desarrollo.
