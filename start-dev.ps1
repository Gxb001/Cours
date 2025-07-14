# Lancer json-server dans une nouvelle fenêtre
Start-Process powershell -ArgumentList "-NoExit", "-Command", "json-server --watch .\db.json"

# Attendre 2 secondes
Start-Sleep -Seconds 2

# Lancer ng serve dans une nouvelle fenêtre
Start-Process powershell -ArgumentList "-NoExit", "-Command", "ng serve"

# Attendre 2 secondes
Start-Sleep -Seconds 2

# Ouvrir l'URL dans le navigateur par défaut
Start-Process "http://localhost:4200"

Write-Host "Serveurs lancés et URL ouverte. Appuyez sur une touche pour fermer ce script..."
Read-Host
