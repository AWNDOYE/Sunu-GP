import React, { useState } from 'react';
import axios from "axios"
import {Link}  from "react-router-dom"
import Config from "../../Services/Config.json"
import { Form, Col, Row, Button } from "react-bootstrap";
import "../../Assets/Styles/signIn.css";
import "bootstrap/dist/css/bootstrap.min.css";   

const SignIn = () => {
    const [data, setData] = useState({ userEmail: '', userPassword: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFocus = () => {
        setError(null);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const url = `${config.api_url}/signin`;
            // const { data: response } = await Instance.post(url, data);
            const {data : response} = await axios.post(`${Config.api_url}/signIn`,data)
            // await axios.post('http://localhost:5000/api/signIn',data)
            if (response) {
                const user = response.userActif;
                const role = response.userActif.userRole
                console.log("monrole", role)
                console.log(response.token);
                if (user) {
                    localStorage.setItem("token", response.token);
                    const url = `/home/${user._id}/mesCommandes`;
                    window.location = url;
                }
            } else {
                setError("Réponse invalide du serveur");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError(error);
        }
    };

    return (
    <div id="divContainer">
    <Row>
      <Col className="firstCol" md="6">
        <img className="FilleConnecte" src="./WhatsApp Image 2024-05-28 at 8.23.24 AM.jpeg" alt="echec" />
      </Col>
      <Col className="firstCol info" md="6">
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
                <Link className='btn-form-connection' to='/signUp'>
                            Inscrivez-vous
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
};
export default SignIn;