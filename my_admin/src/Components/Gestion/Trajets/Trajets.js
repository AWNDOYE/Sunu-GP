import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../Assets/Styles/trajet.css";
import Config from "../../../Services/Config.json";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../../Assets/Styles/allTable.css"
import { faClock as faClockSolid, faPenToSquare, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faClock as faClockRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Trajets() {
  //************UTILISATION DU HOOKS USESTATE POUR LA MISE A JOUR DE L'ETAT */
  const [listOfTraject, setlistOfTraject] = useState([]);
  const [error, setError] = useState("");
  const { userId } = useParams();

  //******************************UTILISATION DU HOOKS POUR LA RECUPERATION DES DONNEES DEPUIS L'API ET STOCKAGE DANS listOfTraject  MAJ VIA setlistOfTrajectET */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Config.api_url}/allTrajet`);
        setlistOfTraject(response.data.allTrajet); // Met à jour le state avec les données de la réponse
        console.log(response.data);
      } catch (error) {
        setError(error); // Met à jour le state error en cas d'erreur
      }
    };
    fetchData(); // Appel de la fonction fetchData
  }, []);
  //******************************************************************** */

  // *************************Fonction pour formater la date au format ISO 8601 ("yyyy-mm-dd")
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
  //****************************************************************************************************** */

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">
        <strong>LISTE DES TRAJETS</strong>
      </h1>
      <Link to={`/home/admin/${userId}/trajets/newTrajet`} className="new-product-link"><FontAwesomeIcon icon={faSquarePlus}/> Nouveau Trajet</Link>
      <table className="product-table">
        <thead>
          <tr className="table-row">
            <th>Zone</th>
            <th>Lieu Départ</th>
            <th>Lieu Arrivée</th>
            <th>Date Départ</th>
            <th>Date D'arrivée</th>
            <th>Prénom - Nom GP</th>
            <th> Statut</th>
          </tr>
        </thead>
        <tbody>
          {listOfTraject.map((trajet, index) => (
            <tr key={index}>
              <td>{trajet.trajet_ZoneType}</td>
              <td>{trajet.trajet_PlaceDepartureName}</td>
              <td>{trajet.trajet_PlaceArrivalName}</td>
              <td>{formatISODate(trajet.trajet_DateDepart)}</td>
              <td>{formatISODate(trajet.trajet_DateArrivee)}</td>
              <td>{`${trajet.trajetAuteurs.userFirstName}  ${trajet.trajetAuteurs.userLastName}`}</td>
              <td>{trajet && trajet.trajet_Statut ?(
                  <>
                    <FontAwesomeIcon icon={faClockRegular}/>
                  </>
                ) : (
                    <FontAwesomeIcon icon={faClockSolid}/>
                )}</td>
              <td>
                <Link to={`/home/admin/${userId}/trajets/${trajet._id}`} className="product-link">
                <FontAwesomeIcon icon={faPenToSquare}/>
                </Link>
              </td>
              {/* <td>
                <Link
                  to={`/home/admin/${userId}/trajets/${trajet._id}/newOrder`}
                >
                  Nouveau Order
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
