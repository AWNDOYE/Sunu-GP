import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../../../Services/Config.json";
import { Card, CardBody, Form, Button } from "react-bootstrap";
import { formatISODate } from "./ChangeFormatDate";
import "../../../Assets/Styles/sectionTrajet.scss";
import { Fade, Slide, Zoom,Bounce } from "react-awesome-reveal";

export default function SectionTrajet() {
  const [listOfTraject, setlistOfTraject] = useState([]);
  const [error, setError] = useState("");
  const [userActif, setUserActif] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  //******************************UTILISATION DU HOOKS POUR LA RECUPERATION DES DONNEES DES TRAJETS POUR LESQUELLES LA DATE DE DEPART EST SUPERIEURE OU EGALE A LA DATE DU JOUR */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Config.api_url}/updateAllTrajet`);
        console.log(response.data.allTrajets);
        const filteredTrajects = response.data.allTrajets.filter(
          (trajet) => trajet.trajet_Statut === true
        );
        setlistOfTraject(filteredTrajects);
        console.log(listOfTraject);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  //******************************************************************** */

  const findUser = async () => {
    try {
      const response = await axios.get(`${Config.api_url}/getUserFind/${userId}`);
      setUserActif(response.data.userFind); // Met à jour le state avec les données de la réponse
      console.log(response.data.userFind);
    } catch (error) {
      console.error("Erreur lors de la recherche de l'utilisateur :", error);
    }
  };

  useEffect(() => {
    if (userId) {
      findUser(); // Appeler findUser une fois que le composant est monté
    }
  }, [userId]);



  const handleClickOrder = (trajetId) => {
    if (userId !== "") {
      setUserActif(true)
    }
    if (!userActif) {
      alert("Veuillez vous connecter pour commander un trajet");
     navigate("/signIn") 
    } else {
      // navigate("/home/${userId}/neworder");
      navigate(`/home/${userId}/${trajetId}/neworder`);
    }
    
  };

  return (
   
    <div className="list">
  {listOfTraject.map((trajet, index) => (
    <Slide duration={1500}>
      
      
    <div key={index} className="Mycard">
      <div className="zone">
      <Bounce><h2>
          <strong>Zone : {trajet.trajet_ZoneType}</strong>
        </h2></Bounce>
        
      </div>

      <div className="grid-container">
        <div className="lieuDepart">
          <p><strong>Lieu Départ : </strong></p>
          <p>{trajet.trajet_PlaceDepartureName}</p>
        </div>
         <div className="lieuDestination">
          <p><strong>Lieu Destination : </strong></p>
          <p>{trajet.trajet_PlaceArrivalName}</p>
        </div>
       
        
         <div className="dateDepart">
          <p><strong>Date Départ : </strong></p>
          <p>{formatISODate(trajet.trajet_DateDepart)}</p>
        </div>
        <div className="dateArrivee">
          <p><strong>Date d'Arrivée : </strong></p>
          <p>{formatISODate(trajet.trajet_DateArrivee)}</p>
        </div>
       
 <div className="contactGp">
          <p><strong> GP / Contact : </strong></p>
          <p>{`${trajet.trajetAuteurs.userLastName} ${trajet.trajetAuteurs.userFirstName}`}</p>
        </div>
       
        
        <div className="contactTel">
          <p><strong>GP / N° Téléphone : </strong></p>
          <p>{trajet.trajetAuteurs.userNumberPhone}</p>
        </div>
      </div>

      <div className="comments">
        <p><strong>Commentaires </strong></p>
        <p>{trajet.trajet_Commentaires}</p>
      </div>
   
      <button className="btnOrder" variant="light" onClick= {()=>handleClickOrder (trajet._id)}>
        Commander
      </button>
    </div>
    </Slide>
  ))}
</div>

  
  );
}
