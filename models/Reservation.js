const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, 'Le numéro du catway est obligatoire'],
      min: 1
    },
    clientName: {
      type: String,
      required: [true, 'Le nom du client est obligatoire'],
      trim: true,
      maxlength: 100
    },
    boatName: {
      type: String,
      required: [true, 'Le nom du bateau est obligatoire'],
      trim: true,
      maxlength: 100
    },
    startDate: {
      type: Date,
      required: [true, 'La date de début est obligatoire']
    },
    endDate: {
      type: Date,
      required: [true, 'La date de fin est obligatoire'],
      validate: {
        validator: function (value) {
          return !this.startDate || value >= this.startDate;
        },
        message: 'La date de fin doit être supérieure ou égale à la date de début'
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Reservation', reservationSchema);