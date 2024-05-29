const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_Numero: {
      type: Number,
      require: true,
      unique: true,
    },
    //Les informations de l'utilisateur
    order_Utilisateurs: {
      user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
      },
      user_FirstName: {
        type: String,
        require: true,
      },
      user_LastName: {
        type: String,
        require: true,
      },
      user_Address: {
        type: String,
        require: true,
      },
      user_Email: {
        type: String,
        require: true,
      },
      user_NumberPhone: {
        type: String,
        require: true,
      },
    },

    //*************************************************** */

    //**********Informations du type de trajet********* */
    order_Trajet: {
      trajet_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrajetSchema",
        require: true,
      },
    },

    //********************************************************/
    //**********Informations du colis********* */
    order_Colis: {
      colis_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ColisSchema",
        require: true,
      },
      order_ColisName: {
        type: String,
        require: true,
      },
      order_ColisDescription: {
        type: String,
        require: true,
      },
      order_ColisPriceByKG: {
        type: Number,
        default: 0,
      },
      order_ColisPriceByLitre: {
        type: Number,
        default: 0,
      },
    },
    //******************Informations liées à la commande
    order_PoidsColis: {
      type: Number,
      default: 0,
    },
    order_NombreDeLitreColis: {
      type: Number,
      default: 0,
    },
    order_Destinataires: {
      nameDest: {
        type: String,
        require: true,
      },
      adresseDest: {
        type: String,
        require: true,
      },
      telephoneDest: {
        type: Number,
        require: true,
      },
    },
    order_ColisCommentaires: {
      type: String,
    },
    order_ColisStatus: {
      type: String,
    },
    order_TypePayement: {
      type: String,
    },
    order_CoutColis: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("OrderSchema", OrderSchema);
