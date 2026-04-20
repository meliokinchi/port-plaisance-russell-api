const mongoose = require('mongoose');

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