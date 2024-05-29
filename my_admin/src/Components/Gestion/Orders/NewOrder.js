import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Config from "../../../Services/Config.json";
import axios from "axios";
import { Card, CardBody, Form, Button } from "react-bootstrap";
import { calculateCost } from "./CalculateCost";
import { validerSaisie } from "./ValiderSaisie";
import { generateOrderNumber } from "./GenerateOrderNumber";

export default function NewOrder() {
  const { userId, trajetId } = useParams();
  const navigate = useNavigate();

  //**********INITIALISATION DES DIFFERENTS ETATS AVEC LEUR GETTEUR ET SETTEURS */
  const [trajet, setTrajet] = useState({
    trajet_ZoneType: "",
    trajet_PlaceDepartureName: "",
    trajet_PlaceArrivalName: "",
    trajet_DateDepart: "",
    trajet_DateArrivee: "",
    trajet_Commentaires: "",
    trajet_zonePrice: 0,
    trajet_FrequenceZone: "",
    trajet_Statut: 0,
    trajetAuteurs: {
      userId: "",
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userNumberPhone: "",
    },
    trajet_ListUsersForTrajet: [
      {
        userId: "",
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userNumberPhone: "",
      },
    ],
  });
  const [selectedProduct, setSelectedProduct] = useState({
    colisTypeName: "",
    colisDescription: "",
    colisPriceByKG: 0,
    colisPriceByLitre: 0,
    colisImage: "",
  });
  const [selectedUser, setSelectedUser] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userNumberPhone: "",
    userAddress: "",
  });
  const initialOrder = {
    order_Numero: 0,
    order_Utilisateurs: {
      user_Id: "",
      user_FirstName: "",
      user_LastName: "",
      user_Email: "",
      user_NumberPhone: "",
      user_Address: "",
    },
    order_Trajet: {
      trajet_Id: "",
    },
    order_Colis: {
      colis_Id: "",
      order_ColisName: "",
      order_ColisDescription: "",
      order_ColisPriceByKG: 0,
      order_ColisPriceByLitre: 0,
    },
    order_PoidsColis: 0,
    order_NombreDeLitreColis: 0,
    order_Destinataires: {
      nameDest: "",
      adresseDest: "",
      telephoneDest: 0,
    },
    order_ColisCommentaires: "",
    order_ColisStatus: "Colis En Attente",
    order_TypePayement: "",
    order_CoutColis: 0,
  };
  const [order, setOrder] = useState(initialOrder);
  const [listOfProduct, setListProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isLiquidProduct, setIsLiquidProduct] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false); // Permet de vérifier si tous les états sont à jour avant l'envoi de la requête
  //*************************************************************************************/

  //******************* ***************************/
  const handleCancel = () => {
    navigate(-1); // Revenir à la page précédente
  };
  //************************************************************** */

  //*Recherche des infos de l'utilisateur qui s'est connecté via son ID récupéré depuis les params */
  const findUser = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/getUserFind/${userId}`
      );
      setSelectedUser(response.data.userFind); // Met à jour le state avec les données de la réponse
    } catch (error) {
      console.error("Erreur lors de la recherche de l'utilisateur :", error);
    }
  };

  useEffect(() => {
    findUser(); // Appeler findTrajet une fois que le composant est monté
  }, []);

  /********************************************************************* */

  //********SEARCH TRAJT BY ID************************************************* */
  const findTrajet = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/showTrajet/${trajetId}`
      );
      setTrajet(response.data.trajet); // Met à jour le state avec les données de la réponse
      console.log(response.data.trajet);
    } catch (error) {
      console.error("Erreur lors de la recherche du produit :", error);
    }
  };
  useEffect(() => {
    findTrajet(); // Appeler findTrajet une fois que le composant est monté
  }, []);
  //***********************************************************************/

  // *****************************Fonction pour formater la date au format ISO 8601 ("yyyy-mm-dd")
  const formatISODate = (dateString) => {
    // Créez une nouvelle instance de Date à partir de la chaîne de date
    const date = new Date(dateString);
    // Vérifiez si la date est valide
    if (isNaN(date.getTime())) {
      // Si la date est invalide, retournez une chaîne vide
      return "";
    }
    // Utilisez la méthode toISOString() pour formater la date au format ISO 8601 ("yyyy-mm-dd")
    // et retournez la partie de la chaîne avant le caractère "T"
    return date.toISOString().split("T")[0];
  };
  //*********************************************************************** */

  //****************Récupération des données la liste des colis depuis l'API via UseEffect  */ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Config.api_url}/allColis`);
        setListProducts(response.data.allColis); // Met à jour le state avec les données de la réponse
        console.log(response.data);
        setLoading(false); // Met à jour le state loading à false une fois que les données sont récupérées
      } catch (error) {
        setError(error); // Met à jour le state error en cas d'erreur
        setLoading(false); // Met à jour le state loading à false en cas d'erreur
      }
    };
    fetchData(); // Appel de la fonction fetchData
  }, []);

  //*** Vérifie si le type de produit sélectionné est "Produits Liquides" . A chaque changement de produit , l'état est MAJ automatiquement*/
  useEffect(() => {
    if (selectedProduct.colisTypeName === "Produits Liquides") {
      setIsLiquidProduct(true);
    } else {
      setIsLiquidProduct(false);
    }
  }, [selectedProduct.colisTypeName]);
  //******************************************************************************* */

  //***Remettre les champs à vides */
  const handleFocus = (e) => {
    e.target.value = "";
  };

  //************FONCTION APPELLER LORS DE LA SOUMMISSION DU FORMULAIRE************ */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mettre à jour l'état avec les informations du produit sélectionné
    const uniqueOrderNumber = generateOrderNumber();
    setOrder((prevOrder) => ({
      ...prevOrder,
      order_Numero: uniqueOrderNumber,
      order_Colis: {
        ...prevOrder.order_Colis,
        colis_Id: selectedProduct._id,
        order_ColisName: selectedProduct.colisTypeName,
        order_ColisDescription: selectedProduct.colisDescription,
        order_ColisPriceByKG: selectedProduct.colisPriceByKG,
        order_ColisPriceByLitre: selectedProduct.colisPriceByLitre,
      },
      order_Utilisateurs: {
        ...prevOrder.order_Utilisateurs,
        user_Id: selectedUser._id,
        user_FirstName: selectedUser.userFirstName,
        user_LastName: selectedUser.userLastName,
        user_NumberPhone: selectedUser.userNumberPhone,
        user_Email: selectedUser.userEmail,
        user_Address: selectedUser.userAddress,
      },
      order_Trajet: {
        ...prevOrder.order_Trajet,
        trajet_Id: trajet._id,
      },
    }));
    setIsReadyToSubmit(true);
    console.log(trajet);
    console.log(order);
    console.log(selectedProduct._id, selectedUser._id, trajet._id);
    if (!selectedProduct._id || !selectedUser._id || !trajet._id) {
      console.error("One or more IDs are undefined or null");
    }
  };

  //**************************************************************************** */
  //***Fonction pour mettre à jour le tableau trajetListOfUsers du trajet pour dire que cet utilisateur a eu à commander ce trajet */
  const updateTab_Trajet = () => {
    // Copier le tableau existant trajetListOfUsers
    const newTabUsers = [...trajet.trajet_ListUsersForTrajet];
    // Ajouter l'utilisateur à la liste
    const newUser = {
      userId: selectedUser._id,
      userFirstName: selectedUser.userFirstName,
      userLastName: selectedUser.userLastName,
      userEmail: selectedUser.userEmail,
      userNumberPhone: selectedUser.userNumberPhone,
    };
    newTabUsers.push(newUser);
    // Mettre à jour le trajet avec le nouveau tableau trajetListOfUsers
    setTrajet((prevTrajet) => ({
      ...prevTrajet,
      trajet_ListUsersForTrajet: newTabUsers,
    }));
  };
  //*************************************************************************************** */

  //**********************AJOUT D'UN NEW ORDER******************************************** */
  useEffect(() => {
    if (isReadyToSubmit) {
      handleAddOrder();
    }
  }, [isReadyToSubmit]);

  //*Procédure d'ajout d'un new order*/
  const handleAddOrder = async () => {
    // Assurez-vous que setTrajet a bien été exécuté avant de continuer
    try {
      if (!validerSaisie(order, isLiquidProduct)) {
        return;
      }
      updateTab_Trajet();
      // Enregistrer la nouvelle commande
      const responseOrder = await axios.post(
        `${Config.api_url}/createOrder`,
        order
      );
      if (responseOrder.data.orderCreated) {
        console.log(
          "Nouvelle commande ajoutée avec succès !",
          responseOrder.data.orderCreated
        );
        alert("Nouvelle commande ajoutée avec succès !");
        // Mettre à jour le trajet
        const responseTrajet = await axios.put(
          `${Config.api_url}/updateTrajet/${trajet._id}`,
          trajet
        );
        console.log(
          "Trajet mis à jour avec succès !",
          responseTrajet.data.trajetUpdated
        );
        alert("Trajet mis à jour avec succès !");
        navigate(-1);
      } else {
        console.error(
          "Erreur lors de la création de la commande :",
          responseOrder.data
        );
        alert("Erreur lors de la création de la commande. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la nouvelle commande :", error);
      alert("Erreur lors de l'ajout de la nouvelle commande : ", error);
    }
  };
  //************************************************************************* */

  ///************AFFICHAGE FORMULAIRE**************************************** */
  //Au clique du bouton ajouter dans le card colis on met à jour l'état avec le produit sélectionné via le setteur setSelectedProduct et on met à jour l'état du formulaire  à true pour l'afficher. Le formulaire permet à  l'utilisateur de renseigner les informations
  const handleShowProductOrder = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };
  const renderForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        {/* Ajoutez ici les champs requis pour le formulaire d'affichage du colis */}
        {selectedProduct && (
          <>
            <Form.Group></Form.Group>
            <Form.Label>Type Colis</Form.Label>
            <Form.Text>{selectedProduct.colisTypeName}</Form.Text>

            <Form.Group>
              <Form.Label>Descriptif</Form.Label>
              <Form.Text>{selectedProduct.colisDescription}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Prix / KG</Form.Label>
              <Form.Text>{selectedProduct.colisPriceByKG}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Prix / L</Form.Label>
              <Form.Text>{selectedProduct.colisPriceByLitre}</Form.Text>
            </Form.Group>
          </>
        )}

        <Form.Group controlId="order_NB_Poids">
          <Form.Label>Poids Total en KG</Form.Label>
          <Form.Control
            type="number"
            placeholder="Poids en KG"
            name="order_PoidsColis"
            value={order.order_PoidsColis}
            onChange={(e) => {
              setOrder({
                ...order,
                order_PoidsColis: e.target.value,
              });
            }}
            onBlur={() =>
              calculateCost(
                order,
                trajet,
                selectedProduct,
                isLiquidProduct,
                setOrder
              )
            }
            disabled={isLiquidProduct}
            onFocus={handleFocus}
          />
        </Form.Group>

        <Form.Group controlId="order_NB_L">
          <Form.Label>Nombre de Litres</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nombre de Litres"
            name="order_NombreDeLitreColis"
            value={order.order_NombreDeLitreColis}
            onChange={(e) => {
              setOrder({
                ...order,
                order_NombreDeLitreColis: e.target.value,
              });
            }}
            onBlur={() =>
              calculateCost(
                order,
                trajet,
                selectedProduct,
                isLiquidProduct,
                setOrder
              )
            }
            disabled={!isLiquidProduct}
            onFocus={handleFocus}
          />
        </Form.Group>

        <Form.Group controlId="destinataire">
          <h2>Destinataire</h2>
          <Form.Label>Nom - Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom et Prénom Destinataire"
            name="nameDest"
            value={order.order_Destinataires.nameDest}
            onChange={(e) => {
              setOrder({
                ...order,
                order_Destinataires: {
                  ...order.order_Destinataires,
                  nameDest: e.target.value,
                },
              });
            }}
            required
          />

          <Form.Label>Numéro Téléphone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Numéro Tépéphone du destinataire"
            name="telephoneDest"
            value={order.order_Destinataires.telephoneDest}
            onFocus={handleFocus}
            onChange={(e) => {
              setOrder({
                ...order,
                order_Destinataires: {
                  ...order.order_Destinataires,
                  telephoneDest: e.target.value,
                },
              });
            }}
            required
          />

          <Form.Label>Adresse Domicile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Adresse Domicile du Destinataire"
            name="adresseDest"
            value={order.order_Destinataires.adresseDest}
            onChange={(e) => {
              setOrder({
                ...order,
                order_Destinataires: {
                  ...order.order_Destinataires,
                  adresseDest: e.target.value,
                },
              });
            }}
            required
          />
        </Form.Group>

        <Form.Group controlId="order_Cout">
          <Form.Label>Coût Total</Form.Label>
          <Form.Control
            type="number"
            placeholder="Coût Total"
            name="order_CoutColis"
            value={order.order_CoutColis}
            onChange={() => {}}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Type Paiement</Form.Label>
          <Form.Control
            as="select"
            name="order_TypePayement"
            value={order.order_TypePayement}
            onChange={(e) =>
              setOrder({
                ...order,
                order_TypePayement: e.target.value,
              })
            }
            required
          >
            <option value="">Sélectionner un type</option>
            <option value="Wave">Wave</option>
            <option value="Orange Money">Orange Money</option>
            <option value="E-Money">E-Money</option>
            <option value="Paiement à la Réception">
              Paiement à la Réception
            </option>
            <option value="Paiement Par Carte Bancaire">
              Paiement Par Carte Bancaire
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Statut Colis</Form.Label>
          <Form.Control
            as="select"
            name="order_ColisStatus"
            value={order.order_ColisStatus}
            onChange={(e) =>
              setOrder({
                ...order,
                order_ColisStatus: e.target.value,
              })
            }
            required
          >
            <option value="Colis Transmis">Colis Transmis</option>
            <option value="Colis En Attente">Colis En Attente</option>
            <option value="Colis En Cours d'Envoi">
              Colis En Cours d'Envoi
            </option>
            <option value="Colis Réceptionné">Colis Réceptionné</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enregistrer
        </Button>
        <Button variant="primary" onClick={handleCancel}>
          Annuler
        </Button>
      </Form>
    );
  };
  //***************************************************** */
  //**On affiche les informations liées au trajet sélectionné précédemment par l'utilisateur, puis on affiche la liste des produits. Lors de la sélection d'un produit, un nouveau formulaire est affiché avec les informations du produits sélectionné et les informations à sasir pour l'ajout de la commande */
  return (
    <div>
      NewOrder {trajetId}
      <Card>
        <CardBody>
          <Form>
            <Form.Group controlId="trajetAuteurs">
              <Form.Label>Informations de l'auteur</Form.Label>
              <Form.Group>
                <Form.Label>Nom Prénom : </Form.Label>
                <Form.Text>{`${trajet.trajetAuteurs.userFirstName} ${trajet.trajetAuteurs.userLastName}`}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Adresse Email : </Form.Label>
                <Form.Text>{trajet.trajetAuteurs.userEmail}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Numéro Téléphone : </Form.Label>
                <Form.Text>{trajet.trajetAuteurs.userNumberPhone}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Type Zone : </Form.Label>
                <Form.Text>{trajet.trajet_ZoneType}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Lieu de Départ : </Form.Label>
                <Form.Text>{trajet.trajet_PlaceDepartureName}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Lieu de Destination : </Form.Label>
                <Form.Text>{trajet.trajet_PlaceArrivalName}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Date Départ : </Form.Label>
                <Form.Text>{formatISODate(trajet.trajet_DateDepart)}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Date d'Arrivée : </Form.Label>
                <Form.Text>
                  {formatISODate(trajet.trajet_DateArrivee)}
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Prix Zone : </Form.Label>
                <Form.Text>{trajet.trajet_zonePrice}</Form.Text>
              </Form.Group>
            </Form.Group>
          </Form>
        </CardBody>

        <CardBody>
          <Form.Group controlId="infosColis">
            {listOfProduct.map((product, index) => (
              <Card key={index} style={{ width: "25rem" }}>
                <img
                  style={{ width: "25rem", height: "28rem" }}
                  src={`http://localhost:5000/uploads/${product.colisImage}`}
                  alt="Colis"
                />
                <CardBody>
                  <h3>
                    <strong>{product.colisTypeName}</strong>
                  </h3>
                  <p>{product.colisPriceByKG}</p>
                  <p>{product.colisPriceByLitre}</p>
                  <p>{product.colisDescription}</p>
                  <Button onClick={() => handleShowProductOrder(product)}>
                    Commander{" "}
                  </Button>
                </CardBody>
              </Card>
            ))}
            {showForm && renderForm()}
          </Form.Group>
        </CardBody>
      </Card>
    </div>
  );
}
