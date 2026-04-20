const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

router.get('/', auth, catwayController.getAllCatways);
router.get('/:id', auth, catwayController.getCatwayById);
router.post('/', auth, catwayController.createCatway);
router.put('/:id', auth, catwayController.updateCatway);
router.delete('/:id', auth, catwayController.deleteCatway);

router.get('/:id/reservations', auth, reservationController.getReservationsByCatway);
router.get('/:id/reservations/:idReservation', auth, reservationController.getReservationById);
router.post('/:id/reservations', auth, reservationController.createReservation);
router.put('/:id/reservations/:idReservation', auth, reservationController.updateReservation);
router.delete('/:id/reservations/:idReservation', auth, reservationController.deleteReservation);

module.exports = router;