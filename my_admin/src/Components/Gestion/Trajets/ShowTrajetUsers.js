import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Config from "../../../Services/Config.json";
import axios from "axios";
import { Button} from "react-bootstrap";
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function ShowTrajetUsers () {
    
  const {userId,trajetId } = useParams();
  const navigate = useNavigate();

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
  }, [trajetId]);
  //********************************************************************************* */

const handleClose = ()=>{
    navigate(-1);
}

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">
        <strong>LISTE DES UTILISATEURS DU TRAJET {trajet._id}</strong>
      </h1>
      <table className="product-table">
        <thead>
          <tr className="table-row">
            <th>Prénom</th>
            <th>Nom</th>
            <th>Adresse Mail</th>
            <th>N° Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {trajet.trajet_ListUsersForTrajet.map((trajetUser, index) => (
            <tr key={index}>
              <td>{trajetUser.userFirstName}</td>
              <td>{trajetUser.userLastName}</td>
              <td>{trajetUser.userEmail}</td>
              <td>{trajetUser.userNumberPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="btnFermer" onClick={handleClose}>Fermer  <FontAwesomeIcon icon={faCircleXmark}/></Button>
    </div>
  );
}
