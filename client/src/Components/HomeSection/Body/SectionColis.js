import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from '../../../Services/Config.json'
import { Card,CardBody, Form, Button  } from 'react-bootstrap';

export default function SectionColis() {
const [listOfProduct, setListProducts] = useState([]);
  const [error, setError] = useState("");
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);


  //****************Récupération des données depuis l'API via UseEffect  */ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Config.api_url}/allColis`);
        setListProducts(response.data.allColis); // Met à jour le state avec les données de la réponse
        console.log(response.data)
        setLoading(false); // Met à jour le state loading à false une fois que les données sont récupérées
      } catch (error) {
        setError(error); // Met à jour le state error en cas d'erreur
        setLoading(false); // Met à jour le state loading à false en cas d'erreur
      }
    };
    fetchData(); // Appel de la fonction fetchData
  }, []); 
//****************************************************************************** */




  return (
    <div style={{backgroundColor:'white', border:"solid 2px #008080", borderRadius:"3%" ,opacity:"150%", width:"95%", display: "flex",justifyContent: "center", flexWrap: "wrap", padding:'3px', margin: "2%", rowGap: "15px",columnGap:"15px", alignItems:'center' }}>
  {listOfProduct.map((product, index) => (
              <Card key={index} style={{  width: '18rem', height:'28rem', position: 'relative', backgroundColor:"white", border:"solid 1px black", margin : "1%", color: 'black',borderRadius:"2%" }}>
                <img
                  style={{ width: "18rem", height: "15rem",borderRadius:"2%"  }}
                  src={`http://localhost:5000/uploads/${product.colisImage}`}
                  alt="Colis"
                />
                <CardBody>
                  <h3 style={{ textAlign:"center", fontSize:"25px", color:"gold"}}>
                    <strong>{product.colisTypeName}</strong>
                  </h3>
                  <p style={{ textAlign:"center", fontSize:"20px"}}><strong>Prix Au Poids : </strong>{product.colisPriceByKG}</p>
                  <p style={{ textAlign:"center", fontSize:"20px"}}><strong>Prix Par Litres :</strong> {product.colisPriceByLitre}</p>
                  <p style={{ textAlign:"center", fontSize:"15px"}}> {product.colisDescription}</p>
                  <Button style={{position: 'absolute', width:"100%", bottom:"0px", height:"2.5rem", cursor:'pointer'}}> 
                    Commander{" "}
                  </Button>
                </CardBody>
              </Card>
            ))}
    </div>
  )
}
