require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'port-plaisance-russell-secret',
    resave: false,
    saveUninitialized: false
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Port de Plaisance Russell',
    version: '1.0.0',
    description: 'Documentation simple de l’API privée du Port de Plaisance Russell'
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],
  paths: {
    '/login': {
      post: {
        summary: 'Connexion utilisateur',
        responses: {
          200: {
            description: 'Connexion réussie'
          }
        }
      }
    },
    '/logout': {
      get: {
        summary: 'Déconnexion utilisateur',
        responses: {
          200: {
            description: 'Déconnexion réussie'
          }
        }
      }
    },
    '/catways': {
      get: {
        summary: 'Lister les catways',
        responses: {
          200: {
            description: 'Liste des catways'
          }
        }
      },
      post: {
        summary: 'Créer un catway',
        responses: {
          201: {
            description: 'Catway créé'
          }
        }
      }
    },
    '/catways/{id}': {
      get: {
        summary: 'Récupérer un catway',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Catway trouvé'
          }
        }
      },
      put: {
        summary: 'Modifier l’état d’un catway',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Catway mis à jour'
          }
        }
      },
      delete: {
        summary: 'Supprimer un catway',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Catway supprimé'
          }
        }
      }
    },
    '/catways/{id}/reservations': {
      get: {
        summary: 'Lister les réservations d’un catway',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Liste des réservations'
          }
        }
      },
      post: {
        summary: 'Créer une réservation pour un catway',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          201: {
            description: 'Réservation créée'
          }
        }
      },
      put: {
        summary: 'Modifier une réservation',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Réservation mise à jour'
          }
        }
      }
    },
    '/catways/{id}/reservations/{idReservation}': {
      get: {
        summary: 'Récupérer une réservation',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          },
          {
            name: 'idReservation',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Réservation trouvée'
          }
        }
      },
      delete: {
        summary: 'Supprimer une réservation',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          },
          {
            name: 'idReservation',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Réservation supprimée'
          }
        }
      }
    },
    '/users': {
      get: {
        summary: 'Lister les utilisateurs',
        responses: {
          200: {
            description: 'Liste des utilisateurs'
          }
        }
      },
      post: {
        summary: 'Créer un utilisateur',
        responses: {
          201: {
            description: 'Utilisateur créé'
          }
        }
      }
    },
    '/users/{email}': {
      get: {
        summary: 'Récupérer un utilisateur',
        parameters: [
          {
            name: 'email',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Utilisateur trouvé'
          }
        }
      },
      put: {
        summary: 'Modifier un utilisateur',
        parameters: [
          {
            name: 'email',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Utilisateur mis à jour'
          }
        }
      },
      delete: {
        summary: 'Supprimer un utilisateur',
        parameters: [
          {
            name: 'email',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Utilisateur supprimé'
          }
        }
      }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  res.render('dashboard', {
    user: req.session.user,
    currentDate: new Date().toLocaleDateString('fr-FR'),
    reservations: []
  });
});

app.get('/catways-page', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  res.render('catways-page');
});

app.get('/reservations-page', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  res.render('reservations-page');
});

app.get('/users-page', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }

  res.render('users-page');
});

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route introuvable'
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});