import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Config from "../../Services/Config.json";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Nav.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ICONES } from '../../Assets/Images/Icones'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBarMenu() {
  const { userId } = useParams();
  const handleClose = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  const [userActif, setuserActif] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
  });
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
  useEffect(() => {
    findUser(); // Appeler findProduct une fois que le composant est monté
  }, []);

  //******************* Gestion boutton utilisateur*/
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  const [selectedItem, setSelectedItem] = useState('Produits');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  //************************************************* */
  const handleManageAccount = () => {
    // Ajoutez ici la logique pour gérer le compte de l'utilisateur
    console.log("Gérer mon compte...");
  };

  return (
    <Container>
      <Navbar
        id="navBar"
        variant="white"
        style={{
          marginRight: "150%",
          marginTop: "2px",
          borderRadius: "1%",
          padding: 0,
          width: "100%",
        }}
      >
        <Navbar.Brand href="#home">
          <img
            id="myLogo"
            src="/sunulogo.jpeg"
            height="100"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to={`/home/admin/${userId}`}
            className="navLink"
          >
            Acceuil
          </Nav.Link>
          <Nav.Link
            className="navLink"
            as={Link}
            to={`/home/admin/${userId}/products`}
            id={selectedItem === 'Produits' ? 'selected' : ''}
          >
            Produits
          </Nav.Link>
          <Nav.Link className="navLink" as={Link} to={`/home/admin/${userId}/colis`} 
          onClick={() => handleItemClick('Produits')}>
          </Nav.Link>
          <Nav.Link className="navLink" as={Link} to={`/home/admin/${userId}/trajets`} 
          id={selectedItem === 'Trajets' ? 'selected' : ''}
          >
           Trajets
          </Nav.Link>
          <Nav.Link className="navLink" as={Link} to={`/home/admin/${userId}/orders`}>
          Order / Commandes
          </Nav.Link>
          <Nav.Link className="navLink" as={Link} to={`/home/admin/${userId}/users`}>
            Utilisateurs
          </Nav.Link>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Rechercher"
              className="me-2"
              aria-label="Rechercher"
            />
            <Button className="buttonSearch" variant="secondary">
              <FontAwesomeIcon icon={ICONES.search }/>
            </Button>
          </Form>
          <div className="user-menu">
          {/* <FontAwesomeIcon icon="fa-user"  className="faUser"/> */}
            <button className="button01" onClick={toggleMenu}>
            {userActif.userFirstName} {userActif.userLastName}
            </button>
            {isOpen && (
              <ul className="dropdown-menu">
                <li>
                <Link to={`/home/admin/${userId}/users/${userActif._id}`}><strong>Gérer mon compte</strong></Link>
                  </li>
                <li>
                  <button onClick={handleClose}>Déconnexion</button>
                </li>
              </ul>
            )}
          </div>
        </Nav>
      </Navbar>
    </Container>
  );
}
