import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Config from "../../Services/Config.json";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import "../../Assets/Styles/signIn.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = () => {
  const [data, setData] = useState({ userEmail: "", userPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFocus = () => {
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: response } = await axios.post(
        `${Config.api_url}/signIn`,
        data
      );
      if (response) {
        const user = response.userActif;
        console.log(response.token);
        console.log(user);
        console.log(response.userActif.userRole)
       if (user) {
        // Stocker les informations de l'utilisateur dans le stockage local
          localStorage.setItem("userRole", response.userActif.userRole);
          localStorage.setItem("token", response.token);
          // Rediriger l'utilisateur en fonction de son rôle
          if (user.userRole === 1) {
            // Administrateur
            const url = `/home/admin/${user._id}`;
         // Rediriger l'utilisateur vers la page d'accueil avec les paramètres d'URL
           window.location.href = url;
            // window.location.href = `/home/${user._id}/${user.userFirstName || ""} ${user.userLastName || ""}`;
          } else {
            // Utilisateur normal
            window.location.href = `/`;
            alert("Vous n'êtes pas autorisé(e) à accèder à cette page")

          }
       }
      } else {
        setError("Réponse invalide du serveur");

      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return setError(error);

    }
  };

  return (
    <Container id="myContainer">
    <Row>
      <Col className="firstCol" md="6">
        <img className="FilleConnecte" src="./sunulogo.jpeg" alt="echec" />
      </Col>
      <Col className="firstCol" md="6">
        <div className="layout-signin">
           <img className="logo" src="./sunulogo.jpeg" alt="echec" />
            <h1 className="tittle">Connexion</h1>
           
          <div className="form-signin">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="userEmail" className="group">
                <Form.Label className="label">Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={data.userEmail}
                  placeholder="Entrer votre adresse mail"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  required
                />
              </Form.Group>
              <Form.Group controlId="userPassword" className="group">
                <Form.Label className="label">Mot de passe:</Form.Label>
                <Form.Control
                  type="password"
                  name="userPassword"
                  value={data.userPassword}
                  placeholder="Entrer votre mot de passe"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  required
                />
              </Form.Group>
              <Button variant="secondary" type="submit" className="btn-form-connection" id="btn">
                Se connecter
              </Button>
            </Form>

            <div className="container-right-signin">
              <div className="card-title-signup sign-in">
                <p id="new-user">Vous N’avez pas de compte ? </p>
                <Link id="new-user" className="btn-form-connection" to="/signup">
                  Contacter l'Administrateur
                </Link>
              </div>
            </div>
          </div>
          <div>
            {error && (
              <h1 style={{ color: "red" }}>{error.response.data.message}</h1>
            )}
          </div>
        </div>
      </Col>
    </Row>
  </Container>
  
  );
};

export default SignIn;
