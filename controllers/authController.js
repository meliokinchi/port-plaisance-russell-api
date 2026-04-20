const User = require('../models/User');

const isHtmlRequest = (req) => req.headers.accept?.includes('text/html');

const sendErrorResponse = (req, res, status, message) => {
  if (isHtmlRequest(req)) {
    return res.status(status).send(message);
  }

  return res.status(status).json({ message });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(req, res, 400, 'Email et mot de passe requis');
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return sendErrorResponse(req, res, 401, 'Identifiants invalides');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return sendErrorResponse(req, res, 401, 'Identifiants invalides');
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    if (isHtmlRequest(req)) {
      return res.redirect('/dashboard');
    }

    return res.status(200).json({
      message: 'Connexion réussie',
      user: req.session.user
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    if (isHtmlRequest(req)) {
      return res.redirect('/');
    }

    return res.status(200).json({
      message: 'Déconnexion réussie'
    });
  });
};