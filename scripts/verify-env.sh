#!/usr/bin/env bash
set -e

REQUIRED_NODE="v22.19.0"
REQUIRED_NPM="11.7.0"
REQUIRED_TS="Version 5.7.3"

echo "Verificando entorno de backend-bbs..."

ok=true

check_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Falta instalar: $1"
    ok=false
    return 1
  fi
}

check_command node || true
if command -v node >/dev/null 2>&1; then
  NODE_VERSION="$(node -v)"
  echo "Node: $NODE_VERSION"

  if [ "$NODE_VERSION" != "$REQUIRED_NODE" ]; then
    echo "Node incorrecto. Requerido: $REQUIRED_NODE"
    echo "Recomendado:"
    echo "nvm install"
    echo "nvm use"
    ok=false
  fi
fi

check_command npm || true
if command -v npm >/dev/null 2>&1; then
  NPM_VERSION="$(npm -v)"
  echo "npm: $NPM_VERSION"

  if [ "$NPM_VERSION" != "$REQUIRED_NPM" ]; then
    echo "npm distinto. Requerido: $REQUIRED_NPM"
    ok=false
  fi
fi

check_command docker || true
if command -v docker >/dev/null 2>&1; then
  echo "Docker: $(docker --version)"
fi

if [ -d "node_modules/typescript" ]; then
  TS_VERSION="$(npx tsc -v)"
  echo "TypeScript: $TS_VERSION"

  if [ "$TS_VERSION" != "$REQUIRED_TS" ]; then
    echo "TypeScript incorrecto. Ejecuta: npm ci"
    ok=false
  fi
else
  echo "No existe node_modules. Ejecuta: npm ci"
  ok=false
fi

if [ "$ok" = true ]; then
  echo "Entorno correcto."
  exit 0
fi

echo "Entorno incompleto."
exit 1