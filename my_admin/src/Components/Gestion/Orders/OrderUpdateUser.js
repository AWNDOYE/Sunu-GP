import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Config from "../../../Services/Config.json";
import axios from "axios";
import { Card, CardBody, Form, Button } from "react-bootstrap";
import { formatISODate } from "./ChangeFormatDate";
import { calculateCost } from "./CalculateCost";
import { validerSaisie } from "./ValiderSaisie";

export default function OrderUpdate() {
  const navigate = useNavigate();
  const { orderId } = useParams();
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
  const [selectedProduct, setSelectedProduct] = useState({
    colisTypeName: "",
    colisDescription: "",
    colisPriceByKG: 0,
    colisPriceByLitre: 0,
    colisImage: "",
  });
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
  const [orderSelected, setOrderSelected] = useState(initialOrder);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [listOfTrajets, setListOfTrajets] = useState([]);
  const [isLiquidProduct, setIsLiquidProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productChange, setProductChange] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false); // Permet de vérifier si tous les états sont à jour avant l'envoi de la requête
  //************************************************************** */


  //***Remettre les champs à vides */
  const handleFocus = (e) => {
    e.target.value = "";
  };
  //******************* ***************************/
  const handleCancel = () => {
    navigate(-1); // Revenir à la page précédente
  };
  //************************************************************** */



  //********SEARCH ORDER BY ID************************************************* */
  /****************Récupération des données des produits et des trajets depuis l'API via UseEffect  */
  const findAllTrajets = async () => {
    try {
      const response = await axios.get(`${Config.api_url}/allTrajet`);
      setListOfTrajets(response.data.allTrajet); // Met à jour le state avec les données de la réponse
      console.log(response.data);
    } catch (error) {
      setError(error); // Met à jour le state error en cas d'erreur
    }
  };
  const findAllProducts = async () => {
    try {
      const response = await axios.get(`${Config.api_url}/allColis`);
      setListOfProducts(response.data.allColis); // Met à jour le state avec les données de la réponse
      console.log(response.data);
      setLoading(false); // Met à jour le state loading à false une fois que les données sont récupérées
    } catch (error) {
      setError(error); // Met à jour le state error en cas d'erreur
      setLoading(false); // Met à jour le state loading à false en cas d'erreur
    }
  };
   //********SEARCH TRAJT BY ID************************************************* */
   const findTrajet = async (trajetId) => {
    try {
      const response = await axios.get(
        `${Config.api_url}/showTrajet/${trajetId}`
      );
      setTrajet(response.data.trajet); // Met à jour le state avec les données de la réponse
      console.log(response.data.trajet);
    } catch (error) {
      console.error("Erreur lors de la recherche du trajet :", error);
    }
  };
  //***************SEARCH ORDER BY ID****************************************************** */
  const findOrder = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/showOrder/${orderId}`
      );
      setOrderSelected(response.data.oneOrder); // Met à jour le state avec les données de la réponse
      console.log(response.data.oneOrder);
    } catch (error) {
      console.error("Erreur lors de la recherche de l commande :", error);
    }
  };
  //*************************************************************************************** */
  
   // Au montage du composant on affiche le produit avec ses infos et le trajet sélectionné auparavent
  useEffect(() => {
    findOrder(); // Appeler findOrder une fois que le composant est monté
    findAllTrajets();
    findAllProducts();
  }, [orderId]);

   useEffect(() => {
    if (orderSelected.order_Trajet?.trajet_Id) {
      findTrajet(orderSelected.order_Trajet.trajet_Id);
    }
  }, [orderSelected.order_Trajet?.trajet_Id]);

  useEffect(() => {
    if (orderSelected.order_Colis?.colis_Id && listOfProducts.length > 0) {
      const product = listOfProducts.find(
        (p) => p._id === orderSelected.order_Colis.colis_Id
      );
      if (product) {
        setSelectedProduct({
          colisTypeName: product.colisTypeName,
          colisDescription: product.colisDescription,
          colisPriceByKG: product.colisPriceByKG,
          colisPriceByLitre: product.colisPriceByLitre,
          colisImage: "",
        });
      }
    }
  }, [orderSelected.order_Colis?.colis_Id, listOfProducts]);
  //************************************************************************** */
 

  //***********GESTION DE SELECTION D'UN NOUVEAU TRAJET************************************ */

  //*Permet de sélectionner le nouveau trajet à commander */
  const handleSelectTrajetOrder = (trajet) => {
    setTrajet(trajet);
    console.log(trajet)
    setOrderSelected((prevOrder) => ({
      ...prevOrder,
      order_Trajet: {
        trajet_Id: trajet._id,
      },
    }))
  };
//****************************************************************************************** */
  
  //*********GESTION DE SELECTION D'UN NOUVEAU PRODUIT********************** */

    //****************Permet de sélectionner le nouveau produit à commander **********/
    const handleSelectProductOrder = (product) => {
      setSelectedProduct(product); 
      setProductChange(true)  ; 
      setOrderSelected((prevOrder) => ({
        ...prevOrder,
        order_Colis: {
          colis_Id: product._id,
          order_ColisName: product.colisTypeName,
          order_ColisDescription: product.colisDescription,
          order_ColisPriceByKG: product.colisPriceByKG,
          order_ColisPriceByLitre: product.colisPriceByLitre,
        },
      }));
    };
  //*** Vérifie si le type de produit sélectionné est "Produits Liquides" . A chaque changement de produit , l'état est MAJ automatiquement*/
  useEffect(() => {
    // if (selectedProduct.colisTypeName) {
    //   setIsLiquidProduct(selectedProduct.colisTypeName === "Produits Liquides");
    //   setOrderSelected((prevOrder) => ({
    //     ...prevOrder,
    //     order_PoidsColis: selectedProduct.colisTypeName === "Produits Liquides" || prevOrder.order_PoidsColis !== ? 0 : prevOrder.order_PoidsColis,
    //     order_NombreDeLitreColis: selectedProduct.colisTypeName !== "Produits Liquides" ? 0 : prevOrder.order_NombreDeLitreColis,
        
    //   }));
    // }
    if (selectedProduct.colisTypeName === "Produits Liquides") {
      setIsLiquidProduct(true);
      setOrderSelected((prevOrder) => ({
        ...prevOrder,
        order_PoidsColis: 0,
        order_NombreDeLitreColis: 0,
        order_CoutColis: 0,
      }));
    } else {
      setIsLiquidProduct(false);
      setOrderSelected((prevOrder) => ({
        ...prevOrder,
        order_PoidsColis: 0,
        order_NombreDeLitreColis: prevOrder.order_NombreDeLitreColis, // Conserver la valeur actuelle si ce n'est pas un produit liquide
        order_CoutColis: 0,
      }));
    }
  }, [productChange]);

  // Si le produit sélectionné est un produit liquide on met à 0 la valeur du champ nombre de poids et vice-versa pour lors de la sélection des produits non liquide
  const handlePoidsChange = (e) => {
    const value = e.target.value;
    setOrderSelected((prevOrder) => ({
      ...prevOrder,
      order_PoidsColis: isLiquidProduct ? 0 : value,
    }));
  };

  const handleNB_LitreChange = (e) => {
    const value = e.target.value;
    setOrderSelected((prevOrder) => ({
      ...prevOrder,
      order_NombreDeLitreColis: !isLiquidProduct ? 0 : value,
    }));
  };
  //******************************************************************************* */

  //*****SUPPRESSION ORDER *********************/
  const handleDeleteOrder = async () => {
    console.log("delete",orderSelected)
    try {
      if (orderSelected.order_ColisStatus !== "Colis En Attente") {
        console.log("Order / Commande can't be deleted !");
        alert("Order / Commande can't be deleted !!");
      } else {
        const response = await axios.delete(`${Config.api_url}/deleteOrder/${orderId}`);
        console.log("Order / Commande deleted !", response.data);
        alert("La commande a été supprimée avec succès !");
        navigate(-1); // Revenir à la page précédente
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande :", error);
      alert("Erreur lors de la suppression de la commande : " + error.message);
    }
  };


  //************FONCTION APPELLER LORS DE LA SOUMMISSION DU FORMULAIRE************ */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(orderSelected)
    setIsReadyToSubmit(true);
     
  };

  useEffect(() => {
    if (isReadyToSubmit) {
      handleChangeOrder();
    }
  }, [isReadyToSubmit]);

  //*Procédure de mise à jour d'un order*/
  const handleChangeOrder = async () => {
      try {
        if (!validerSaisie(orderSelected, isLiquidProduct)) {
          return;
        }
        await axios.put(`${Config.api_url}/updateOrder/${orderId}`, orderSelected);
        alert(`La commande N° ${orderSelected.order_Numero} a été modifiée avec succès`);
        navigate(-1);
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
      }
  };
  //************************************************************************* */

  return (
    <div>
      <h2>OrderUpdate N° {orderSelected.order_Numero}</h2>
      <Card>
        <Form onSubmit={handleSubmit}>
          <CardBody>
            <h2>EXPEDITEUR</h2>

            <Form.Label>Informations </Form.Label>

            <Form.Group>
              <Form.Label>Nom Prénom </Form.Label>
              <Form.Text>{`${orderSelected.order_Utilisateurs.user_FirstName} ${orderSelected.order_Utilisateurs.user_LastName}`}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Numéro Téléphone</Form.Label>
              <Form.Text>
                {orderSelected.order_Utilisateurs.user_NumberPhone}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Text>
                {orderSelected.order_Utilisateurs.user_Email}
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Adresse - Location</Form.Label>
              <Form.Text>
                {orderSelected.order_Utilisateurs.user_Address}
              </Form.Text>
            </Form.Group>
          </CardBody>

          <CardBody>
            <h2>COLIS</h2>
            <Form.Group>
              <Form.Label>Type Colis : </Form.Label>
              <Form.Text>{selectedProduct.colisTypeName}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Descriptif : </Form.Label>
              <Form.Text>{selectedProduct.colisDescription}</Form.Text>
            </Form.Group>

            <Form.Group>
              {" "}
              <Form.Label>Prix / KG : </Form.Label>
              <Form.Text>{selectedProduct.colisPriceByKG}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Prix / L : </Form.Label>
              <Form.Text>{selectedProduct.colisPriceByLitre}</Form.Text>
            </Form.Group>
            <Form.Group>
              {listOfProducts.map((product, index) => (
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
                    <Button onClick={() => handleSelectProductOrder(product)}>
                      Commander{" "}
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </Form.Group>
          </CardBody>

          <CardBody>
            <h2>TRAJET</h2>
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
              <Form.Group>
                {listOfTrajets.map((trajet, index) => (
                  <Card key={index} style={{ width: "25rem" }}>
                    <CardBody>
                      <h2>
                        <strong> ZONE : {trajet.trajet_ZoneType}</strong></h2>
                        <h4><strong>{`${trajet.trajet_PlaceDepartureName} - ${trajet.trajet_PlaceArrivalName}`}</strong></h4>
                      
                      <p>
                        Départ le : {formatISODate(trajet.trajet_DateDepart)}
                      </p>
                      <p>
                        Arrivé le : {formatISODate(trajet.trajet_DateArrivee)}
                      </p>
                      <p>Prix Zone : {trajet.trajet_zonePrice}</p>
                      <Button onClick={() => handleSelectTrajetOrder(trajet)}>
                        Commander{" "}
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </Form.Group>
            </Form.Group>
          </CardBody>

          <CardBody>
            <h2>COMMANDE</h2>
          </CardBody>

          <Form.Group controlId="order_Numero">
            <Form.Label>Numéro de commande</Form.Label>
            <Form.Text>{orderSelected.order_Numero}</Form.Text>
          </Form.Group>

          <Form.Group controlId="order_NB_Poids">
            <Form.Label>Poids Total en KG</Form.Label>
            <Form.Control
              type="number"
              placeholder="Poids en KG"
              name="order_PoidsColis"
              value={orderSelected.order_PoidsColis}
              onChange={handlePoidsChange}
              onBlur={() =>
                calculateCost(
                  orderSelected,
                  trajet,
                  selectedProduct,
                  isLiquidProduct,
                  setOrderSelected
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
              value={orderSelected.order_NombreDeLitreColis}
              onChange={handleNB_LitreChange}
              onBlur={() =>
                calculateCost(
                  orderSelected,
                  trajet,
                  selectedProduct,
                  isLiquidProduct,
                  setOrderSelected
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
              value={orderSelected.order_Destinataires.nameDest}
              onChange={(e) => {
                setOrderSelected({
                  ...orderSelected,
                  order_Destinataires: {
                    ...orderSelected.order_Destinataires,
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
              value={orderSelected.order_Destinataires.telephoneDest}
              onFocus={handleFocus}
              onChange={(e) => {
                setOrderSelected({
                  ...orderSelected,
                  order_Destinataires: {
                    ...orderSelected.order_Destinataires,
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
              value={orderSelected.order_Destinataires.adresseDest}
              onChange={(e) => {
                setOrderSelected({
                  ...orderSelected,
                  order_Destinataires: {
                    ...orderSelected.order_Destinataires,
                    adresseDest: e.target.value,
                  },
                });
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="order_Cout">
            <Form.Label>Coût Total : </Form.Label>
            <Form.Control
              type="number"
              placeholder="Coût Total"
              name="order_CoutColis"
              value={orderSelected.order_CoutColis}
              onChange={() => {}}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Type Paiement</Form.Label>
            <Form.Control
              as="select"
              name="order_TypePayement"
              value={orderSelected.order_TypePayement}
              onChange={(e) =>
                setOrderSelected({
                  ...orderSelected,
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
              value={orderSelected.order_ColisStatus}
              onChange={(e) =>
                setOrderSelected({
                  ...orderSelected,
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

          <Button variant="primary" type="submit" >
            Enregistrer
          </Button>
          <Button variant="primary" onClick={handleDeleteOrder}>
            Supprimer
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            Annuler
          </Button>
        </Form>
      </Card>
    </div>
  );
}
