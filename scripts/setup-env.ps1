$ErrorActionPreference = "Stop"

Write-Host "Preparando entorno backend-bbs..." -ForegroundColor Cyan

if(-not (Get-Command nvm -ErrorAction SilentlyContinue)){
    Write-Host "No se encontro nvm." -ForegroundColor Yellow
    Write-Host "Instala nvm-windows desde:"
    Write-Host "https://github.com/coreybutler/nvm-windows/releases"
    Write-Host "Verificar sus Patch de sus variables de entorno de windows."
    Write-Host "Luego ejecuta:"
    Write-Host "nvm install 22.19.0"
    Write-Host "nvm use 22.19.0"
    Write-Host "o vuelva a ejecutar este script" -ForegroundColor Cyan
    exit 1
}

Write-Host "Instalando/usando Node 22.19.0..."
nvm install 22.19.0
nvm use 22.19.0

Write-Host "Instalando dependencias exactas..."
npm ci

Write-Host "Levantando Postgres con Docker..."
docker compose --profile local up -d

Write-Host "Verificando entorno..."
npm run verify:win

Write-Host "Entorno preparado correctamente." -ForegroundColor Green
Write-Host "Ahora puedes ejecutar: npm run start:dev" -ForegroundColor Green

