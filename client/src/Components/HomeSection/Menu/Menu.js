import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../Assets/Styles/style.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Config from "../../../Services/Config.json";

export default function Menu() {
  const { userId } = useParams();

 //******************* Gestion boutton utilisateur*/
 const [isOpen, setIsOpen] = useState(false);

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
  findUser(); // Appeler findUser une fois que le composant est monté
}, []);



  return (
    <div>
      <Container>
        <Navbar
          id="navBar"
          variant="white"
          style={{
            margin: "1% 3% 0 0%",
            marginTop: "2px",
            borderRadius: "1%",
            padding: 0,
            width: "9 0%",
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
          <div>
            <Nav className="mr-auto">
            {userActif && userActif.userEmail  ? (
                <>
                  <Nav.Link  className="navLink" as={Link} to={`/home/${userId}`}>
                  Acceuil
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="navLink" as={Link} to={"/"}>
                Acceuil
                </Nav.Link>
              )}
              {/* <Nav.Link as={Link} to={"/"} className="navLink">
                Acceuil
              </Nav.Link> */}
              {userActif && userActif.userEmail  ? (
                <>
                  <Nav.Link  className="navLink" as={Link} to={`/home/${userId}/trajetList`}>
                    Trajets
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="navLink" as={Link} to={`/home/trajetList`}>
                  Trajets
                </Nav.Link>
              )}

              {userActif && userActif.userEmail  ? (
                <>
                  <Nav.Link  className="navLink" as={Link} to={`/home/${userId}/mesCommandes`}>
                  Order
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="navLink" as={Link} to={`/signin`}>
                Order
                </Nav.Link>
              )}

              {userActif.userEmail  ? (
                <>
                  <span className="navLink navdisConnect">Bienvenue, {userActif.userFirstName} {userActif.userLastName}</span>
                  <Nav.Link as={Link} to={`/`} onClick={handleClose}>
                    Déconnexion
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="navLink navConnect" as={Link} to={`/signin`}>
                  Connexion
                </Nav.Link>
              )}
            </Nav>
          </div>
        </Navbar>
      </Container>
    </div>
  );
}
