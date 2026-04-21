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
    console.log('POST /login touché');
    console.log('BODY =', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log('email/password manquant');
      return sendErrorResponse(req, res, 400, 'Email et mot de passe requis');
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log('EMAIL NORMALISE =', normalizedEmail);

    const user = await User.findOne({ email: normalizedEmail });
    console.log('USER =', user ? user.email : null);
    console.log('HASH =', user ? user.password : null);

    if (!user) {
      console.log('USER INTROUVABLE');
      return sendErrorResponse(req, res, 401, 'Identifiants invalides');
    }

    const isMatch = await user.comparePassword(password);
    console.log('MATCH =', isMatch);

    if (!isMatch) {
      console.log('MOT DE PASSE FAUX');
      return sendErrorResponse(req, res, 401, 'Identifiants invalides');
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    console.log('SESSION USER =', req.session.user);

    req.session.save((err) => {
      if (err) {
        console.log('ERREUR SESSION =', err);
        return res.status(500).json({ message: 'Erreur session' });
      }

      console.log('LOGIN OK');

      if (isHtmlRequest(req)) {
        return res.redirect('/dashboard');
      }

      return res.status(200).json({
        message: 'Connexion réussie',
        user: req.session.user
      });
    });
  } catch (error) {
    console.log('ERREUR LOGIN =', error);
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
    return res.status(200).json({ message: 'Déconnexion réussie' });
  });
};