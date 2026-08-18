# ============================================
# PHÉNIX GROUP - Script de mise à jour Supabase
# ============================================

Write-Host ""
Write-Host "🔄 PHÉNIX GROUP - Mise à jour des types Supabase" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si le dossier types existe
if (-not (Test-Path "src/types")) {
    New-Item -ItemType Directory -Force -Path "src/types" | Out-Null
    Write-Host "✅ Dossier 'src/types' créé" -ForegroundColor Green
}

# Générer les types
Write-Host ""
Write-Host "🔄 Génération des types depuis Supabase..." -ForegroundColor Yellow
Write-Host ""

npx supabase gen types typescript --project-id lopibwcnbuxmlpzzoate > src/types/supabase.ts

if ($?) {
    Write-Host ""
    Write-Host "✅ Types générés avec succès !" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de la génération" -ForegroundColor Red
}