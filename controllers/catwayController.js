const Catway = require('../models/Catway');

exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    return res.status(200).json(catways);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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

exports.createCatway = async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();

    return res.status(201).json({
      message: 'Catway créé',
      catway
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findOne({
      catwayNumber: Number(req.params.id)
    });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    if (req.body.catwayState) {
      catway.catwayState = req.body.catwayState;
    }

    await catway.save();

    return res.status(200).json({
      message: 'Catway mis à jour',
      catway
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({
      catwayNumber: Number(req.params.id)
    });

    if (!catway) {
      return res.status(404).json({ message: 'Catway introuvable' });
    }

    return res.status(200).json({ message: 'Catway supprimé' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};