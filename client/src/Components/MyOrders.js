import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate,Link } from "react-router-dom";
import Config from "../Services/Config.json";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "react-bootstrap";
import "../Assets/Styles/listeOrder.css";
import { Bounce, Fade, Slide, Zoom } from "react-awesome-reveal";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userActif, setUserActif] = useState(false);

  const { userId, orderId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${Config.api_url}/listOrderByUser/${userId}`
        );
        console.log(response.data.ordersByUser);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const findUser = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/getUserFind/${userId}`
      );
      setUserActif(response.data.userFind); // Met à jour le state avec les données de la réponse
      console.log(response.data.userFind);
    } catch (error) {
      console.error("Erreur lors de la recherche de l'utilisateur :", error);
    }
  };

  useEffect(() => {
    if (userId) {
      findUser(); // Appeler findUser une fois que le composant est monté
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChangeOrder = (orderId) => {
    if (orderId !== "") {
      setUserActif(true);
    }
    if (!userActif) {
      alert("Veuillez vous connecter pour modifier votre commande");
      navigate("/signIn");
    } else {
      // navigate("/home/${userId}/neworder");
      navigate(`/home/${userId}/${orderId}`);
    }
  };

  return (
    <div className="cardCard">
      <h1 style={{ textAlign: "center" }}>LISTE COMMANDE</h1>
      {orders.length === 0 ? (
        <Fade>
          <div className="noOrder">
            <Bounce duration={3000}><h1  className="noOrderDetails" >
              Aucune commande trouvée.
            </h1>
            <Link className="noOrderDetails noOrderLink" to={`/home/${userId}/trajetList`} ><strong>Commander un trajet</strong></Link>
            </Bounce>
          </div>
        </Fade>
      ) : (
        <div className="cardOrders">
          {orders.map((order) => (
            <Card className="cardOrder" key={order._id}>
              <CardTitle className="cardTittle">
                Commande N° : {order.order_Numero}
              </CardTitle>
              <CardBody>
                <CardText>
                  <strong>Type Colis commandé :</strong>{" "}
                  {order.order_Colis.order_ColisName}
                </CardText>
                <CardText>
                  <strong>Status :</strong> {order.order_ColisStatus}
                </CardText>
                <CardText>
                  <strong>Coût :</strong> {order.order_CoutColis}
                  <sup> F cfa</sup>
                </CardText>
                {order && order.order_ColisStatus === "Colis En Attente" ? (
                  <>
                    <Button
                      className="newBoutonOrder"
                      onClick={() => {
                        handleChangeOrder(order._id);
                      }}
                    >
                      Modifier
                    </Button>
                  </>
                ) : (
                  <CardText className=" newBoutonOrder newBoutonOrderNotChange">
                    Commande non modifiable
                  </CardText>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
