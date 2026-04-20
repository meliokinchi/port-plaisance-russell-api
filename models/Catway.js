const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: Number,
      required: [true, 'Le numéro du catway est obligatoire'],
      unique: true,
      min: 1
    },
    catwayType: {
      type: String,
      required: [true, 'Le type du catway est obligatoire'],
      enum: ['long', 'short'],
      lowercase: true,
      trim: true
    },
    catwayState: {
      type: String,
      required: [true, 'L’état du catway est obligatoire'],
      trim: true,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Catway', catwaySchema);