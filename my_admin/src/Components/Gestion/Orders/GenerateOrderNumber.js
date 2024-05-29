import {nanoid} from 'nanoid' //Biblio pour la génération des identifiants aléatoires
export const generateOrderNumber = ()=>{
    //Generer un horodatage
    const timeStamp = Date.now().toString();
    //Générer un id aléatoire de 4 chiffres
    const randomId = nanoid(4);
    //Combiner les deux et limiter à 10chiffres
    const orderNumber = (timeStamp+randomId).slice(0,10);
    return orderNumber;
}