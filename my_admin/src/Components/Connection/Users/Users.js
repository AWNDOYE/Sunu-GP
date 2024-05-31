import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../../../Assets/Styles//listProducts.css"
import Config from "../../../Services/Config.json";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../../Assets/Styles/allTable.css"
import {  faUserMinus,faUserGear,faPenToSquare,faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Users() {

  const [listOfUsers, setlistOfUsers] = useState([]);
  const [error, setError] = useState("");
  const { userId, userName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Config.api_url}/getAllUsers`);
        setlistOfUsers(response.data.allUers); // Met à jour le state avec les données de la réponse
        console.log(response.data)
      } catch (error) {
        setError(error); // Met à jour le state error en cas d'erreur
      }
    };
    fetchData(); // Appel de la fonction fetchData
  }, []); 

  return (
    <div className="product-list-container"><h1 className="product-list-title"><strong>GESTION DES UTILISATEURS</strong></h1>
    <Link to={`/home/admin/${userId}/users/newUser`} className="new-product-link"><FontAwesomeIcon icon={faSquarePlus}/> NOUVEAU USER</Link>
       <table className="product-table">
          <thead  >
            <tr className="table-row">
              <th>Prénom</th>
              <th>Nom</th>
              <th>Adresse Mail</th>
              <th>N° Téléphone</th>
              <th>Aresse (Rue, Pays, Ville)</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            {listOfUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.userFirstName}</td>
                <td>{user.userLastName}</td>
                <td>{user.userEmail}</td>
                <td>{user.userNumberPhone}</td>
                <td>{user.userAddress}</td>
                <td>{user && user.userRole ?(
                  <>
                    <FontAwesomeIcon icon={faUserGear}/>
                  </>
                ) : (
                    <FontAwesomeIcon icon={faUserMinus}/>
                )} </td>
                <td>
                <Link to={`/home/admin/${userId}/users/${user._id}`} className="product-link"><FontAwesomeIcon icon={faPenToSquare}/></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
  ) 
}


// {userActif && userActif.userEmail  ? (
//   <>
//     <Nav.Link  className="mynavLink" as={Link} to={`/home/${userId}`}>
//     Acceuil
//     </Nav.Link>
//   </>
// ) : (
//   <Nav.Link className="navLink" as={Link} to={"/"}>
//   Acceuil
//   </Nav.Link>
// )}