const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

console.log("Auth.js");
// 1. **`createToken`:**
//     - Cette fonction crée un jeton JWT pour un utilisateur donné.
//     - Elle prend en entrée un `id`, un `email` et un `role` de l'utilisateur.
//     - Elle utilise `jwt.sign()` pour créer un jeton JWT contenant un objet avec les données de l'utilisateur (`id`, `email`, `role`).
//     - La clé secrète (`process.env.JWT_KEY`) utilisée pour signer le jeton est récupérée depuis les variables d'environnement.
//     - Le jeton est configuré pour expirer après 1 jour (`expiresIn: "1d"`).
//     - La fonction renvoie le jeton JWT créé.

const createTokenUser = (id, email, role) => {
  return jwt.sign({ data: { id, email, role } }, process.env.TOKEN_KEY, {
    expiresIn: "1d",
  });
};

//Fonction de création d'un nouveau user
const signUP = async (req, res) => {
  const {
    userFirstName,
    userLastName,
    userNumberPhone,
    userAddress,
    userEmail,
    userPassword,
    userRole,
  } = req.body;
  try {
    //Vérifier si l'utilisateur existe déjà à travers son adresse mail
    const userMailExiste = await User.findOne({ userEmail });
    if (userMailExiste) {
      return res
        .status(409)
        .json({ message: "Cet utilisateur existe déjà dans le système." });
    }
    // Encrypter password avant l'enregistrement
    const salt = await bcrypt.genSalt(10);
    const mdpCrypted = await bcrypt.hash(userPassword, salt);

    const newUser = await User.create({
      userFirstName,
      userLastName,
      userNumberPhone,
      userAddress,
      userEmail,
      userPassword: mdpCrypted,
      userRole,
    });
    return res
      .status(201)
      .json({ message: " successfully creation User  ...", newUser });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const signIn = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const userActif = await User.findOne({ userEmail });
    if (!userActif) {
      return res
        .status(401)
        .json({
          message: `L'utilisateur avec l'email : ${userEmail} n'existe pas.`,
        });
    }
    const compareMDP = bcrypt.compareSync(userPassword, userActif.userPassword);
    if (!compareMDP) {
      return res.status(401).json({ message: "Mot de passe Incorrect!!!" });
    }
    const token = createTokenUser(
      userActif._id,
      userActif.userEmail,
      userActif.userRole
    );
    res
      .status(200)
      .json({ message: "Successfully connection", token, userActif });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

//***************LECTURE User BY ID************ */
const readUserByID = async (req, res) => {
  try {
    const userId = req.params.id;
    const userFind = await User.findById(userId);
    if (!userFind) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    res.status(200).json({ message: "User found", userFind });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//***************LECTURE TRAJET************ */
const readAllUsers = async (req, res) => {
  try {
    const allUers = await User.find();
    res.status(200).json({ message: "Liste des users disponibles", allUers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des users", error });
  }
};
//***************MAJ TRAJET************ */
const updateUser = async (req, res) => {
  try {
    //Vérifier si l'utilisateur existe déjà à travers son adresse mail
    const userMailExiste = await User.findOne({ userEmail });
    if (userMailExiste) {
      return res
        .status(409)
        .json({ message: "Cet utilisateur existe déjà dans le système." });
    }
    const userId = req.params.id;
    const {
    userFirstName,
    userLastName,
    userNumberPhone,
    userAddress,
    userEmail,
    userPassword,
    userRole,
    } = req.body;
    const userUpdated = await User.findByIdAndUpdate(
      userId, // id du trajet recherché
      {
        userFirstName,
        userLastName,
        userNumberPhone,
        userAddress,
        userEmail,
        userPassword,
        userRole,
      },
      { new: true } // renvoi le document modifié
    );
    if (userUpdated) {
      return res
        .status(200)
        .json({
          message:
            "La mise à jour des informations de l'utilisateur s'est déroulé avec succès.",
            userUpdated,
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

module.exports = { signUP, signIn, readUserByID,readAllUsers,updateUser };
