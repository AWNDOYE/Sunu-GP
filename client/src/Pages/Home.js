import React from "react";
// import SignIn from '../Components/Connection/SignIn'
import { Link } from "react-router-dom";
import SectionInfos from "../Components/HomeSection/Body/SectionInfos";
import SectionZone from "../Components/HomeSection/Body/SectionZone";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Home() {
  const { userId } = useParams();
  const handleClose = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  return (
    <div>
      <Container>
        <SectionInfos />
        <SectionZone />
        {/* Home User Client test Client
        <Link to="/signin">Connexion </Link>
        <button onClick={handleClose}>deconnexion</button> */}
  
      </Container>
    </div>
  );
}

export default Home;
