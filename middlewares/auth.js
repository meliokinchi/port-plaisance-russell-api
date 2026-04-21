/**
 * Middleware de protection des routes.
 * Vérifie qu'un utilisateur est connecté avant d'autoriser l'accès.
 * @module middlewares/auth
 */

/**
 * Autorise l'accès uniquement si l'utilisateur est authentifié.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 * @param {Function} next - Fonction de passage au middleware suivant.
 * @returns {Object|void}
 */
module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.redirect('/');
  }

  return res.status(401).json({
    message: 'Accès refusé. Veuillez vous connecter.'
  });
};