const mongoose = require("mongoose");

const trajetSchema = new mongoose.Schema({
  //********Définit le pays et la ville de départ et arrivée*/
  trajet_ZoneType: {
    type: String,
    require: true,
  },
  trajet_PlaceDepartureName: {
    type: String,
    require: true,
  },
  trajet_PlaceArrivalName: {
    type: String,
    require: true,
  },
  trajet_DateDepart: {
    type: Date,
  },
  trajet_DateArrivee: {
    type: Date,
  },
  trajet_Commentaires: {
    type: String,
  },
  trajet_zonePrice: {
    type: Number,
    require: true,
  },
  trajet_FrequenceZone: {
    type: String,
  },

  trajet_Statut: {
    type: Boolean,
  },
  //******************************************** */
  //Pour Stocker l'utilisateur qui a définit ou créé le trajet'
  trajetAuteurs: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
    },
    userFirstName: {
      type: String,
    },
    userLastName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userNumberPhone: {
      type: String,
    },
  },

  //Pour Stocker les utilisateurs ayant commandé ce trajet
  trajet_ListUsersForTrajet: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        require: true,
      },
      userFirstName: {
        type: String,
        require: true,
      },
      userLastName: {
        type: String,
        require: true,
      },
      userNumberPhone: {
        type: String,
        require: true,
      },
      userEmail: {
        type: String,
        require: true,
      },
    },
  ],
}, { timestamps: true });
module.exports = mongoose.model("TrajetSchema", trajetSchema);
