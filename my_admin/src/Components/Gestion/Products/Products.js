import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../Assets/Styles/listProducts.css"
import Config from "../../../Services/Config.json";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../../Assets/Styles/allTable.css"
import { faPenToSquare,faSquarePlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Products() {
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





  return <div className="product-list-container">
  <h1 className="product-list-title"><strong>LISTE DES TYPES DE COLIS</strong></h1>
  <Link to={`/home/admin/${userId}/products/newProduct`} className="new-product-link"><FontAwesomeIcon icon={faSquarePlus}/>  Nouveau Produit</Link>
  <table className="product-table">
    <thead>
      <tr className="table-row">
        <th>Type</th>
        <th>Description</th>
        <th>Prix / KG</th>
        <th>Prix / L</th>
      </tr>
    </thead>
    <tbody>
      {listOfProduct.map((product, index) => (
        <tr key={index}>
          <td>{product.colisTypeName}</td>
          <td>{product.colisDescription}</td>
          <td>{product.colisPriceByKG}</td>
          <td>{product.colisPriceByLitre}</td>
          <td>
            <Link to={`/home/admin/${userId}/products/${product._id}`} className="product-link"><FontAwesomeIcon icon={faPenToSquare}/></Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
}
