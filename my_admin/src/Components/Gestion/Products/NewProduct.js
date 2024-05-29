import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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



export default function NewProduct() {

//************************************************* */
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        colisTypeName: "",
        colisDescription: "",
        colisPriceByKG: 0,
        colisPriceByLitre: 0,
        colisImage : "",
      });
//*********************************************************** */




    //*********************VERIFIER L'EXISTENCE DU NOM DE COLIS********************* */
      const checkProductExistence = async (colisTypeName) => {
        try {
          const response = await axios.get(`${Config.api_url}/checkProductExistence/${colisTypeName}`);
          return response.data.exists;
        } catch (error) {
          console.error("Erreur lors de la vérification de l'existence du produit :", error);
          return false;
        }
      };
//********************************************************************************* */



    //*****************************************AJOUT D'UN NOUVEAU COLIS*************** */
      const handleAdd = async () =>{
        try {
              // Vérifier si le colisTypeName existe déjà dans la base de données
              const exists = await checkProductExistence(newProduct.colisTypeName);
              if (exists) {
                alert("Ce type de produit existe déjà dans la base de données.");
                return; // Arrêter l'exécution de la fonction si le produit existe déjà
              }
              // Vérifier la concordance entre les produits liquides et le prix par L
              if (newProduct.colisTypeName === "Produits Liquides" && newProduct.colisPriceByLitre === 0) {
                alert("Le prix par litre doit être spécifié pour les produits liquides");
                return
              } 
               // Vérifier la concordance entre les produits liquides et le prix par L
               if (newProduct.colisTypeName !== "Produits Liquides" && newProduct.colisPriceByKG === 0) {
                alert("Le prix par Kg doit être spécifié pour tous les produits exceptés les liquides");
                return
              } 
              //Vérifier si image vide
              if (!newProduct.colisImage) {
                alert("Veuillez sélectionner au moins une image. ")
                  return
              }            
          const formData = new FormData();
          formData.append("colisTypeName", newProduct.colisTypeName);
          formData.append("colisDescription", newProduct.colisDescription);
          formData.append("colisPriceByKG", newProduct.colisPriceByKG);
          formData.append("colisPriceByLitre", newProduct.colisPriceByLitre);
          formData.append("colisImage", newProduct.colisImage);
          console.log(formData)
          console.log(newProduct.colisImage)
          console.log(newProduct)
            const response = await axios.post(
              `${Config.api_url}/createColis`,formData)
            .then((response) => {
              alert('Le produit a été ajouté avec succès dans la base de données.')
              console.log("Mise à jour réussie !", response.data.colisCreated);
              navigate(-1); 
            })
           
          } catch (error) {
            console.error("Erreur lors de l'ajout du nouveau produit :", error);
          }
      }
    //************************************************************************************************** */


    
///************************************************** */
      const handleCancel = () =>{
        navigate(-1); // Revenir à la page précédente
      }
///************************************************** */




  return (
    <>
      <p>NOUVEAU PRODUIT</p>
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <FormLabel>Type</FormLabel>
              <FormControl
                as="select"
                name="colisTypeName"
                value={newProduct.colisTypeName}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    colisTypeName: e.target.value,
                  })
                }
                required
              >
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
                
                {/* Ajoutez d'autres options ici */}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                name="colisDescription"
                value={newProduct.colisDescription}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    colisDescription: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Prix / KG</FormLabel>
              <FormControl
                type="number"
                name="colisPriceByKG"
                value={newProduct.colisPriceByKG}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    colisPriceByKG: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Prix / L</FormLabel>
              <FormControl
                type="number"
                name="colisPriceByLitre"
                value={newProduct.colisPriceByLitre}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    colisPriceByLitre: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Image</FormLabel>
              <FormControl
                type="file"
                name="colisImage"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    colisImage: e.target.files[0],
                  })
                }
                required
              />
            </FormGroup>
            <Button variant="primary" onClick={handleAdd}>
              Ajouter
            </Button>
            <Button variant="primary" onClick={handleCancel}>
              Annuler{" "}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
