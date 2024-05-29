import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Config from "../../../Services/Config.json";
import axios from "axios";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";


const ProductCard = () => {


  const {productId } = useParams();
  const navigate = useNavigate();

  console.log({ productId });
  //****Utilisation de UseState pour le stockage et la modification du produit */
  const [product, setProduct] = useState({
    colisTypeName: "",
    colisDescription: "",
    colisPriceByKG: 0,
    colisPriceByLitre: 0,
    colisImage : "",
  });
  const [selectTypeColis, setSelectTypeColis] = useState('')


  //*****************RECHERCHER UN PRODUIT AVEC SON ID*********************
  const findProduct = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/showColis/${productId}`
      );
      setProduct(response.data.colis); // Met à jour le state avec les données de la réponse
      console.log(response.data.colis);
    } catch (error) {
      console.error("Erreur lors de la recherche du produit :", error);
    }
  };
//*************************************************************************** */
 useEffect(() => {
    findProduct(); // Appeler findProduct une fois que le composant est monté
  }, []);


 
//*********POUR LA MISE A JOUR DES CHAMPS */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  console.log({ product });
  console.log(product.colisImage)
//************************************************ */






  //*********************MODIFICATION DANS LE SERVEUR *******************************/
  const handleUpdate = async () => {
    // Envoyer les données modifiées au serveur
    try {
    const formData = new FormData(); // Créer un objet FormData pour envoyer les données

    // Ajouter les champs à mettre à jour dans l'objet FormData
    formData.append("colisTypeName", product.colisTypeName);
    formData.append("colisDescription", product.colisDescription);
    formData.append("colisPriceByKG", product.colisPriceByKG);
    formData.append("colisPriceByLitre", product.colisPriceByLitre);

    // Vérifier si une nouvelle image a été sélectionnée
    if (product.colisImage instanceof File) {
      formData.append("colisImage", product.colisImage); // Ajouter la nouvelle image
    }
    // Vérifier la concordance entre les produits liquides et le prix par L
    if (product.colisTypeName === "Produits Liquides" && product.colisPriceByLitre === 0) {
      alert("Le prix par litre doit être spécifié pour les produits liquides");
      return
    } 
     // Vérifier la concordance entre les produits liquides et le prix par L
     if (product.colisTypeName !== "Produits Liquides" && product.colisPriceByKG === 0) {
      alert("Le prix par Kg doit être spécifié pour tous les produits exceptés les liquides");
      return
    } 
    //Vérifier si image vide
    if (!product.colisImage) {
      alert("Veuillez sélectionner au moins une image. ")
        return
    } 

    const response = await axios.put(
      `${Config.api_url}/updateColis/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Spécifier le type de contenu pour les fichiers
        },
      }
    );
    console.log("Mise à jour réussie !", response.data);
        alert(`Le produit ${product.colisTypeName} a été modifié avec succès!`)
        navigate(-1); // Revenir à la page précédente
 
  }catch(error) {
        console.error("Erreur lors de la mise à jour :", error);
        // Gérer les erreurs ici
      };
  };
//************************************************************************************** */



  //***********************************************Appeler une fonction onDelete pour supprimer le produit*****************************
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${Config.api_url}/deleteColis/${productId}`)
      .then((response) => {
        console.log("Product deleted !", response.data);
        alert("Le produit a été supprimé avec succès")
        navigate(-1); // Revenir à la page précédente
        // Peut-être mettre à jour l'état local ou afficher un message de succès ici
      })
     
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };
//*********************************************************************************************** */

//******************* ********************************/
  const handleCancel = () =>{
    navigate(-1); // Revenir à la page précédente
  }
//**************************************** */



  return (
    <>
      <p>Modification Produit</p>
      <Card>
        <CardBody>
          <Form>
          <img src={`http://localhost:5000/uploads/${product.colisImage}`} alt="Colis" />
          <FormGroup>
              <FormLabel>Type</FormLabel>
              <Form.Select value={product.colisTypeName} onChange={(e) => {
                setSelectTypeColis(e.target.value);
                setProduct({
                          ...product,
                          colisTypeName: e.target.value,
                        });
                }
              } required>
                <option value="">Sélectionner un type</option>
                <option value="Boîte - de 5 Kg">Boîte - de 5 Kg</option>
                <option value="Boîte + de 5 Kg">Boîte + de 5 Kg</option>
                <option value="Carton - de 5 Kg">Carton - de 5 Kg</option>
                <option value="Carton + de 5 Kg">Carton + de 5 Kg</option>
                <option value="Produits Liquides">Produits Liquides</option>
                <option value="Valise 23kg Max">Valise 23kg Max</option>
                <option value="Courrier - Enveloppe - A3">Courrier - Enveloppe - A3</option>
                <option value="Courrier - Enveloppe - A4">Courrier - Enveloppe - A4</option>
                <option value="Courrier - Enveloppe - A5">Courrier - Enveloppe - A5</option>
                <option value="Emballage - Sachet - Sac">Emballage - Sachet - Sac</option>
              </Form.Select>
            </FormGroup>
            <FormGroup>
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                name="colisDescription"
                value={product.colisDescription}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Prix / KG</FormLabel>
              <FormControl
                type="number"
                name="colisPriceByKG"
                value={product.colisPriceByKG}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Prix / L</FormLabel>
              <FormControl
                type="number"
                name="colisPriceByLitre"
                value={product.colisPriceByLitre}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
            <FormLabel>Image</FormLabel>
            <FormControl
              type="file"
              name="colisImage"
              
              onChange={(e) => setProduct({ ...product, colisImage: e.target.files[0] })}
              required
            /></FormGroup>
            <Button variant="primary" onClick={handleUpdate}>
              Modifier
            </Button>
            <Button onClick={handleDelete}>Supprimer</Button>
            <Button variant="primary" onClick={handleCancel}>Annuler </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};
export default ProductCard;
