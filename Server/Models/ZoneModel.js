const mongoose = require("mongoose");

const ZoneSchema = new mongoose.Schema({
    zoneType: {
        type: String,
        require:true,
      },
      zonePrice:{
        type : Number,
        require:true,
      },
},

{ timestamps: true });
module.exports = mongoose.model("ZoneSchema", ZoneSchema);
