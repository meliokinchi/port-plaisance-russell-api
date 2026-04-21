/**
 * Routes de gestion des utilisateurs.
 * Protégées par authentification.
 * @module routes/userRoutes
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

/**
 * Récupère tous les utilisateurs.
 * @name GET /
 * @function
 * @memberof module:routes/userRoutes
 */
router.get('/', auth, userController.getAllUsers);

/**
 * Récupère un utilisateur par email.
 * @name GET /:email
 * @function
 * @memberof module:routes/userRoutes
 */
router.get('/:email', auth, userController.getUserByEmail);

/**
 * Crée un nouvel utilisateur.
 * @name POST /
 * @function
 * @memberof module:routes/userRoutes
 */
router.post('/', auth, userController.createUser);

/**
 * Met à jour un utilisateur existant.
 * @name PUT /:email
 * @function
 * @memberof module:routes/userRoutes
 */
router.put('/:email', auth, userController.updateUser);

/**
 * Supprime un utilisateur.
 * @name DELETE /:email
 * @function
 * @memberof module:routes/userRoutes
 */
router.delete('/:email', auth, userController.deleteUser);

module.exports = router;