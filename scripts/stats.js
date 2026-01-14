async function chargerAPI() {                                                                       // fonction principale qu'on appelle lorsqu'on appuie sur le bouton "appuyer" elle permet tout d'abord de charger les infos de l'API, asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)
    const liaison = document.getElementById("liaison").value;                                       // on initialise une constante liaison qui stocke le numéro de liaison récupéré depuis le html (entré par l'utilisateur)

    const urlAPI = `https://can.iutrs.unistra.fr//api/liaison/${liaison}/chiffreAffaire`;           // on initialise une constante urlAPI qui stocke l'URL de l'API avec le bon numéro de liaison avec le suffixe chiffreAffaire car c'est à ce lien que les infos qui nous intéressent se trouvent

    try {
        const response = await fetch(urlAPI);
        stats = await response.json();                                                              // on stocke les infos récupérées sur l'API dans la variable stats
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    afficherStats();                                                                                
}

async function afficherStats(){                                                                     // permet d'afficher les statistiques sur le site

    document.getElementById("infosStats").classList.remove("hidden");                               // on affiche la div qui contient toutes les informations en lui enlevant sa classe HTML "hidden" => "caché"

    document.getElementById("liaisonUtil").textContent = stats.nom;                                 // on affiche le nom de la liaison via les infos récupérées par l'API

    document.getElementById("nbPassagers").textContent = stats.passagers.nombre;                    // on affiche le nombre de passagers total sur cette liaison en novembre 2025 via les infos récupérées par l'API

    document.getElementById("chiffrePassagers").textContent = Number.parseFloat(stats.passagers.chiffreAffaire).toFixed(2) + "€";   // on affiche le chiffre d'affaires concernant les passagers sur cette liaison en novembre 2025 via les infos récupérées par l'API

    document.getElementById("nbVehicules").textContent = stats.vehicules.quantite;                  // on affiche le nombre de véhicules total sur cette liaison en novembre 2025 via les infos récupérées par l'API

    document.getElementById("chiffreVehicules").textContent = Number.parseFloat(stats.vehicules.chiffreAffaire).toFixed(2) + "€";   // on affiche le chiffre d'affaires concernant les véhicules sur cette liaison en novembre 2025 via les infos récupérées par l'API

    let CAtotal = stats.passagers.chiffreAffaire + stats.vehicules.chiffreAffaire;                  // on initialise une variable qui stocke le résultat du calcul permettant d'avoir le chiffre d'affaire total, c'est à dire le chiffre d'affaire des passagers plus le chiffre d'affaire des véhicules

    document.getElementById("chiffreGlobal").textContent = Number.parseFloat(CAtotal).toFixed(2) + "€";     // on affiche le chiffre d'affaire global précédemment

}