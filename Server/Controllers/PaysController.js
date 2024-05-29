const paysModel = require("../Models/PaysModel");
//***************CREATION PAYS************ */
const createPays = async (req, res) => {
  try {
    const { paysName, pays_ZoneType } = req.body;
    const paysCreated = await paysModel.create({
        paysName,
        pays_ZoneType,
      });
    res
      .status(200).json({ message: "Liste pays crée avec succès", paysCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la création des pays", error });
  };
};
//***************LECTURE PAYS************ */
const readAllPays = async (req, res) => {
  try {
    const allPays = await paysModel.find();
    res.status(200).json({ message: "Liste des pays", allPays });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des pays", error });
  }
};

//***************LECTURE PAYS BY ID************ */
const readPaysByID = async (req, res) => {
    try {
        const paysId = req.params.id;
        const pays = await paysModel.findById(paysId);
        if (!pays) {
            return res.status(404).json({ message: 'Pays introuvable' });
        }
        res.status(200).json({message : "Pays find" , pays});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
  };

  //***************LISTE LES PAYS PAR ZONE************ */
const getPaysByZoneName = async (req, res) => {
    try {
        const zoneName = req.body;
        const listPays = await paysModel.find(zoneName);
        if (!listPays) {
            return res.status(404).json({ message: 'Liste des pays introuvable' });
        }
        return res.status(200).json({message : "Pays find" , listPays});
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des pays pour la zone"});
    }
  };
//***************MAJ PAYS************ */
const updatePays = async (req, res) => {
    try {
        const paysId = req.params.id;
        const {  paysName, pays_ZoneType} = req.body;
        const paysUpdated = await paysModel.findByIdAndUpdate(
            paysId, // id du pays recherchée
            { paysName, pays_ZoneType},
            {new : true}, // renvoi le document modifié
        );
    if (zoneUpdated) {
       return res.status(200).json({message : "Les informations du pays ont été mis à jour.",paysUpdated})
    } else {
      return res.status(404).json({message: "Aucune correspondance trouvée."})
    }
    } catch (error) {
        return res.status(500).json({message : "Erreur lors de la mise à jour.", error})
    }
};
//***************DELETE PAYS************ */
const deletePays = async (req, res) => {
    try {
        const paysDeleted = await paysModel.findByIdAndDelete(req.params.id)
        if (paysDeleted) {
            return res.status(200).json({message:"La zone a été supprimé de la BDD."})
        } else {
          return res.status(404).json({message: "Aucune correspondance trouvée."})
        }

    } catch (error) {
       return res.status(500).json({message: "Erreur lors de la suppression.", error})
    }
};

module.exports = { createPays, readAllPays,readPaysByID, deletePays, updatePays,getPaysByZoneName };
