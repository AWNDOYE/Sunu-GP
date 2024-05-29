const mongoose = require("mongoose");

const VilleSchema = new mongoose.Schema(
  {
    villeNom: {
      type: String,
      require: true,
    },
    ville_PaysName: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("VilleSchema", VilleSchema);