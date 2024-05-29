import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Config from "../../../Services/Config.json";
import axios from "axios";
import { Card, CardBody, Form, Button } from "react-bootstrap";
import { formatISODate } from "./ChangeFormatDate";

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
  const [orderSelected, setOrderSelected] = useState(initialOrder);

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

  const [product, setProduct] = useState({
    colisTypeName: "",
    colisDescription: "",
    colisPriceByKG: 0,
    colisPriceByLitre: 0,
    colisImage : "",
  });

  //********SEARCH ORDER BY ID************************************************* */
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
 
  //********************************************************************************* */

  //********SEARCH TRAJT BY ID************************************************* */
  const findTrajet = async (trajetId) => {
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
  //***********************************************************************/

   //*****************RECHERCHER UN PRODUIT AVEC SON ID*********************
   const findProduct = async (productId) => {
    try {
      const response = await axios.get(
        `${Config.api_url}/showColis/${productId}`
      );
      setProduct(response.data.colis); // Met à jour le state avec les données de la réponse
      console.log(response.data.colis);
    } catch (error) {
      console.error("Erreur lors de la recherche du produit :", error);
    }
  };
//*************************************************************************** */
  useEffect(() => {
    findOrder(); // Appeler findOrder une fois que le composant est monté
  }, []);

  useEffect(() => {
    if (orderSelected && orderSelected.order_Trajet && orderSelected.order_Trajet.trajet_Id) {
      findTrajet(orderSelected.order_Trajet.trajet_Id);
    }
    if (orderSelected && orderSelected.order_Colis && orderSelected.order_Colis .colis_Id) {
      findProduct(orderSelected.order_Colis .colis_Id);
    }
  }, [orderSelected]);
//************************************************************************ */

//************FONCTION APPELLER LORS DE LA SOUMMISSION DU FORMULAIRE************ */
const handleSubmit = (e) => {
  e.preventDefault();
};
 //*Procédure de mise à jour d'un order*/
 const handleChangeOrder = async () => {
  // Assurez-vous que setTrajet a bien été exécuté avant de continuer
  try {

    const response = await axios
    .put(`${Config.api_url}/updateOrder/${orderId}`, orderSelected)
    .then((response) => {
      console.log("Mise à jour réussie !", response.data.orderUpdated);
      alert(`La commande N° ${orderSelected.order_Numero}  a été modifié avec succès`);
      navigate(-1); // Revenir à la page précédente
      // Peut-être mettre à jour l'état local ou afficher un message de succès ici
    })
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
};
//************************************************************************* */

  //******************* ***************************/
  const handleCancel = () => {
    navigate(-1); // Revenir à la page précédente
  };
  //************************************************************** */

  return (
    <div>
      OrderUpdate
      <Card>
      <Form onSubmit={handleSubmit}>
        <CardBody>
          <h2>EXPEDITEUR</h2>

          <Form.Label>Informations </Form.Label>

          <Form.Group>
            <Form.Label>Nom Prénom :</Form.Label>
            <Form.Text>{`${orderSelected.order_Utilisateurs.user_FirstName} ${orderSelected.order_Utilisateurs.user_LastName}`}</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Numéro Téléphone :</Form.Label>
            <Form.Text>
              {orderSelected.order_Utilisateurs.user_NumberPhone}
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Text>{orderSelected.order_Utilisateurs.user_Email}</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Adresse - Location : </Form.Label>
            <Form.Text>
              {orderSelected.order_Utilisateurs.user_Address}
            </Form.Text>
          </Form.Group>
        </CardBody>

        <CardBody>
          <h2>COLIS</h2>
          <img src={`http://localhost:5000/uploads/${product.colisImage}`} alt="Colis" />
          <Form.Group>
            <Form.Label>Type Colis : </Form.Label>
            <Form.Text>{orderSelected.order_Colis.order_ColisName}</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Descriptif : </Form.Label>
            <Form.Text>
              {orderSelected.order_Colis.order_ColisDescription}
            </Form.Text>
          </Form.Group>

          <Form.Group>
            {" "}
            <Form.Label>Prix / KG : </Form.Label>
            <Form.Text>
              {orderSelected.order_Colis.order_ColisPriceByKG}
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Prix / L : </Form.Label>
            <Form.Text>
              {orderSelected.order_Colis.order_ColisPriceByLitre}
            </Form.Text>
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
              <Form.Text>{formatISODate(trajet.trajet_DateArrivee)}</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Prix Zone : </Form.Label>
              <Form.Text>{trajet.trajet_zonePrice}</Form.Text>
            </Form.Group>
          </Form.Group>
        </CardBody>


        <CardBody>
          <h2>COMMANDE</h2>
        </CardBody>

        <Form.Group controlId="order_Numero">
          <Form.Label>Numéro de commande : </Form.Label>
          <Form.Text>{orderSelected.order_Numero}</Form.Text>
        </Form.Group>

        <Form.Group controlId="order_NB_Poids">
          <Form.Label>Poids Total en KG : </Form.Label>
          <Form.Text>{orderSelected.order_PoidsColis}</Form.Text>
        </Form.Group>

        <Form.Group controlId="order_NB_L">
          <Form.Label>Nombre de Litres : </Form.Label>
          <Form.Text>{orderSelected.order_NombreDeLitreColis}</Form.Text>
        </Form.Group>

        <Form.Group controlId="destinataire">
          <h2>Destinataire</h2>
          <Form.Group><Form.Label>Nom - Prénom : </Form.Label>
          <Form.Text>{orderSelected.order_Destinataires.nameDest}</Form.Text></Form.Group>
          

          <Form.Group><Form.Label>Numéro Téléphone : </Form.Label>
          <Form.Text>
            {orderSelected.order_Destinataires.telephoneDest}
          </Form.Text></Form.Group>
          

          <Form.Group><Form.Label>Adresse Domicile : </Form.Label>
          <Form.Text>{orderSelected.order_Destinataires.adresseDest}</Form.Text></Form.Group>
          
        </Form.Group>

        <Form.Group controlId="order_Cout">
          <Form.Label>Coût Total : </Form.Label>
          <Form.Text>{orderSelected.order_CoutColis}</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Type Paiement : </Form.Label>
          <Form.Text>{orderSelected.order_TypePayement}</Form.Text>
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
        <Button variant="primary" type="submit" onClick={handleChangeOrder}>
          Enregistrer
        </Button>
        <Button variant="primary" onClick={handleCancel}>
          Annuler
        </Button>
        </Form>
      </Card>
    </div>
  );
}
