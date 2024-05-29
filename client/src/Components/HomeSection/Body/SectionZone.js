import React, { useState } from "react";
import regional_Data from "../../../Data/RegionalData";
import international_Data from "../../../Data/InternationalData";
import { Card, CardBody, Button } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function SectionZone() {
  const [listOfInternationalData, setListOfInternationalData] =
    useState(international_Data);
  const [listOfRegionalData, setListOfRegionalData] = useState(regional_Data);
  return (
    <div style={{backgroundColor:" black ", borderRadius:"2%", marginTop:"5%", opacity:"80%"}}>
      <h1 style={{color:"white", textAlign:"center"}}>ZONES DESSERVIES</h1>
      <div style={{ margin:"2%", padding : "1%"}}>
        <h2 style={{ textAlign: "center",padding:"1%", margin: "0 5%", color:"white"}}>ZONE REGIONAL</h2>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          transitionTime={500}
          centerMode={true}
          centerSlidePercentage={25}
        >
          {listOfRegionalData.map((region, index) => (
            <Card key={index} style={{ width: "20rem", height: "18rem"}}>
              <img
                style={{ width: "20rem", height: "12rem", borderRadius:'1rem'}}
                src={region.imgVille}
                alt={region.titre}
              />
              <CardBody>
                <h5 style={{ textAlign: "center", color:"#008080", fontWeight:"800", fontSize:"15px", padding:"1%" }}>
                  <strong>{region.titre}</strong>
                </h5>
              </CardBody>
            </Card>
          ))}
        </Carousel>
      </div>

      <div style={{ margin:"2%", padding : "1%"}}>
        <h2 style={{ textAlign: "center", margin: "0 5%", color:"white" }}>ZONE INTERNATIONAL</h2>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          transitionTime={500}
          centerMode={true}
          centerSlidePercentage={25}
        >
          {listOfInternationalData.map((tows, index) => (
            <Card key={index} style={{ width: "20rem", height: "18rem"}}>
              <img
                style={{ width: "20rem", height: "12rem", borderRadius:'1rem'}}
                src={tows.imgVille}
                alt={tows.titre}
              />
              <CardBody>
                <h5 style={{ textAlign: "center", color:"#008080", fontWeight:"800", fontSize:"15px", padding:"1%" }}>
                  <strong>{tows.titre}</strong>
                </h5>
              </CardBody>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
