# RailRoad API

Cette API a été développée pour RailRoad ltd, une entreprise visant à offrir la meilleure expérience pour les déplacements locaux et nationaux.

## Fonctionnalités

- Gestion des utilisateurs (CRUD)
- Authentification avec JWT
- Gestion des trains (CRUD)
- Gestion des gares (CRUD)
- Réservation et validation de billets
- Validation des données avec Joi
- Redimensionnement des images pour les gares

## Installation

1. Clonez le dépôt
2. Exécutez `npm install` pour installer les dépendances
3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
PORT=3000
MONGODB_URI=votre_chaine_de_connexion_mong
db JWT_SECRET=votre_secr
4. Lancez le serveur avec `npm start`

## Documentation de l'API

La documentation de l'API est disponible à l'adresse `/api-docs` lorsque le serveur est en cours d'exécution.

## Tests

Exécutez `npm test` pour lancer la suite de tests.

## Technologies utilisées

- Node.js
- Express.js
- MongoDB avec Mongoose
- JWT pour l'authentification
- Joi pour la validation des données
- Multer et Sharp pour le traitement des images
- Jest et Supertest pour les tests
- Swagger pour la documentation de l'API

## Contribution

Veuillez lire CONTRIBUTING.md pour plus de détails sur notre code de conduite et le processus de soumission des pull requests.

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE.md pour plus de détails.
