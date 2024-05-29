const townModel = require("../Models/VilleModel");
//***************CREATION VILLE************ */
const createTown = async (req, res) => {
  try {
    const { villeNom, ville_PaysName } = req.body;
    const townCreated = await townModel.create({
        villeNom, ville_PaysName,
      });
    res
      .status(200).json({ message: "Liste des villes crée avec succès", townCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la création des villes", error });
  };
};
//***************LECTURE VILLE************ */
const readAllTown = async (req, res) => {
  try {
    const allTown = await townModel.find();
    res.status(200).json({ message: "Liste des pays", allTown });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des pays", error });
  }
};

//***************LECTURE VILLE BY ID************ */
const readTownByID = async (req, res) => {
    try {
        const townId = req.params.id;
        const towns = await townModel.findById(townId);
        if (!pays) {
            return res.status(404).json({ message: 'Towns not found' });
        }
        res.status(200).json({message : "Town find" , towns});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
  };

  //***************LISTE LES VILLES PAR PAYS************ */
const getTownByCountryName = async (req, res) => {
    try {
        const countryName = req.body;
        const listOfTowns = await townModel.find(countryName);
        if (!listOfTowns) {
            return res.status(404).json({ message: 'List of towns not found' });
        }
        return res.status(200).json({message : "Towns founded" , listOfTowns});
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des villes par pays"});
    }
  };
//***************MAJ VILLE************ */
const updateTown = async (req, res) => {
    try {
        const townId = req.params.id;
        const { villeNom, ville_PaysName} = req.body;
        const townUpdated = await townModel.findByIdAndUpdate(
            townId, // id de la ville recherchée
            {  villeNom, ville_PaysName},
            {new : true}, // renvoi le document modifié
        );
    if (townUpdated) {
       return res.status(200).json({message : "Les informations de la ville ont été mis à jour.",townUpdated})
    } else {
      return res.status(404).json({message: "Aucune correspondance trouvée."})
    }
    } catch (error) {
        return res.status(500).json({message : "Erreur lors de la mise à jour.", error})
    }
};
//***************DELETE VILLE************ */
const deleteTown = async (req, res) => {
    try {
        const townDeleted = await townModel.findByIdAndDelete(req.params.id)
        if (townDeleted) {
            return res.status(200).json({message:"La zone a été supprimé de la BDD."})
        } else {
          return res.status(404).json({message: "Aucune correspondance trouvée."})
        }

    } catch (error) {
       return res.status(500).json({message: "Erreur lors de la suppression.", error})
    }
};

module.exports = { createTown, readAllTown,readTownByID, deleteTown, updateTown,getTownByCountryName };
