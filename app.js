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

// ✅ CORRECTION 1: authRoutes AVANT tout
app.use(authRoutes);  // ← ÇA C'EST LA CLÉ

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

// ✅ CORRECTION 2: Routes API APRÈS
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