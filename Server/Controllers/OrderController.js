const orderModel = require("../Models/OrderModel");
//***************CREATION COMMANDE************ */
const createTypeOrder = async (req, res) => {
  try {
    const {
      order_Numero,
      order_Utilisateurs, // firstName , lastName, numberPhone
      order_Colis,
      order_Trajet,
      order_PoidsColis,
      order_NombreDeLitreColis,
      order_Destinataires, // nom+prenom , adresse
      order_ColisCommentaires,
      order_ColisStatus,
      order_TypePayement,
      order_CoutColis,
    } = req.body;

    const orderCreated = await orderModel.create({
      order_Numero,
      order_Utilisateurs, // firstName , lastName, numberPhone
      order_Colis,
      order_Trajet,
      order_PoidsColis,
      order_NombreDeLitreColis,
      order_Destinataires, // nom+prenom , adresse
      order_ColisCommentaires,
      order_ColisStatus,
      order_TypePayement,
      order_CoutColis,
    });
    res.status(200).json({ message: "Commande validée avec succès", orderCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la création de la commande", error });
  }
};
//***************LECTURE COMMANDE************ */
const readAllOrder = async (req, res) => {
  try {
    const allOrder = await orderModel.find();
    res.status(200).json({ message: "Liste des commandes : ", allOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commandes", error });
  }
};

//***************LECTURE COMMANDE BY ID************ */
const readOrderByID = async (req, res) => {
  try {
    const orderId = req.params.id;
    const oneOrder = await orderModel.findById(orderId);
    if (!oneOrder) {
      return res.status(404).json({ message: "Commande introuvable" });
    }
    res.status(200).json({ message: "Commande trouvé : ", oneOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//***************MAJ COMMANDE************ */
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const {
      order_Numero,
      order_Utilisateurs, // firstName , lastName, numberPhone
      order_Colis,
      order_Trajet,
      order_PoidsColis,
      order_NombreDeLitreColis,
      order_Destinataires, // nom+prenom , adresse
      order_ColisCommentaires,
      order_ColisStatus,
      order_TypePayement,
      order_CoutColis,
    } = req.body;
    const orderUpdated = await orderModel.findByIdAndUpdate(
      orderId, // id recherché
      {
        order_Numero,
      order_Utilisateurs, // firstName , lastName, numberPhone
      order_Colis,
      order_Trajet,
      order_PoidsColis,
      order_NombreDeLitreColis,
      order_Destinataires, // nom+prenom , adresse
      order_ColisCommentaires,
      order_ColisStatus,
      order_TypePayement,
      order_CoutColis,
      },
      { new: true } // renvoi le document modifié
    );
    if (orderUpdated) {
      return res
        .status(200)
        .json({
          message:
            "Commande mise à jour avec succès.",
            orderUpdated,
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
//***************DELETE COMMANDE************ */
const deleteOrder = async (req, res) => {
  try {
    const orderDeleted = await orderModel.findByIdAndDelete(req.params.id);
    if (orderDeleted) {
      return res
        .status(200)
        .json({ message: "La commande a été supprimé de la BDD." });
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
//***************LISTER ORDER /USER************ */
const listOrderOfUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log("User ID:", userId); // Log l'ID de l'utilisateur
    const ordersByUser = await orderModel.find({ 'order_Utilisateurs.user_Id': userId });
    res.status(200).json(ordersByUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error });
  }
};

module.exports = {
  createTypeOrder,
  readAllOrder,
  readOrderByID,
  updateOrder,
  deleteOrder,
  listOrderOfUser,
};
