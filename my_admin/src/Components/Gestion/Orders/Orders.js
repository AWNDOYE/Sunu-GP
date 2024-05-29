import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../Assets/Styles/listProducts.css"
import Config from "../../../Services/Config.json";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Orders() {

    const [listOfOrders, setListOfOrders] = useState([]);
    const [error, setError] = useState("");
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);


    //****************Récupération des données depuis l'API via UseEffect  */ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Config.api_url}/allOrder`);
        setListOfOrders(response.data.allOrder); // Met à jour le state avec les données de la réponse
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
    <div><h1><strong>SUIVI COMMANDES</strong></h1>
     
       <table className="product-table">
          <thead  >
            <tr className="table-row">
            <th>N° Order</th>
              <th>Expéditeur</th>
              <th>Téléphone</th>
              <th>Type Colis</th>
              <th>Coût</th>
              <th>Infos Destinataire</th>
              <th>Statut Colis</th>
              <th>Statut Paiement</th>
            </tr>
          </thead>
          <tbody>
            {listOfOrders.map((order, index) => (
              <tr key={index}>
                <td> {order.order_Numero }</td>
                <td> {`${order.order_Utilisateurs.user_FirstName} ${order.order_Utilisateurs.user_LastName}`}  </td>
                <td>{order.order_Utilisateurs.user_NumberPhone}</td>
                <td> {order.order_Colis.order_ColisName }</td>
                <td>{order.order_CoutColis}</td>
                <td>{order.order_Destinataires.nameDest}</td>
                <td>{order.order_ColisStatus}</td>
                <td>{order.order_TypePayement}</td>
                <td>
                <Link to={`/home/admin/${userId}/orders/${order._id}`}><strong>Voir Commande</strong></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
  )
}
