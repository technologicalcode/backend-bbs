$ErrorActionPreference = "Stop"

$requiredNode = "v22.19.0"
$requiredNpm = "11.7.0"
$requiredTs = "Version 5.7.3"

Write-Host "Verificando entorno de backend-bbs..." -ForegroundColor Cyan


function Check-Command ($name){
  if(-not (Get-Command $name -ErrorAction SilentlyContinue)){
   Write-Host "Falta instalar: $name" -ForegroundColor Red
   return $false
  }

  return $true
}

$ok =  $true

if(Check-Command "node"){
   $nodeVersion = node -v
   Write-Host "Node: $nodeVersion"

   if($nodeVersion -ne $requiredNode){
    Write-Host "Node incorrecto. Requerido: $requiredNode" -ForegroundColor Yellow
    Write-Host "Recomendado: instalar nvm-windows y ejecutar:"
    Write-Host "nvm install 22.19.0"
    Write-Host "nvm use 22.19.0"
    $ok = $false
   }
}else{
 $ok = $false
}

if(Check-Command "npm"){
  $npmVersion = npm -v 
  Write-Host "npm: $npmVersion"
  if($npmVersion -ne $requiredNpm){
    Write-Host "npm distinto. Requerido: $requiredNpm" -ForegroundColor Yellow
    $ok = $false
  }
}else{
 $ok = $false
}

if (Check-Command "docker") {
  $dockerVersion = docker --version
  Write-Host "Docker: $dockerVersion"
} else {
  Write-Host "Recomendado instalar Docker Desktop. Para poder levantar el base de datos local." -ForegroundColor Yellow
  $ok = $false
}


if (Test-Path "node_modules/typescript") {
  $tsVersion = npx tsc -v
  Write-Host "TypeScript: $tsVersion"
  if ($tsVersion -ne $requiredTs) {
    Write-Host "TypeScript distinto. Requerido: $requiredTs" -ForegroundColor Yellow
    $ok = $false
  }
}else{
  Write-Host "No existe node_modules. Ejecuta: npm ci" -ForegroundColor Yellow
  $ok = $false
}


if ($ok) {
  Write-Host "Entorno correcto." -ForegroundColor Green
  exit 0
}


Write-Host "Entorno incompleto. Revisa los mensajes anteriores." -ForegroundColor Red
Write-Host "Ejecute npm run setup para preparar el entorno y volver a ejecutar npm run verify para verificar el entorno." -ForegroundColor Cyan
exit 1
