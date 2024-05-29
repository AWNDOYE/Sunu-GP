  // *****************************Fonction pour formater la date au format ISO 8601 ("yyyy-mm-dd")
  export const formatISODate = (dateString) => {
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