import React, { useState, useEffect,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  Button,
} from "react-bootstrap";

import citiesWithAirports from "../../../Data/TownsList";
import regionsSenegal from "../../../Data/RegionalList";
import neighborhoodsDakar from "../../../Data/DepartementList";
import Config from "../../../Services/Config.json";
import axios from "axios";

export default function TrajetUpdate() {

  const navigate = useNavigate();
  const {trajetId } = useParams();
  const [trajet, setTrajet] = useState({
    trajet_ZoneType: "",
    trajet_PlaceDepartureName: "",
    trajet_PlaceArrivalName: "",
    trajet_DateDepart: "",
    trajet_DateArrivee: "",
    trajet_Commentaires: "",
    trajet_zonePrice: 0,
    trajet_FrequenceZone: "",
    trajet_Statut: 0,
    trajetAuteurs: 
      {
        userId: "",
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userNumberPhone: "",
      },
      trajet_ListUsersForTrajet: [
        {
          userId: "",
          userFirstName: "",
          userLastName: "",
          userEmail: "",
          userNumberPhone: "",
        },
    ]
  });

  const [selectedCountryArrival, setSelectedCountryArrival] = useState("");
  const [selectedCountryDeparture, setSelectedCountryDeparture] = useState("");
  const [selectedRegionArrival, setSelectedRegionArrival] = useState("");
  const [selectedRegionDeparture, setSelectedRegionDeparture] = useState("");
  const zonePriceRef = useRef(null);
  const dateDepartRef = useRef(null);
  const dateArrivalRef = useRef(null);



  // *****************************Fonction pour formater la date au format ISO 8601 ("yyyy-mm-dd")
  const formatISODate = (dateString) => {
    // Créez une nouvelle instance de Date à partir de la chaîne de date
    const date = new Date(dateString);
    // Vérifiez si la date est valide
    if (isNaN(date.getTime())) {
      // Si la date est invalide, retournez une chaîne vide
      return "";
    }
    // Utilisez la méthode toISOString() pour formater la date au format ISO 8601 ("yyyy-mm-dd")
    // et retournez la partie de la chaîne avant le caractère "T"
    return date.toISOString().split("T")[0];
  };
//*********************************************************************** */



//******************* ***************************/
  const handleCancel = () => {
    navigate(-1); // Revenir à la page précédente
  };
//************************************************************** */

//********SEARCH TRAJT BY ID************************************************* */
  const findTrajet = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/showTrajet/${trajetId}`
      );
      setTrajet(response.data.trajet); // Met à jour le state avec les données de la réponse
      console.log(response.data.trajet);
    } catch (error) {
      console.error("Erreur lors de la recherche du produit :", error);
    }
  };
  useEffect(() => {
    findTrajet(); // Appeler findTrajet une fois que le composant est monté
  }, []);
//********************************************************************************* */


//******************************************************************************* */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données du formulaire au backend ou effectuer d'autres actions
    console.log(trajet);
  };
//************************************************************************ */


//***************MAJ TRAJET****************************************************** */
  const handleUpdateTrajet = async () => {
    console.log("okkkkkkkkkkkkkkkkkkk");
    console.log(trajet);
    // Envoyer les données modifiées au serveur
    try {
       // Vérifie si la date de départ est inférieure à la date actuelle
       if (new Date(trajet.trajet_DateDepart) < new Date()) {
        alert(
          "La date de départ ne peut pas être inférieure à la date d'aujourd'hui."
        );
        dateDepartRef.current.focus();
        return; // Sort de la fonction si la vérification échoue
      }
      // Vérifie si la date de départ est supérieure à la date d'arrivée
      if (new Date(trajet.trajet_DateDepart) > new Date(trajet.trajet_DateArrivee)) {
        alert(
          "La date de départ ne peut pas être supérieure à la date d'arrivée."
        );
        dateArrivalRef.current.focus();
        return; // Sort de la fonction si la vérification échoue
      }
      // Vérifie si la date de départ est supérieure à la date d'arrivée
      if (trajet.trajet_zonePrice === 0 ) {
        alert(
          "Veuillez saisir le prix du correspondant au trajet défini."
        );
        zonePriceRef.current.focus();
        return; // Sort de la fonction si la vérification échoue
      }
      const response = await axios
      .put(`${Config.api_url}/updateTrajet/${trajetId}`, trajet)
      .then((response) => {
        console.log("Mise à jour réussie !", response.data.trajetUpdated);
        alert(`Le trajet ${trajet.trajet_PlaceDepartureName} - ${trajet.trajet_PlaceArrivalName} du ${formatISODate(trajet.trajet_DateArrivee)} a été modifié avec succès`);
        navigate(-1); // Revenir à la page précédente
        // Peut-être mettre à jour l'état local ou afficher un message de succès ici
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };
//************************************************************************************* */



// ********************************Appeler une fonction onDelete pour supprimer le trajet************************/
const handleDelete = async () => {
  try {
    const response = await axios.delete(
      `${Config.api_url}/deleteTrajet/${trajetId}`)
    .then((response) => {
      console.log("Trajet deleted !", response.data);
      alert("Le trajet a été supprimé avec succès!")
      navigate(-1); // Revenir à la page précédente
    })
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
  }
};
//************************************************************************************** */



  return (
    <div>
      {" "}
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="trajetAuteurs">
              <Form.Label>Informations de l'auteur</Form.Label>

              <Form.Label>Nom du GP</Form.Label>
              <Form.Control
                type="text"
                name="userFirstName"
                value={trajet.trajetAuteurs.userFirstName}
                onChange={() => {}}
              />
              <Form.Label>Prénom du GP</Form.Label>
              <Form.Control
                type="text"
                name="userLastName"
                value={trajet.trajetAuteurs.userLastName}
                onChange={() => {}}
              />
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                type="text"
                name="userEmail"
                value={trajet.trajetAuteurs.userEmail}
                onChange={() => {}}
              />
              <Form.Label>Numéro Téléphone</Form.Label>
              <Form.Control
                type="text"
                name="userNumberPhone"
                value={trajet.trajetAuteurs.userNumberPhone}
                onChange={() => {}}
              />

              {/* Ajoutez des champs supplémentaires pour userFirstName, userLastName, userNumberPhone ici */}
            </Form.Group>
            <Form.Group controlId="zone">
              <Form.Label>Type Zone :</Form.Label>
              <Form.Select value={trajet.trajet_ZoneType} onChange={() => {}}>
                <option value="" disabled>
                  Select zone
                </option>
                <option value="National">National</option>
                <option value="Régional">Régional</option>
                <option value="International">International</option>
              </Form.Select>
            </Form.Group>
            {/* *****************************************International - ville************************************ */}
            {trajet.trajet_ZoneType === "International" && (
              <>
                <Form.Group controlId="country">
                  <Form.Label>Pays de départ</Form.Label>
                  <Form.Select
                    value={trajet.trajet_PlaceDepartureName}
                    onChange={(e) => {
                      const selectedRegion = e.target.value;
                      // Vérifie si la même ville est sélectionnée pour le départ et l'arrivée
                      if (selectedRegion === selectedCountryArrival) {
                        alert(
                          "Le même pays ne peut pas être sélectionné pour le départ et l'arrivée."
                        );
                        // Réinitialise la valeur de l'arrivée
                        setSelectedCountryDeparture("");
                      } else {
                        setSelectedCountryDeparture(selectedRegion);
                        setTrajet({
                          ...trajet,
                          trajet_PlaceDepartureName: e.target.value,
                        });
                      }
                    }}
                    required
                  >
                    <option value="" disabled>
                      Sélectionner le pays
                    </option>
                    {citiesWithAirports.map((country) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>Pays de destination</Form.Label>
                  <Form.Select
                    value={trajet.trajet_PlaceArrivalName}
                    onChange={(e) => {
                      const selectedTown = e.target.value;
                      // Vérifie si la même ville est sélectionnée pour le départ et l'arrivée
                      if (selectedTown === selectedCountryDeparture) {
                        alert(
                          "Le même pays ne peut pas être sélectionné pour le départ et l'arrivée."
                        );
                        // Réinitialise la valeur de l'arrivée
                        setSelectedCountryArrival("");
                      } else {
                        setSelectedCountryArrival(selectedTown);
                        setTrajet({
                          ...trajet,
                          trajet_PlaceArrivalName: e.target.value,
                        });
                      }
                    }}
                    required
                  >
                    <option value="" disabled>
                      Sélectionner le pays
                    </option>
                    {citiesWithAirports.map((country) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}
            {/* *****************************************National - Regional************************************ */}
            {trajet.trajet_ZoneType === "Régional" && (
              <>
                <Form.Group controlId="region">
                  <Form.Label>Région de départ</Form.Label>
                  <Form.Select
                    value={trajet.trajet_PlaceDepartureName}
                    onChange={(e) => {
                      const selectedRegion = e.target.value;
                      // Vérifie si la même région est sélectionnée pour le départ et l'arrivée
                      if (selectedRegion === selectedRegionArrival) {
                        alert(
                          "La même région ne peut pas être sélectionnée pour le départ et l'arrivée."
                        );
                        // Réinitialise la valeur de l'arrivée
                        setSelectedRegionDeparture("");
                      } else {
                        setSelectedRegionDeparture(selectedRegion);
                        setTrajet({
                          ...trajet,
                          trajet_PlaceDepartureName: e.target.value,
                        });
                      }
                    }}
                    required
                  >
                    <option value="" disabled>
                      Sélectionner la région
                    </option>
                    {regionsSenegal.map((region) => (
                      <option key={region.value} value={region.label}>
                        {region.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="region">
                  <Form.Label>Région de destination</Form.Label>
                  <Form.Select
                    value={trajet.trajet_PlaceArrivalName}
                    onChange={(e) => {
                      const selectedRegion = e.target.value;
                      // Vérifie si la même région est sélectionnée pour le départ et l'arrivée
                      if (selectedRegion === selectedRegionDeparture) {
                        alert(
                          "La même région ne peut pas être sélectionnée pour le départ et l'arrivée."
                        );
                        // Réinitialise la valeur de l'arrivée
                        setSelectedRegionArrival("");
                      } else {
                        setSelectedRegionArrival(selectedRegion);
                        setTrajet({
                          ...trajet,
                          trajet_PlaceArrivalName: e.target.value,
                        });
                      }
                    }}
                    required
                  >
                    <option value="" disabled>
                      Sélectionner la région
                    </option>
                    {regionsSenegal.map((region) => (
                      <option key={region.value} value={region.label}>
                        {region.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}
            {/* *****************************************National - Département************************************ */}
            {trajet.trajet_ZoneType === "National" && (
              <>
                <Form.Group controlId="departement">
                  <Form.Label>Ville de Départ:</Form.Label>
                  <Form.Select
                    value={trajet.trajet_PlaceDepartureName}
                    onChange={(e) => {
                      setTrajet({
                        ...trajet,
                        trajet_PlaceDepartureName: e.target.value,
                      });
                    }}
                    required
                  >
                    <option value="" disabled>
                      Sélectionner la ville
                    </option>
                    {neighborhoodsDakar.map((town) => (
                      <option key={town.value} value={town.label}>
                        {town.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="departement">
                  <Form.Label>Ville de destination</Form.Label>
                  <Form.Select
                    value={trajet.trajet_PlaceArrivalName}
                    onChange={(e) => {
                      setTrajet({
                        ...trajet,
                        trajet_PlaceArrivalName: e.target.value,
                      });
                    }}
                    required
                  >
                    <option value="" disabled>
                      Sélectionner la ville
                    </option>
                    {neighborhoodsDakar.map((town) => (
                      <option key={town.value} value={town.label}>
                        {town.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}
            <Form.Group controlId="trajet_DateDepart">
              <Form.Label>Date de départ</Form.Label>
              <Form.Control
                type="date"
                name="trajet_DateDepart"
                value={formatISODate(trajet.trajet_DateDepart)}
                onChange={(e) => {
                  setTrajet({
                    ...trajet,
                    trajet_DateDepart: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group controlId="trajet_DateArrivee">
              <Form.Label>Date d'arrivée</Form.Label>
              <Form.Control
                type="date"
                name="trajet_DateArrivee"
                value={formatISODate(trajet.trajet_DateArrivee)}
                onChange={(e) => {
                  setTrajet({
                    ...trajet,
                    trajet_DateArrivee: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group controlId="trajet_zonePrice">
              <Form.Label>Prix de la zone</Form.Label>
              <Form.Control
                type="number"
                name="trajet_zonePrice"
                value={trajet.trajet_zonePrice}
                onChange={(e) => {
                  setTrajet({
                    ...trajet,
                    trajet_zonePrice: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group controlId="trajet_FrequenceZone">
              <Form.Label>Fréquence de la zone</Form.Label>
              <Form.Select
                name="trajet_FrequenceZone"
                value={trajet.trajet_FrequenceZone}
                onChange={(e) => {
                  setTrajet({
                    ...trajet,
                    trajet_FrequenceZone: e.target.value,
                  });
                }}
              >
                <option value="" disabled>
                  Sélectionner la fréquence
                </option>
                <option value="Quotidien">Quotidienne / Tous les jours</option>
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="1 Fois Par Semaine">1 fois par semaine</option>
                <option value="Deux Fois Par Semaine">2 fois par semaine</option>
                <option value="Tous les 15 jours">Tous les 15 jours</option>
                <option value="Mensuelle">Mensuelle</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="trajet_Commentaires">
              <Form.Label>Commentaires</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="trajet_Commentaires"
                value={trajet.trajet_Commentaires}
                onChange={(e) => {
                  setTrajet({
                    ...trajet,
                    trajet_Commentaires: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Button type="onSubmit" onClick={handleUpdateTrajet}>
              Modifier
            </Button>
            <Button onClick={handleDelete}>Supprimer</Button>
            <Button variant="primary" onClick={handleCancel}>
              Annuler{" "}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
