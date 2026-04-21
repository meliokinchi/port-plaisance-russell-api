/**
 * Fichier principal de l'application Express.
 * Configuration des middlewares, des vues, de la base de données,
 * des sessions, de la documentation Swagger et des différentes routes.
 * @module app
 */

require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectDB = require('./config/db');

// Import des fichiers de routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
connectDB();

// Configuration du proxy pour Render
app.set('trust proxy', 1);

// Middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des sessions utilisateur
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'port-plaisance-russell-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// Configuration du moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Retourne le fichier Swagger JSON dynamique
 * pour l'environnement local ou Render.
 */
app.get('/api-docs/swagger.json', (req, res) => {
  const doc = JSON.parse(JSON.stringify(swaggerDocument));

  if (Array.isArray(doc.servers)) {
    doc.servers = [
      {
        url: `${req.protocol}://${req.get('host')}`,
        description: 'Serveur courant'
      }
    ];
  }

  res.json(doc);
});

// Options de configuration Swagger
const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    url: '/api-docs/swagger.json',
    validatorUrl: null
  }
};

// Route de la documentation API
app.use(
  '/api-docs',
  swaggerUi.serveFiles(null, swaggerOptions),
  swaggerUi.setup(null, swaggerOptions)
);

// Déclaration des routes principales
app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);

/**
 * Route de la page d'accueil.
 */
app.get('/', (req, res) => {
  res.render('index');
});

/**
 * Route du tableau de bord.
 * Redirige vers l'accueil si aucun utilisateur n'est connecté.
 */
app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('dashboard', {
    user: req.session.user,
    currentDate: new Date().toLocaleDateString('fr-FR'),
    reservations: []
  });
});

/**
 * Route de la page de gestion des catways.
 * Redirige vers l'accueil si aucun utilisateur n'est connecté.
 */
app.get('/catways-page', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('catways-page');
});

/**
 * Route de la page de gestion des réservations.
 * Redirige vers l'accueil si aucun utilisateur n'est connecté.
 */
app.get('/reservations-page', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('reservations-page');
});

/**
 * Route de la page de gestion des utilisateurs.
 * Redirige vers l'accueil si aucun utilisateur n'est connecté.
 */
app.get('/users-page', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('users-page');
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});