const colisModel = require("../Models/ColisModel");
const upload = require('./../Middlewares/multerMiddleware'); // Importer le middleware Multer
//***************CREATION COLIS************ */
const createTypeColis = async (req, res) => {
  try {
    const {colisTypeName, colisDescription,colisPriceByKG,colisPriceByLitre } = req.body;
    const colisImage = req.file.filename;
    const colisCreated = await colisModel.create({
        colisTypeName, colisDescription,colisPriceByKG,colisPriceByLitre,colisImage
      });
    res
      .status(200).json({ message: "Colis crée avec succès", colisCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la création des colis", error });
  };
};
//***************LECTURE COLIS************ */
const readAllColis = async (req, res) => {
  try {
    const allColis = await colisModel.find();
    res.status(200).json({ message: "Liste des colis", allColis });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des pays", error });
  }
};

//***************LECTURE COLIS BY ID************ */
const readColisByID = async (req, res) => {
    try {
        const colisId = req.params.id;
        const colis = await colisModel.findById(colisId);
        if (!colis) {
            return res.status(404).json({ message: 'Type de Colis introuvable' });
        }
        res.status(200).json({message : "Type de colis trouvé" , colis});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
  };
//***************MAJ COLIS************ */
const updateColis = async (req, res) => {
    try {
      const colisId = req.params.id;
      let updateFields = req.body; // Récupérer les autres champs à mettre à jour
  
      // Vérifier si une nouvelle image a été fournie
      if (req.file) {
        // Si oui, mettre à jour le champ "colisImage" avec le nom du fichier
        updateFields.colisImage = req.file.filename;
      }
  
      // Mettre à jour le colis dans la base de données
      const colisUpdated = await colisModel.findByIdAndUpdate(
        colisId, // id du colis à mettre à jour
        updateFields, // champs à mettre à jour
        { new: true } // renvoi le document modifié
      );
    if (colisUpdated) {
       return res.status(200).json({message : "La mise à jour des informations du colis s'est déroulé avec succès.",colisUpdated})
    } else {
      return res.status(404).json({message: "Aucune correspondance trouvée."})
    }
    } catch (error) {
        return res.status(500).json({message : "Erreur lors de la mise à jour.", error})
    }
};

// Route pour vérifier l'existence d'un produit par colisTypeName
const checkProductExistence = async (req, res) => {
  try {
    const { colisTypeName } = req.params;
    // Recherche un produit avec le même colisTypeName dans la base de données
    const existingProduct = await colisModel.findOne({ colisTypeName });
    // Si un produit avec le même colisTypeName existe déjà, renvoie true, sinon renvoie false
    const exists = !!existingProduct;
    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification de l'existence du produit", error });
  }
};
 
//***************DELETE COLIS************ */
const deleteColis = async (req, res) => {
    try {
        const colisDeleted = await colisModel.findByIdAndDelete(req.params.id)
        if (colisDeleted) {
            return res.status(200).json({message:"Le colis a été supprimé de la BDD."})
        } else {
          return res.status(404).json({message: "Aucune correspondance trouvée."})
        }

    } catch (error) {
       return res.status(500).json({message: "Erreur lors de la suppression.", error})
    }
};

module.exports = {createTypeColis,readAllColis,checkProductExistence, readColisByID, updateColis,deleteColis };
