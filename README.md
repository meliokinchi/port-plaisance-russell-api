# 📘 Port de Plaisance Russell API
Application web réalisée avec Node.js, Express, MongoDB et EJS pour la gestion du port de plaisance Russell. Le projet permet de gérer les catways, les réservations et les utilisateurs, avec une authentification par session et une documentation API accessible depuis l'accueil.

🌐 Liens du projet
Application déployée : https://port-plaisance-russell-api.onrender.com

Dépôt GitHub : https://github.com/meliokinchi/port-plaisance-russell-api

Documentation API : https://port-plaisance-russell-api.onrender.com/api-docs

🔐 Compte de test
Email : bilal@test.com

Mot de passe : Bilal2026!

✅ Fonctionnalités
Page d'accueil avec formulaire de connexion.
​

Authentification avec POST /login.
​

Déconnexion avec GET /logout.
​

Dashboard après connexion.
​

Gestion des catways : création, consultation, modification, suppression.

Gestion des réservations : création, consultation, modification, suppression.

Gestion des utilisateurs.

Documentation Swagger accessible depuis l'application.

🚀 Lancer le projet en local
bash
git clone https://github.com/meliokinchi/port-plaisance-russell-api.git
cd port-plaisance-russell-api
npm install
npm start
Ensuite, ouvrir le navigateur sur :

text
http://localhost:3000
🧪 Tests rapides
Connexion
Utiliser le compte de test suivant :

text
Email : bilal@test.com
Mot de passe : Bilal2026!
Catways
Ouvrir la page Catways.

Créer un catway avec un numéro libre.

Vérifier sa présence via GET /catways.

Modifier son état.

Supprimer ce catway de test.

Réservations
Ouvrir la page Réservations.

Créer une réservation sur le catway 24.

Vérifier la réservation via GET /catways/24/reservations.

Modifier puis supprimer la réservation de test.

Utilisateurs
Ouvrir la page Users.

Consulter la liste des utilisateurs.

Tester la création d'un utilisateur.

📄 Documentation API
La documentation Swagger est disponible à l'adresse suivante :

text
https://port-plaisance-russell-api.onrender.com/api-docs
Elle permet de consulter les routes principales et de tester les endpoints de l'API.

🛠️ Stack technique
Node.js

Express

MongoDB / Mongoose

EJS

express-session

method-override

swagger-ui-express
