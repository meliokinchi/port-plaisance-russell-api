const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email.toLowerCase().trim()
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    return res.status(201).json({
      message: 'Utilisateur créé',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email.toLowerCase().trim();
    if (req.body.password) user.password = req.body.password;

    await user.save();

    return res.status(200).json({
      message: 'Utilisateur mis à jour',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      email: req.params.email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    return res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};