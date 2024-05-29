import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import Config from "../Services/Config.json";

export default function Home() {

  const { userId } = useParams();//Récupération del'id du user en cours

  const [userActif, setuserActif] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
  });

//***************Recherhe du user************************************** */
  const findUser = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/getUserFind/${userId}`
      );
      setuserActif(response.data.userFind); // Met à jour le state avec les données de la réponse
      console.log(response.data.userFind);
    } catch (error) {
      console.error("Erreur lors de la recherche du produit :", error);
    }
  };
  //******Récupération des données depuis l'API via UseEffect  */
  useEffect(() => {
    findUser(); // Appeler findProduct une fois que le composant est monté
  }, []);
//************************************************************************************** */



  return (
    <Container>
      <div>
        Home Admin test
        <h1>Bienvenue, {userActif.userFirstName}!</h1>
        <p>Votre ID utilisateur est: {userId}</p>
      </div>
      <div>
        Home Admin test
        <h1>Bienvenue, {userActif.userFirstName}!</h1>
        <p>Votre ID utilisateur est: {userId}</p>
      </div>
      <div>
        Home Admin test
        <h1>Bienvenue, {userActif.userFirstName}!</h1>
        <p>Votre ID utilisateur est: {userId}</p>
      </div>
    </Container>
  );
}
