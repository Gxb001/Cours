@echo off
echo Lancement de json-server...
start cmd /k json-server --watch .\db.json .\server.js
timeout /t 2 /nobreak
echo Lancement du serveur Angular...
start cmd /k ng serve
timeout /t 2 /nobreak
echo Ouverture de l'URL dans le navigateur...
start http://localhost:4200
exit
