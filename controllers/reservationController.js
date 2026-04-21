/**
 * Contrôleur de gestion des réservations.
 * Fournit les actions CRUD sur les réservations liées aux catways.
 * @module controllers/reservationController
 */

const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');

/**
 * Vérifie si la requête provient d'un formulaire HTML.
 * @param {Object} req - Requête Express.
 * @returns {boolean} True si la requête est envoyée via formulaire.
 */
function isFormRequest(req) {
  const contentType = req.get('content-type') || '';
  return contentType.includes('application/x-www-form-urlencoded');
}

/**
 * Récupère toutes les réservations d'un catway.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.getReservationsByCatway = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      catwayNumber: Number(req.params.id)
    }).sort({ startDate: 1 });

    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Récupère une réservation par identifiant.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id)
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Crée une réservation pour un catway.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.createReservation = async (req, res) => {
  try {
    const catway = await Catway.findOne({
      catwayNumber: Number(req.params.id)
    });

    if (!catway) {
      if (isFormRequest(req)) {
        return res.redirect('/reservations-page?error=catway-notfound');
      }
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    const reservation = new Reservation({
      ...req.body,
      catwayNumber: Number(req.params.id)
    });

    await reservation.save();

    if (isFormRequest(req)) {
      return res.redirect('/reservations-page?success=created');
    }

    return res.status(201).json({
      message: 'Réservation créée',
      reservation
    });
  } catch (error) {
    if (isFormRequest(req)) {
      return res.redirect('/reservations-page?error=create');
    }

    return res.status(400).json({ message: error.message });
  }
};

/**
 * Met à jour une réservation existante.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id)
    });

    if (!reservation) {
      if (isFormRequest(req)) {
        return res.redirect('/reservations-page?error=notfound');
      }
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    if (req.body.clientName) reservation.clientName = req.body.clientName;
    if (req.body.boatName) reservation.boatName = req.body.boatName;
    if (req.body.startDate) reservation.startDate = req.body.startDate;
    if (req.body.endDate) reservation.endDate = req.body.endDate;

    await reservation.save();

    if (isFormRequest(req)) {
      return res.redirect('/reservations-page?success=updated');
    }

    return res.status(200).json({
      message: 'Réservation mise à jour',
      reservation
    });
  } catch (error) {
    if (isFormRequest(req)) {
      return res.redirect('/reservations-page?error=update');
    }

    return res.status(400).json({ message: error.message });
  }
};

/**
 * Supprime une réservation.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id)
    });

    if (!reservation) {
      if (isFormRequest(req)) {
        return res.redirect('/reservations-page?error=notfound');
      }
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    if (isFormRequest(req)) {
      return res.redirect('/reservations-page?success=deleted');
    }

    return res.status(200).json({ message: 'Réservation supprimée' });
  } catch (error) {
    if (isFormRequest(req)) {
      return res.redirect('/reservations-page?error=delete');
    }

    return res.status(500).json({ message: error.message });
  }
};