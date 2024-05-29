const zoneModel = require("../Models/ZoneModel");
//***************CREATION ZONE************ */
const createZone = async (req, res) => {
  try {
    const { zoneType, zonePrice } = req.body;
    const zoneCreated = await zoneModel.create({
        zoneType,
        zonePrice,
      });
    res
      .status(200).json({ message: "Liste zone crée avec succès", zoneCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la création des zones", error });
  };
};
//***************LECTURE ZONE************ */
const readAllZone = async (req, res) => {
  try {
    const allZone = await zoneModel.find();
    res.status(200).json({ message: "Liste des zones", allZone });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des zones", error });
  }
};

//***************LECTURE ZONE BY ID************ */
const readZoneByID = async (req, res) => {
    try {
        const zoneId = req.params.id;
        const zone = await zoneModel.findById(zoneId);
        if (!zone) {
            return res.status(404).json({ message: 'Zone introuvable' });
        }
        res.status(200).json({message : "Zone find" , zone});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
  };
//***************MAJ ZONE************ */
const updateZone = async (req, res) => {
    try {
        const zoneId = req.params.id;
        const { zoneType, zonePrice} = req.body;
        const zoneUpdated = await zoneModel.findByIdAndUpdate(
            zoneId, // id de la zone recherchée
            {zoneType, //attribut à mettre à jour
            zonePrice},
            {new : true}, // renvoi le document modifié
        );
    if (zoneUpdated) {
       return res.status(200).json({message : "Les informations de la zone ont été mis à jour.",zoneUpdated})
    } else {
      return res.status(404).json({message: "Aucune correspondance trouvée."})
    }
    } catch (error) {
        return res.status(500).json({message : "Erreur lors de la mise à jour.", error})
    }
};
//***************DELETE ZONE************ */
const deleteZone = async (req, res) => {
    try {
        const zoneDeleted = await zoneModel.findByIdAndDelete(req.params.id)
        if (zoneDeleted) {
            return res.status(200).json({message:"La zone a été supprimé de la BDD."})
        } else {
          return res.status(404).json({message: "Aucune correspondance trouvée."})
        }

    } catch (error) {
       return res.status(500).json({message: "Erreur lors de la suppression.", error})
    }
};

module.exports = { createZone, readAllZone,readZoneByID, deleteZone, updateZone };
