require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/api-docs/swagger.json', (req, res) => {
  const doc = JSON.parse(JSON.stringify(swaggerDocument));

  if (doc.host) {
    doc.host = req.get('host');
  }

  if (doc.schemes && Array.isArray(doc.schemes)) {
    doc.schemes = [req.protocol];
  }

  if (doc.servers && Array.isArray(doc.servers)) {
    doc.servers = [
      {
        url: `${req.protocol}://${req.get('host')}`
      }
    ];
  }

  res.json(doc);
});

app.use(
  '/api-docs',
  swaggerUi.serveFiles(null, {
    swaggerOptions: {
      url: '/api-docs/swagger.json'
    }
  }),
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: '/api-docs/swagger.json'
    }
  })
);

app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('dashboard', {
    user: req.session.user,
    currentDate: new Date().toLocaleDateString('fr-FR'),
    reservations: []
  });
});

app.get('/catways-page', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('catways-page');
});

app.get('/reservations-page', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('reservations-page');
});

app.get('/users-page', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('users-page');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});