// validerSaisie.js
export const validerSaisie = (order, isLiquidProduct) => {
  if (!order.order_Destinataires.nameDest) {
    alert(
      "Veuillez saisir les informations concernant la/le destinataire du colis."
    );
    return false;
  }
  if (!order.order_Destinataires.telephoneDest) {
    alert("Veuillez saisir le numéro de téléphone du destinataire du colis.");
    return false;
  }
  if (!order.order_Destinataires.adresseDest) {
    alert("Veuillez saisir l'adresse du destinataire du colis.");
    return false;
  }
 
  if (order.order_CoutColis === 0) {
    if (!isLiquidProduct && order.order_PoidsColis <= 0) {
      alert("Le nombre de poids doit être supérieur à 0.");
      return false;
    }

    if (isLiquidProduct && order.order_NombreDeLitreColis <= 0) {
      alert("Le nombre de litres doit être supérieur à 0.");
      return false;
    }
  }

  return true;
};
