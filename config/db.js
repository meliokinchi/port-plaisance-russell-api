/**
 * Connexion à la base de données MongoDB.
 * @module config/db
 */

const mongoose = require('mongoose');

/**
 * Établit la connexion à MongoDB.
 * Arrête le processus si la connexion échoue.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URLMONGO);
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Erreur connexion MongoDB :', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;