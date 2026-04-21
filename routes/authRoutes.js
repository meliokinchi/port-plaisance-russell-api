/**
 * Routes d'authentification de l'application.
 * Gère la connexion et la déconnexion des utilisateurs.
 * @module routes/authRoutes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * Route de connexion utilisateur.
 * @name POST /login
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/login', authController.login);

/**
 * Route de déconnexion utilisateur.
 * @name GET /logout
 * @function
 * @memberof module:routes/authRoutes
 */
router.get('/logout', authController.logout);

module.exports = router;