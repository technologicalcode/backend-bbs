#!/usr/bin/env bash
set -e

echo "Preparando entorno backend-bbs..."

if ! command -v nvm >/dev/null 2>&1; then
  export NVM_DIR="$HOME/.nvm"

  if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
  fi
fi

if ! command -v nvm >/dev/null 2>&1; then
  echo "No se encontro nvm."
  echo "Instalalo desde:"
  echo "https://github.com/nvm-sh/nvm"
  echo ""
  echo "Luego ejecuta:"
  echo "nvm install"
  echo "nvm use"
  exit 1
fi

echo "Instalando/usando Node desde .nvmrc..."
nvm install
nvm use

echo "Instalando dependencias exactas..."
npm ci

echo "Levantando Postgres con Docker..."
docker compose --profile local up -d

echo "Verificando entorno..."
bash scripts/verify-env.sh

echo "Entorno preparado correctamente."
echo "Ahora puedes ejecutar: npm run start:dev"