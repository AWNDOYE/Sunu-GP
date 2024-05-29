import React, { useState,useEffect } from "react";
import { Form, Button,Card,CardBody } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../../../Services/Config.json";


export default function UserUpdate() {

  const [userData, setUserData] = useState({
    userFirstName: "",
    userLastName: "",
    userNumberPhone: "",
    userAddress: "",
    userEmail: "",
    userPassword: "",
    userRole: 0, // Vous pouvez initialiser avec la valeur par défaut pour le rôle
  });
  const navigate = useNavigate();
  const { userId, userName, userIdChange } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const findUser= async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/getUserFind/${userIdChange}`
      );
      setUserData(response.data.userFind); // Met à jour le state avec les données de la réponse
      console.log(response.data.userFind);
    } catch (error) {
      console.error("Erreur lors de la recherche du produit :", error);
    }
  };
  useEffect(() => {
    findUser(); // Appeler findProduct une fois que le composant est monté
  }, []);


  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {     
     const response = await axios
     .put(`${Config.api_url}/getUserUpdated/${userIdChange}`, userData)
     .then((response) => {
       console.log("Mise à jour réussie !", response.data.userUpdated);
       alert(" La mise à jour s'est déroulée avec succès");
       navigate(-1); // Revenir à la page précédente
       // Peut-être mettre à jour l'état local ou afficher un message de succès ici
     })
   } catch (error) {
     console.error("Erreur lors de la mise à jour :", error);
   }
  };

  const handleCancel = () =>{
    navigate(-1); // Revenir à la page précédente
  }


  return (
    <div><div>
    <h1>MODIFICATION UTILISATEUR</h1>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmitUpdate}>
            <Form.Group controlId="userFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="userFirstName"
                value={userData.userFirstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="userLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="userLastName"
                value={userData.userLastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="userNumberPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="userNumberPhone"
                value={userData.userNumberPhone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="userAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="userAddress"
                value={userData.userAddress}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="userEmail"
                value={userData.userEmail}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* <Form.Group controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="userPassword"
                value={userData.userPassword}
                onChange={handleChange}
                required
              />
            </Form.Group> */}

            <Form.Group controlId="userRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="userRole"
                value={userData.userRole}
                onChange={handleChange}
                required
              >
                <option value={0}>Rôle par défaut</option>
                <option value={1}>Rôle Admnistrateur</option>
                {/* Ajoutez d'autres options de rôle selon vos besoins */}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="primary" onClick={handleCancel}>Annuler </Button>
          </Form>
        </CardBody>
      </Card>
    </div></div>
  )
}
