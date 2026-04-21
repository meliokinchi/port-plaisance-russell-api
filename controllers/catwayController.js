/**
 * Contrôleur de gestion des catways.
 * Fournit les actions CRUD sur les catways.
 * @module controllers/catwayController
 */

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
 * Récupère tous les catways.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    return res.status(200).json(catways);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Récupère un catway par numéro.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findOne({
      catwayNumber: Number(req.params.id)
    });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    return res.status(200).json(catway);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Crée un nouveau catway.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.createCatway = async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();

    if (isFormRequest(req)) {
      return res.redirect('/catways-page?success=created');
    }

    return res.status(201).json({
      message: 'Catway créé',
      catway
    });
  } catch (error) {
    if (isFormRequest(req)) {
      if (error.code === 11000) {
        return res.redirect('/catways-page?error=duplicate');
      }
      return res.redirect('/catways-page?error=create');
    }

    return res.status(400).json({ message: error.message });
  }
};

/**
 * Met à jour un catway existant.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findOne({
      catwayNumber: Number(req.params.id)
    });

    if (!catway) {
      if (isFormRequest(req)) {
        return res.redirect('/catways-page?error=notfound');
      }
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    if (req.body.catwayState) {
      catway.catwayState = req.body.catwayState;
    }

    await catway.save();

    if (isFormRequest(req)) {
      return res.redirect('/catways-page?success=updated');
    }

    return res.status(200).json({
      message: 'Catway mis à jour',
      catway
    });
  } catch (error) {
    if (isFormRequest(req)) {
      return res.redirect('/catways-page?error=update');
    }

    return res.status(400).json({ message: error.message });
  }
};

/**
 * Supprime un catway.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @returns {Promise<void>}
 */
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({
      catwayNumber: Number(req.params.id)
    });

    if (!catway) {
      if (isFormRequest(req)) {
        return res.redirect('/catways-page?error=notfound');
      }
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    if (isFormRequest(req)) {
      return res.redirect('/catways-page?success=deleted');
    }

    return res.status(200).json({ message: 'Catway supprimé' });
  } catch (error) {
    if (isFormRequest(req)) {
      return res.redirect('/catways-page?error=delete');
    }

    return res.status(500).json({ message: error.message });
  }
};