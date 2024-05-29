export const calculateCost = (order, trajet, selectedProduct, isLiquidProduct, setOrder) => {
    const zonePrice = trajet.trajet_zonePrice;
    // Vérification des champs avant le calcul
    if (isLiquidProduct && !order.order_NombreDeLitreColis) {
      alert("Veuillez entrer le nombre de litres.");
      return;
    }

    if (isLiquidProduct && !order.order_NombreDeLitreColis) {
        alert("Veuillez entrer le nombre de litres.");
        return;
      }
    if (!isLiquidProduct && !order.order_PoidsColis) {
      alert("Veuillez entrer le poids du colis.");
      return;
    }
    if (!isLiquidProduct && order.order_PoidsColis > 23) {
        alert("Le nombre de poids ne peut excéder 23KG.");
        return false;
      }
      if (isLiquidProduct && order.order_NombreDeLitreColis > 10) {
        alert("Le nombre de litres ne peut excéder 10L.");
        return false;
      }
    const order_CoutColis = isLiquidProduct
      ? parseInt(zonePrice) +
        selectedProduct.colisPriceByLitre * order.order_NombreDeLitreColis
      : parseInt(zonePrice) +
        selectedProduct.colisPriceByKG * order.order_PoidsColis;

    setOrder((prevOrder) => ({
      ...prevOrder,
      order_CoutColis,
    }));
  };
