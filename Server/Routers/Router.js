const express = require("express")
const router = express.Router()
const auth = require("../Controllers/Auth")
const zone = require('../Controllers/ZoneController')
const pays = require('../Controllers/PaysController')
const town = require('../Controllers/VilleController')
const colis = require('../Controllers/ColisController')
const trajet = require('../Controllers/TrajetController')
const order = require('../Controllers/OrderController')
const upload = require('./../Middlewares/multerMiddleware'); // Importer le middleware Multer


console.log("Route ok");

//Définition des routes pour l'inscription et l'authentification
router.post('/signUP', auth.signUP)
router.post('/signIn', auth.signIn)
router.get('/getUserFind/:id', auth.readUserByID)
router.get('/getAllUsers', auth.readAllUsers)
router.put('/getUserUpdated/:id', auth.updateUser)
//****************************************/

//Définition des routes pour le modéle Trajet
router.post('/createTrajet', trajet.createTypeTrajet)
router.get('/allTrajet', trajet.readAllTrajet)
router.get('/showTrajet/:id', trajet.readTrajetByID)
router.put('/updateTrajet/:id', trajet.updateTrajet)
router.get('/updateAllTrajet', trajet.updateStatutAllTrajet)
router.delete('/deleteTrajet/:id', trajet.deleteTrajet)
//****************************************/


//Définition des routes pour le modéle Colis
router.post('/createColis',upload.single('colisImage'), colis.createTypeColis)
router.get('/allColis', colis.readAllColis)
router.get('/showColis/:id', colis.readColisByID)
router.get('/checkProductExistence/:colisTypeName', colis.checkProductExistence);
router.put('/updateColis/:id',upload.single('colisImage'), colis.updateColis)
router.delete('/deleteColis/:id', colis.deleteColis)
//****************************************/

//Définition des routes pour le modéle Trajet
router.post('/createTrajet', trajet.createTypeTrajet)
router.get('/allTrajet', trajet.readAllTrajet)
router.get('/showTrajet/:id', trajet.readTrajetByID)
router.put('/updateTrajet/:id', trajet.updateTrajet)
router.delete('/deleteTrajet/:id', trajet.deleteTrajet)
//****************************************/

//Définition des routes pour le modéle Order
router.post('/createOrder', order.createTypeOrder)
router.get('/allOrder', order.readAllOrder)
router.get('/showOrder/:id', order.readOrderByID)
router.put('/updateOrder/:id', order.updateOrder)
router.delete('/deleteOrder/:id', order.deleteOrder)
router.get('/listOrderByUser/:id', order.listOrderOfUser)

module.exports=router;



//Définition des routes pour le modéle Zone
// router.post('/createZone', zone.createZone)
// router.get('/allZone', zone.readAllZone)
// router.get('/showZone/:id', zone.readZoneByID)
// router.put('/updateZone/:id', zone.updateZone)
// router.delete('/deleteZone/:id', zone.deleteZone)
// //****************************************/

// //Définition des routes pour le modéle Pays
// router.post('/createPays', pays.createPays)
// router.get('/allPays', pays.readAllPays)
// router.get('/showPays/:id', pays.readPaysByID)
// router.get('/showPaysByZone', pays.getPaysByZoneName)
// router.put('/updatePays/:id', pays.updatePays)
// router.delete('/deletePays/:id', pays.deletePays)
// //****************************************/

// //Définition des routes pour le modéle Ville
// router.post('/createTown', town.createTown)
// router.get('/allTowns', town.readAllTown)
// router.get('/showTown/:id', town.readTownByID)
// router.get('/showTownByCountry', town.getTownByCountryName)
// router.put('/updateTown/:id', town.updateTown)
// router.delete('/deleteTown/:id', town.deleteTown)
//****************************************/