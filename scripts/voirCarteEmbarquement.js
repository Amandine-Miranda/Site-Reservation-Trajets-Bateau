const id = document.getElementById("numResa").value;                                                // initialise une constante id qui stocke le numéro de réservation récupéré par l'API
const urlAPI = `https://can.iutrs.unistra.fr/api/reservation/${id}`;                                // initialise une constante urlAPI qui stocke l'URL menant à l'API avec le bon numéro d'id pour récupérer toutes les informations
let index = 1;                                                                                      // initialise une variable index qui commence à 1 (car les passagers sont renseignés à partir de 1 dans l'API)

async function chargerAPI() {                                                                       // fonction principale qu'on appelle lorsqu'on appuie sur le bouton "appuyer" elle permet tout d'abord de charger les infos de l'API, asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)
    try {
        const response = await fetch(urlAPI);
        carte = await response.json();
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }
    chargerPassager();                                                                              // on charge le premier passager (passager index 1) après avoir récupéré les infos de l'API
    afficherCarte();                                                                                // on affiche la première carte d'embarquement avec les informations générales à tous les passagers / véhicules
}

function afficherCarte() {                                                                          // permet d'afficher la carte d'embarquement avec les informations générales à tous les passagers / véhicules

    document.getElementById("navigation").classList.remove("hidden");                               // affiche la div qui contient toutes les infos en enlevant sa classe HTML "hidden" => "caché"

    document.getElementById("portDepart").textContent = carte.portDepart;                           // affiche le port de départ de la réservation à partir des infos récupérées par l'API
    document.getElementById("portArrivee").textContent = carte.portArrivee;                         // affiche le port d'arrivée de la réservation à partir des infos récupérées par l'API
    document.getElementById("date").textContent = carte.date;                                       // affiche la date de départ de la réservation à partir des infos récupérées par l'API
    document.getElementById("heure").textContent = carte.heure;                                     // affiche l'heure de départ de la réservation à partir des infos récupérées par l'API
    document.getElementById("bateau").textContent = carte.bateau;                                   // affiche le bateau duquel part la réservation à partir des infos récupérées par l'API

    document.getElementById("reservation").textContent = carte.id;                                  // affiche l'identifiant de réservation à partir des infos récupérées par l'API
    document.getElementById("famille").textContent = carte.nom;                                     // affiche le nom de la famille de la réservation à partir des infos récupérées par l'API

}

function chargerCarte(){                                                                            // fonction qu'on appelle pour changer de carte selon si on veut charger une carte d'embarquement de passager ou de véhicule

    if(index <= carte.nbPassagers && index > 0){                                                    // si l'index est en dessous ou égal au nombre de passagers mais au dessus de 0, on veut charger une carte de passager
        chargerPassager();
    }

    else if(index > carte.nbPassagers && index <= (carte.nbPassagers + carte.nbVehicules)){         // sinon si il est au dessus du nombre de passagers mais en dessous du nombre de passagers plus le nombre de véhicules c'est qu'on veut charger une carte d'embarquement de véhicule
        chargerVehicule();
    }

}

async function chargerPassager(){                                                                   // fonction qu'on appelle pour charger les infos spécifiques au passager sur la carte d'embarquement

    const urlPassager = `${urlAPI}/passager/${index}`                                               // constante qui stocke l'URL où aller chercher les informations du passager à partir de l'API

    try {                                                                                           // permet tout d'abord de charger les infos de l'API, asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)                                          
        const responsePassager = await fetch(urlPassager);
        cartePassager = await responsePassager.json();                                              // on stocke les informations récupérées de l'API dans cartePassager
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    document.getElementById("catCarte").textContent = "Passager";                                   // on affiche la catégorie de carte d'embarquement ici "Passager"
    
    let specPassager = document.getElementsByClassName("specPassager");                             // on initialise une variable specPassager qui va récupérer tous les éléments ayant pour classe "specPassager" dans le HTML et les stocker dans un tableau

    for(let i = 0; i < specPassager.length; i++){                                                   // on parcourt tout le tableau specPassager
        specPassager[i].style.display = "block";                                                    // et on affiche ses éléments, qui sont des éléments de carte d'embarquement spécifiques au passager dans le HTML
    }

    let tabNombre = document.getElementsByClassName("nombre");                                      // on initialise une variable tabNombre qui va récupérer tous les éléments ayant pour classe "nombre" dans le HTML et les stocker dans un tableau

    for(let i = 0; i < tabNombre.length; i++){                                                      // on parcourt tout le tableau tabNombre
        tabNombre[i].style.display = "none";                                                        // et on cache ses éléments, qui sont des éléments de carte d'embarquement spécifiques au véhicule dans le HTML, et qu'on ne veut donc pas voir
    }

    document.getElementById("nom").textContent = cartePassager.nom;                                 // on affiche le nom de famille du passager à partir de l'API
    document.getElementById("prenom").textContent = cartePassager.prenom;                           // on affiche le prénom du passager à partir de l'API
    document.getElementById("categorie").textContent = cartePassager.libelleCategorie;              // on affiche la catégorie du passager à partir de l'API
    document.getElementById("prix").textContent = cartePassager.price + "€";                        // on affiche le tarif du passager à partir de l'API

}

async function chargerVehicule(){                                                                   // fonction qu'on appelle pour charger les infos spécifiques au véhicule sur la carte d'embarquement

    document.getElementById("catCarte").textContent = "Véhicule";                                   // on affiche la catégorie de carte d'embarquement ici "Véhicule"

    const urlVehicule = `${urlAPI}/vehicule/${index - carte.nbPassagers}`;                          // constante qui stocke l'URL où aller chercher les informations du passager à partir de l'API
 
    try {                                                                                           // permet tout d'abord de charger les infos de l'API, asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)                                          
        const responseVehicule = await fetch(urlVehicule);
        carteVehicule = await responseVehicule.json();                                              // on stocke les informations récupérées de l'API dans carteVéhicule
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    let specPassager = document.getElementsByClassName("specPassager");                             // déjà expliqué plus haut

    for(let i = 0; i < specPassager.length; i++){
        specPassager[i].style.display = "none";
    }

    document.getElementById("nb").textContent = carteVehicule.quantite;                             // on affiche le nombre de véhicules à partir des infos de l'API

    let prixTotalVehicule = carteVehicule.prix * carteVehicule.quantite;                            // on calcule le tarif de tous les véhicules en multipliant le prix unitaire d'un véhicule par le nombre de véhicules  
    document.getElementById("prix").textContent = Number.parseFloat(prixTotalVehicule).toFixed(2) + "€";   // on affiche le tarif du total de véhicules à partir des infos de l'API

    document.getElementById("categorie").textContent = carteVehicule.code;                          // on affiche la catégorie à partir des infos de l'API

    let tabNombre = document.getElementsByClassName("nombre");                                      // déjà expliqué plus haut

    for(let i = 0; i < tabNombre.length; i++){                                  
        tabNombre[i].style.display = "block";                                                       // ce coup-ci on affiche les informations spécifiques au véhicule car on veut les voir
    }


}

function changerPassagerEnPlus(){                                                                   // permet de charger la carte d'embarquement suivante (que ce soit passager ou véhicule)

    if(index < (carte.nbPassagers + carte.nbVehicules)){                                            // tant qu'on est en dessous du nombre de passagers plus le nombre de véhicules on peut continuer à augmenter
        index = index + 1;
        chargerCarte();
    }
    else{
        alert("Plus rien après ce point.");                                                         // sinon on informe l'utilisateur qu'il n'y a plus de carte d'embarquement à voir après
    }
}

function changerPassagerEnMoins(){                                                                  // permet de charger la carte d'embarquement suivante (que ce soit passager ou véhicule)

    if(index > 0){                                                                                  // tant qu'on est au dessus de 0 c'est qu'il y a encore des cartes d'embarquement avant
        index = index - 1;                                                                          
        chargerCarte();
    }
    else{
        alert("Plus rien avant ce point.");                                                         // sinon on informe l'utilisateur qu'il n'y a pas de carte d'embarquement à voir avant (logique)
    }

}