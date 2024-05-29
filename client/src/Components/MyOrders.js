import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Config from "../Services/Config.json";
import {  Button } from "react-bootstrap";
export default function MyOrder() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userActif, setUserActif] = useState(false);

  const { userId, orderId} = useParams();
 const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${Config.api_url}/listOrderByUser/${userId}`
        );
        console.log(response.data.ordersByUser)
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
      const response = await axios.get(`${Config.api_url}/getUserFind/${userId}`);
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
      setUserActif(true)
    }
    if (!userActif) {
      alert("Veuillez vous connecter pour modifier votre commande");
     navigate("/signIn") 
    } else {
      // navigate("/home/${userId}/neworder");
      navigate(`/home/${userId}/${orderId}`);
    }
    
  };


  return (
    <div>Mes commandes
    <h2>Mes Commandes</h2>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              <p>Numéro de commande: {order.order_Numero}</p>
              <p>Colis: {order.order_Colis.order_ColisName}</p>
              <p>Status: {order.order_ColisStatus}</p>
              <p>Coût: {order.order_CoutColis}<sup> F cfa</sup></p>
              {order && order.order_ColisStatus ==="Colis En Attente"  ? (
                <>
                <Button onClick={()=> {handleChangeOrder (order._id)}}>Modifier</Button>
                
                </>
              ) : (
                <span>Commande non modifiable</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
