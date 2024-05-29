const trajetModel = require("../Models/TrajetModel");
//***************CREATION TRAJET************ */
const createTypeTrajet = async (req, res) => {
  try {
    const {
      trajet_ZoneType,
      trajet_PlaceDepartureName,
      trajet_PlaceArrivalName,
      trajet_DateDepart,
      trajet_DateArrivee,
      trajet_Commentaires,
      trajet_zonePrice,
      trajet_FrequenceZone,
      trajet_Statut,
      trajetAuteurs,
      trajet_ListUsersForTrajet,
    } = req.body;

    const trajetCreated = await trajetModel.create({
      trajet_ZoneType,
      trajet_PlaceDepartureName,
      trajet_PlaceArrivalName,
      trajet_DateDepart,
      trajet_DateArrivee,
      trajet_Commentaires,
      trajet_zonePrice,
      trajet_FrequenceZone,
      trajet_Statut,
      trajetAuteurs,
      trajet_ListUsersForTrajet,
    });
    res.status(200).json({ message: "Trajet crée avec succès", trajetCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la création du trajet", error });
  }
};
//***************LECTURE TRAJET************ */
const readAllTrajet = async (req, res) => {
  try {
    const allTrajet = await trajetModel.find();
    res.status(200).json({ message: "Liste des trajets disponibles", allTrajet });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des trajets", error });
  }
};

//***************LECTURE TRAJET BY ID************ */
const readTrajetByID = async (req, res) => {
  try {
    const trajetId = req.params.id;
    const trajet = await trajetModel.findById(trajetId);
    if (!trajet) {
      return res.status(404).json({ message: "Type de trajet introuvable" });
    }
    res.status(200).json({ message: "Type de trajet trouvé", trajet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//***************MAJ TRAJET************ */
const updateTrajet = async (req, res) => {
  try {
    const trajetId = req.params.id;
    const {
      trajet_ZoneType,
      trajet_PlaceDepartureName,
      trajet_PlaceArrivalName,
      trajet_DateDepart,
      trajet_DateArrivee,
      trajet_Commentaires,
      trajet_zonePrice,
      trajet_FrequenceZone,
      trajet_Statut,
      trajetAuteurs,
      trajet_ListUsersForTrajet,
    } = req.body;
    const trajetUpdated = await trajetModel.findByIdAndUpdate(
      trajetId, // id du trajet recherché
      {
      trajet_ZoneType,
      trajet_PlaceDepartureName,
      trajet_PlaceArrivalName,
      trajet_DateDepart,
      trajet_DateArrivee,
      trajet_Commentaires,
      trajet_zonePrice,
      trajet_FrequenceZone,
      trajet_Statut,
      trajetAuteurs,
      trajet_ListUsersForTrajet,
      },
      { new: true } // renvoi le document modifié
    );
    if (trajetUpdated) {
      return res
        .status(200)
        .json({
          message:
            "La mise à jour des informations du trajet s'est déroulé avec succès.",
          trajetUpdated,
        });
    } else {
      return res
        .status(404)
        .json({ message: "Aucune correspondance trouvée." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour.", error });
  }
};
//***************DELETE TRAJET************ */
const deleteTrajet = async (req, res) => {
  try {
    const trajetDeleted = await trajetModel.findByIdAndDelete(req.params.id);
    if (trajetDeleted) {
      return res
        .status(200)
        .json({ message: "Le trajet a été supprimé de la BDD." });
    } else {
      return res
        .status(404)
        .json({ message: "Aucune correspondance trouvée." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression.", error });
  }
};

//***************MAJ TRAJET************ */
const updateStatutAllTrajet = async (req, res) => {

  try {
    const today = new Date();
    await trajetModel.updateMany(
      { trajet_DateDepart: { $lt: today } },
      { $set: { trajet_Statut: false } }
    );

    const allTrajets = await trajetModel.find();
    res.json({  message:
      "La mise à jour des informations du trajet s'est déroulé avec succès.",allTrajets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createTypeTrajet,
  readAllTrajet,
  readTrajetByID,
  updateTrajet,
  deleteTrajet,
  updateStatutAllTrajet,
};
