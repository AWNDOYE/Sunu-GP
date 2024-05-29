const mongoose = require("mongoose");

const ColisShema = new mongoose.Schema(
  {
    colisTypeName: {
      //"Courrier - Enveloppe", "Carton - Boîte", "Emballage - Sachet", "Valise"
      type: String,
      require: true,
      unique : true,
    },
    colisDescription: {
      type: String,
    },
    colisPriceByKG: {
      type: Number,
      default: 0,
    },
    colisPriceByLitre: {
      type: Number,
      default: 0,
    },
    colisImage: {
      type: String, // Le chemin de l'image sera stocké ici
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ColisSchema", ColisShema);
