import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Config from "../../Services/Config.json";
import { Form, Col, Row, Button } from "react-bootstrap";
import "../../Assets/Styles/signUp.css";    
// import "bootstrap/dist/css/bootstrap.min.css";

function SignUp() {
  const [data, setData] = useState({
    userFirstName: "",
    userLastName: "",
    userNumberPhone: "",
    userAddress: "",
    userEmail: "",
    userPassword: "",
    userRole: 0,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${Config.api_url}/signUP`, data);
      window.location = "/";
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError(error);
    }
  };
  return (
    <div id="divContainer">
      <Row>
        <Col className="firstCol" md="6">
          <img className="FilleConnecte" src="./WhatsApp Image 2024-05-28 at 8.23.24 AM.jpeg" alt="echec" />
        </Col>
        <Col>
          <div className="layout-signup">
            <img className="logo" src="./sunulogo.jpeg" alt="echec" />
            <h1 className="tittle">S'inscrire</h1>
            <div className="form-signup">
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="parent-form-input"
                  controlId="userFirstName"
                >
                  <Form.Label className="label">Votre Prénom:</Form.Label>
                  <Form.Control
                    type="text"
                    name="userFirstName"
                    value={data.userFirstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="parent-form-input"
                  controlId="userLastName"
                >
                  <Form.Label className="label">Votre Nom:</Form.Label>
                  <Form.Control
                    type="text"
                    name="userLastName"
                    value={data.userLastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="parent-form-input"
                  controlId="userNumberPhone"
                >
                  <Form.Label className="label">Numéro Téléphone:</Form.Label>
                  <Form.Control
                    type="number"
                    name="userNumberPhone"
                    value={data.userNumberPhone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="parent-form-input"
                  controlId="userAddress"
                >
                  <Form.Label className="label">Adresse / Domicile :</Form.Label>
                  <Form.Control
                    type="text"
                    name="userAddress"
                    value={data.userAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="parent-form-input" controlId="userEmail">
                  <Form.Label className="label">Adresse Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="userEmail"
                    value={data.userEmail}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="parent-form-input"
                  controlId="userPassword"
                >
                  <Form.Label className="label">Mot de passe:</Form.Label>
                  <Form.Control
                    type="password"
                    name="userPassword"
                    value={data.userPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button
                 variant="secondary" type="submit" className="btn-form-connection" id="btn"
                >
                  S'inscrire
                </Button>
              </Form>

              <div className="container-right-signin">
                <div className="card-title-signup sign-in">
                  <p id="new-user">Vous avez déjà un compte ? </p>
                  <Link className="link" to="/signIn">
                    Se connecter ici
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
    </div>
  );
}

export default SignUp;
