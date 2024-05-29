import React, { useState, useEffect, useRef } from "react";
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

export default function AddNewTrajet() {
  //****Utilisation de UseState pour le stockage et la modification du produit */

  const [selectedUser, setSelectedUser] = useState({
    userId: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userNumberPhone: "",
  });

  const [trajet, setTrajet] = useState({
    trajet_ZoneType: "",
    trajet_PlaceDepartureName: "",
    trajet_PlaceArrivalName: "",
    trajet_DateDepart: "",
    trajet_DateArrivee: "",
    trajet_Commentaires: "",
    trajet_zonePrice: 0,
    trajet_FrequenceZone: "",
    trajet_Statut: 1,
    trajetAuteurs: 
      {
        userId: "",
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userNumberPhone: "",
      },
  });
  const navigate = useNavigate();
  const { userId } = useParams();
  const zonePriceRef = useRef(null);
  const dateDepartRef = useRef(null);
  const dateArrivalRef = useRef(null);

  console.log(selectedUser);
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedCountryArrival, setSelectedCountryArrival] = useState("");
  const [selectedCountryDeparture, setSelectedCountryDeparture] = useState("");
  const [selectedRegionArrival, setSelectedRegionArrival] = useState("");
  const [selectedRegionDeparture, setSelectedRegionDeparture] = useState("");
  const [selectedTownArrival, setSelectedTownArrival] = useState("");
  const [selectedTownDeparture, setSelectedTownDeparture] = useState("");

  console.log(trajet.trajet_ZoneType);
  console.log(trajet);

  //**************Recherche des infos de l'utilisateur qui s'est connecté via son ID récupéré depuis les params */
  const findUser = async () => {
    try {
      const response = await axios.get(
        `${Config.api_url}/getUserFind/${userId}`
      );
      setSelectedUser(response.data.userFind); // Met à jour le state avec les données de la réponse
    } catch (error) {
      console.error("Erreur lors de la recherche de l'utilisateur :", error);
    }
  };
  /********************************************************************* */



//************************RECUPEARION DES DONNEES VIA L'API************************************* */
  useEffect(() => {
    findUser(); // Appeler findUser une fois que le composant est monté
  }, []);
  useEffect(() => {
    setTrajet((prevTrajet) => ({
      ...prevTrajet,
      trajetAuteurs: {
        userId: selectedUser._id,
        userFirstName: selectedUser.userFirstName,
        userLastName: selectedUser.userLastName,
        userEmail: selectedUser.userEmail,
        userNumberPhone: selectedUser.userNumberPhone,
      },
    }));
  }, [selectedUser]);
//********************************************************************** */

  console.log(selectedUser._id);

  //******************GESTION DE CHANGEMENT DES ZONES************************ */
  const handleZoneChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedZone(selectedValue);
    setSelectedCountryArrival(""); // Réinitialiser la sélection du pays
    setSelectedCountryDeparture(""); // Réinitialiser la sélection de la région
    setSelectedRegionArrival(""); // Réinitialiser la sélection de la ville
    setSelectedRegionDeparture(""); // Réinitialiser la sélection du pays
    setSelectedTownArrival(""); // Réinitialiser la sélection de la région
    setSelectedTownDeparture(""); // Réinitialiser la sélection de la ville
  };
//********************************************************************************* */



  //**********************FONCTION APPELLER LORS DE LA SOUMMISSION DU FORMULAIRE************ */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données du formulaire au backend ou effectuer d'autres actions
    console.log(trajet);
  };
//******************************************************************************* */


//********************AJOUT NOUVEAU TRAJET */
  const handleAddTrajet = async () => {
    console.log("trajet");
    console.log(trajet);
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
          "Veuillez saisir le prix de la zone correspondant au trajet défini."
        );
        zonePriceRef.current.focus();
        return; // Sort de la fonction si la vérification échoue
      }
      console.log(trajet);
      const response = await axios
        .post(`${Config.api_url}/createTrajet`, trajet)
        .then((response) => {
          console.log(
            "Nouveau trajet ajouté avec succès !",
            response.data.trajetCreated
          );
          alert( "Nouveau trajet ajouté avec succès !")
          navigate(-1);
        });
    } catch (error) {
      console.error("Erreur lors de l'ajout du nouveau trajet :", error);
    }
  };
//******************************************************************************* */


//***************************************** */
  const handleCancel = () => {
    navigate(-1); // Revenir à la page précédente
  };
//************************************************** */


  return (
    <div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="trajetAuteurs">
              <Form.Label>Informations de l'auteur</Form.Label>

              <Form.Label>Nom du GP</Form.Label>
              <Form.Control
                type="text"
                name="userFirstName"
                value={selectedUser.userFirstName}
                onChange={() => {}}
              />
              <Form.Label>Prénom du GP</Form.Label>
              <Form.Control
                type="text"
                name="userLastName"
                value={selectedUser.userLastName}
                onChange={() => {}}
              />
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                type="email"
                name="userEmail"
                value={selectedUser.userEmail}
                onChange={() => {}}
              />
              <Form.Label>Numéro Téléphone</Form.Label>
              <Form.Control
                type="text"
                name="userNumberPhone"
                value={selectedUser.userNumberPhone}
                onChange={() => {}}
              />

              {/* Ajoutez des champs supplémentaires pour userFirstName, userLastName, userNumberPhone ici */}
            </Form.Group>
            <Form.Group controlId="zone">
              <Form.Label>Type Zone :</Form.Label>
              <Form.Select
                value={selectedZone}
                onChange={(e) => {
                  setTrajet({ ...trajet, trajet_ZoneType: e.target.value });
                  handleZoneChange(e); // Si nécessaire, appelez votre fonction handleZoneChange ici
                }}
                required
              >
                <option value="" disabled>
                  Select zone
                </option>
                <option value="National">National</option>
                <option value="Régional">Régional</option>
                <option value="International">International</option>
              </Form.Select>
            </Form.Group>
            {/* *****************************************International - ville************************************ */}
            {selectedZone === "International" && (
              //***Liste et choix de la ville de départ */
              <>
                <Form.Group controlId="country">
                  <Form.Label>Select country Departure:</Form.Label>
                  <Form.Select
                    value={trajet.trajet_PlaceDepartureName}
                    onChange={(e) => {
                      const selectedRegion = e.target.value;
                      // Vérifie si la même ville est sélectionnée pour le départ et l'arrivée
                      if (selectedRegion === selectedCountryArrival) {
                        alert(
                          "La même ville ne peut pas être sélectionnée pour le départ et l'arrivée."
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
                      Select country
                    </option>
                    {citiesWithAirports.map((country) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>Select country Arrival:</Form.Label>
                  <Form.Select
                    value={trajet.trajet_PlaceArrivalName}
                    onChange={(e) => {
                      const selectedTown = e.target.value;
                      // Vérifie si la même ville est sélectionnée pour le départ et l'arrivée
                      if (selectedTown === selectedCountryDeparture) {
                        alert(
                          "La même ville ne peut pas être sélectionnée pour le départ et l'arrivée."
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
                      Select country
                    </option>
                    {citiesWithAirports.map((town) => (
                      <option key={town.value} value={town.label}>
                        {town.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}
            {/* *****************************************National - Regional************************************ */}
            {selectedZone === "Régional" && (
              //***Liste et choix de la ville de départ */
              <>
                <Form.Group controlId="region">
                  <Form.Label>Select regional Departure:</Form.Label>
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
                  <Form.Label>Select regional Arrival:</Form.Label>
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
            {selectedZone === "National" && (
              //***Liste et choix des département */
              <>
                <Form.Group controlId="departement">
                  <Form.Label>Select Départment Departure:</Form.Label>
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
                  <Form.Label>Select regional Arrival:</Form.Label>
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
                value={trajet.trajet_DateDepart}
                onChange={(e) => {
                  setTrajet({
                    ...trajet,
                    trajet_DateDepart: e.target.value,
                  });
                }}
                ref={dateDepartRef}
                required
              />
            </Form.Group>

            <Form.Group controlId="trajet_DateArrivee">
              <Form.Label>Date d'arrivée</Form.Label>
              <Form.Control
                type="date"
                name="trajet_DateArrivee"
                value={trajet.trajet_DateArrivee}
                onChange={(e) => {
                  setTrajet({
                    ...trajet,
                    trajet_DateArrivee: e.target.value,
                  });
                }}
                ref={dateArrivalRef}
                required
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
                
                ref={zonePriceRef}
                required
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
                required
              >
                <option value="" disabled>
                  Sélectionner la fréquence
                </option>
                <option value="Quotidien">Quotidienne / Tous les jours</option>
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="1 Fois Par Semaine">1 fois par semaine</option>
                <option value="Deux Fois Par Semaine">
                  2 fois par semaine
                </option>
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
            <Button type="onSubmit" onClick={handleAddTrajet}>
              Ajouter
            </Button>
            <Button variant="primary" onClick={handleCancel}>
              Annuler{" "}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
