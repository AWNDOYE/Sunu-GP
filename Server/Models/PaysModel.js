const mongoose = require("mongoose");

const PaysSchema = new mongoose.Schema(
  {
    paysName: {
      type: String,
      require: true,
    },
    pays_ZoneType: {
      type: String,
      require:true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("PaysSchema", PaysSchema);
