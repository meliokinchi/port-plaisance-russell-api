/**
 * Routes de gestion des catways et des réservations associées.
 * Toutes les routes sont protégées par authentification.
 * @module routes/catwayRoutes
 */

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

/**
 * Récupère tous les catways.
 * @name GET /
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.get('/', auth, catwayController.getAllCatways);

/**
 * Récupère un catway par identifiant.
 * @name GET /:id
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.get('/:id', auth, catwayController.getCatwayById);

/**
 * Crée un nouveau catway.
 * @name POST /
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.post('/', auth, catwayController.createCatway);

/**
 * Met à jour un catway existant.
 * @name PUT /:id
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.put('/:id', auth, catwayController.updateCatway);

/**
 * Supprime un catway.
 * @name DELETE /:id
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.delete('/:id', auth, catwayController.deleteCatway);

/**
 * Récupère toutes les réservations d'un catway.
 * @name GET /:id/reservations
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.get('/:id/reservations', auth, reservationController.getReservationsByCatway);

/**
 * Récupère une réservation précise d'un catway.
 * @name GET /:id/reservations/:idReservation
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.get('/:id/reservations/:idReservation', auth, reservationController.getReservationById);

/**
 * Crée une réservation pour un catway.
 * @name POST /:id/reservations
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.post('/:id/reservations', auth, reservationController.createReservation);

/**
 * Met à jour une réservation d'un catway.
 * @name PUT /:id/reservations/:idReservation
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.put('/:id/reservations/:idReservation', auth, reservationController.updateReservation);

/**
 * Supprime une réservation d'un catway.
 * @name DELETE /:id/reservations/:idReservation
 * @function
 * @memberof module:routes/catwayRoutes
 */
router.delete('/:id/reservations/:idReservation', auth, reservationController.deleteReservation);

module.exports = router;