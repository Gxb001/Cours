# Course Management Application

## But du site

Cette application web, développée avec Angular, permet de gérer des cours en ligne. Elle offre aux utilisateurs la possibilité de consulter une liste de cours, d'afficher les détails d'un cours, et, pour les administrateurs, d'ajouter, modifier ou supprimer des cours. Les utilisateurs peuvent se connecter soit en tant qu'utilisateur lambda (lecture seule) soit en tant qu'admin (gestion complète).

## Fonctionnement

- **Connexion** : Les utilisateurs se connectent via une page de login avec un nom d'utilisateur et un mot de passe. Les rôles ("admin" ou "user") déterminent les permissions.
- **Inscription** : Les utilisateurs peuvent s'inscrire via la page de création de compte 'user'.
- **Pages principales** :
  - **Accueil** : Page d'accueil avec une introduction.
  - **Liste des cours** : Affiche tous les cours disponibles.
  - **Détails d'un cours** : Affiche les informations d'un cours spécifique (modification/suppression pour admin).
  - **Ajouter un cours** : Formulaire pour créer un nouveau cours (réservé aux admins).
- **Sécurité** : Les fonctionnalités admin sont protégées par un guard Angular, affichant un message d'accès refusé pour les utilisateurs lambda.

## API

L'API est simulée avec **json-server**, qui fournit une fausse API REST basée sur un fichier `db.json`. Les endpoints incluent :

- `GET /courses` : Récupère la liste des cours.
- `GET /courses/:id` : Récupère un cours spécifique.
- `POST /courses` : Ajoute un nouveau cours.
- `PUT /courses/:id` : Met à jour un cours.
- `DELETE /courses/:id` : Supprime un cours.
- `GET /users` : Récupère la liste des utilisateurs pour l'authentification.
- `POST /users` : Crée un nouvel utilisateur (inscription).

Le fichier `db.json` contient les données initiales (cours et utilisateurs), et un script `server.js` est utilisé pour forcer la génération des `id` en entier.

## Architecture

- **Frontend** : Développé avec Angular 20+, utilisant des composants organisés dans des dossiers (`components`, `shared`, `service`).
  - **Composants** : `home`, `course-list`, `course-details`, `add-course`, `login`, `header`, `footer`, `about`.
  - **Services** : `course.service` gère les appels API.
  - **Guards** : `auth.guard` protège les routes admin.
- **Styles** : Utilisation de Bootstrap pour la mise en page, avec CSS personnalisé par composant & icons.
- **Routing** : Géré via `app-routing.module.ts` avec protection des routes.

## Lancement du site

### Prérequis

- Node.js et npm installés.
- `@angular/cli` et `json-server` installés globalement :
  ```bash
  npm install -g @angular/cli json-server
  ```
- Assure-toi que `db.json` et (optionnellement) `server.js` sont dans le répertoire racine.

### Scripts de lancement

Deux scripts sont fournis pour démarrer l'API et le serveur Angular, puis ouvrir l'URL dans le navigateur :

#### 1. Script Batch (Windows CMD) - `start-dev.bat`

- **Contenu** :
  ```batch
  @echo off
  echo Lancement de json-server...
  start cmd /k json-server --watch .\db.json
  timeout /t 2 /nobreak
  echo Lancement du serveur Angular...
  start cmd /k ng serve
  timeout /t 2 /nobreak
  echo Ouverture de l'URL dans le navigateur...
  start http://localhost:4200
  exit
  ```
- **Utilisation** : Double-clique sur `start-dev.bat` ou exécute-le dans une invite de commande.

#### 2. Script PowerShell - `start-dev.ps1`

- **Contenu** :
  ```powershell
  # Lancer json-server dans une nouvelle fenêtre
  Start-Process powershell -ArgumentList "-NoExit", "-Command", "json-server --watch .\db.json"
  Start-Sleep -Seconds 2
  # Lancer ng serve dans une nouvelle fenêtre
  Start-Process powershell -ArgumentList "-NoExit", "-Command", "ng serve"
  Start-Sleep -Seconds 2
  # Ouvrir l'URL dans le navigateur par défaut
  Start-Process "http://localhost:4200"
  Write-Host "Serveurs lancés et URL ouverte. Appuyez sur une touche pour fermer ce script..."
  Read-Host
  ```
- **Utilisation** : Exécute `.\start-dev.ps1` dans PowerShell (après avoir autorisé les scripts avec `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` si nécessaire).

### Étapes manuelles (alternative)

1. Ouvre un terminal et lance l'API :
   ```bash
   json-server --watch .\db.json
   ```
2. Ouvre un autre terminal et lance Angular :
   ```bash
   ng serve
   ```
3. Ouvre ton navigateur à `http://localhost:4200`.

### Dépannage

- Si une erreur 404 apparaît, vérifie que `db.json` est correct et que `json-server` est bien lancé.
- Ajuste l'URL ou le port si nécessaire (ex. : `ng serve --port 4201`).

---
