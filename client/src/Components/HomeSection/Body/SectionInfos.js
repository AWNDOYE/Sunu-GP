import React from "react";
import "../../../Assets/Styles/sectionInfos.scss";
import { Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

// import FontAwesomeIcon
export default function SectionInfos() {
  const navigate = useNavigate();

  const handleClickGP = () => {
    navigate("/home/trajetList");
  };
  // const handleClickColis = () => {
  //   navigate("/product");
  // };

  return (
    <div className="infos">
      <div className="infosBox1">
        <div className="gp_online">
          <Slide duration={1500}>
            <h2>
              SUNU-GP{" "}
              <span>
                Envoyer vos <strong style={{ color: "#008080" }}>COLIS</strong>{" "}
                partout dans le{" "}
                <strong style={{ color: "#008080" }}>MONDE</strong>
              </span>
            </h2>{" "}
            <img
              style={{ width: "20rem", borderRadius: "5%" }}
              src="/WhatsApp Image 2024-05-28 at 8.23.15 AM.jpeg" alt="colis"
            />
          </Slide>
        </div>
        <div className="infoColis">
          <Fade cascade damping={0.1} delay={5}>
            {" "}
            <h1 style={{ textAlign: "center", color: "#008080" }}>
              + de <strong style={{ color: "white" }}>200 GP</strong> EN LIGNE
              SUR SUNUGP
            </h1>
            <li style={{ padding: "5px", marginLeft: "70px", color: "white" }}>
              Rechercher un trajet (Dakar - Paris), sélectionner votre colis et
              envoyer votre demande
            </li>
            <li style={{ padding: "5px", marginLeft: "70px", color: "white" }}>
              Recevez des messages de confirmation sur votre téléphone lors du
              pick-up et de la transmission de votre colis
            </li>
          </Fade>
          <Zoom><Button className="btnlistGP" onClick={handleClickGP}>
            CONSULTER LES GP EN LIGNE
          </Button></Zoom>
          
        </div>
      </div>

      {/* <div className="infosBox2">
        <div>
          {" "}
          <h1>ENVOYER VOS COLIS DANS LE MONDE ENTIER</h1>
          <p>
            Nous transportons vos colis dans toutes les villes de Dakar, toutes
            les régions du Sénégal et partout dans l'univers à moindre COÜT
          </p>
        </div>
        <div>
          <h1>
            AVEC SUNU-GP RESTEZ CONNECTER ET SUIVEZ VOS COLIS EN TEMPS REEL
          </h1>
          <p>
            Rechercher un trajet (Dakar - Paris), sélectionner votre colis et
            envoyer votre demande
          </p>
          <p>
            Recevez des messages de confirmation sur votre téléphone lors du
            pick-up et de la transmission de votre colis
          </p>
        </div>
      </div> */}

      <div className="infosBox3">
        {/* <div > <img className="img02" src="./Default_avion_avec_une_moto_3.jpg" alt="" Echec /></div>
        <div className="infosBoxDakar">
          <h1>RETROUVEZ TOUS LES GP EN LIGNE DANS SUNU-GP</h1>
          <h3>DISPONIBLE TOUS LES JOURS 24h/24 - 7j/7</h3>
          <p>NATIONAL  Dakar et ses environs 2000 Fcfa</p>
          <p>REGIONAL - Régions du Sénégal à partir de 3000 Fcfa</p>
          <p>INTERNATIONAL - Partout dans le monde à partir de 5000 Fcfa</p>
          <Button className="btnlistGP" onClick={handleClickGP}>CONSULTER LES GP EN LIGNE</Button>
        </div>*/}
      </div>
    </div>
  );
}
