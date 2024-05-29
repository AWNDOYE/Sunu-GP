import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../Assets/Styles/trajet.css";
import Config from "../../../Services/Config.json";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>
        <strong>Liste des trajets</strong>
      </h1>
      <Link to={`/home/admin/${userId}/trajets/newTrajet`}>Nouveau Trajet</Link>
      <table className="product-table">
        <thead>
          <tr className="table-row">
            <th>Type</th>
            <th>Lieux Départ</th>
            <th>Lieux Arrivée</th>
            <th>Date Départ</th>
            <th>Date D'arrivée</th>
            <th>Prix Trajet</th>
            <th>Fréquence </th>
            <th>Statut</th>
            <th>Prénom - Auteur</th>
            <th>Nom </th>
            <th>Contact</th>
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
              <td>{trajet.trajet_zonePrice}</td>
              <td>{trajet.trajet_FrequenceZone}</td>
              <td>{trajet.trajet_Statut}</td>
              <td>{trajet.trajetAuteurs.userFirstName}</td>
              <td>{trajet.trajetAuteurs.userLastName}</td>
              <td>{trajet.trajetAuteurs.userNumberPhone}</td>
              <td>
                <Link to={`/home/admin/${userId}/trajets/${trajet._id}`}>
                  <strong>Voir Détails</strong>
                </Link>
              </td>
              <td>
                <Link
                  to={`/home/admin/${userId}/trajets/${trajet._id}/newOrder`}
                >
                  Nouveau Order
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
