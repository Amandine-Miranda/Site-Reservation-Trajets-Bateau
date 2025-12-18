const id = document.getElementById("numResa").value;
const urlAPI = `https://can.iutrs.unistra.fr/api/reservation/${id}`;
const navigation = document.getElementById("navigation");
let index = 1;

async function chargerAPI() {
    try {
        const response = await fetch(urlAPI);
        carte = await response.json();
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }
    chargerPassager();
    afficherCarte();
}

function afficherCarte() {

    navigation.classList.remove("hidden");

    document.getElementById("gareDepart").textContent = carte.portDepart;
    document.getElementById("gareArrivee").textContent = carte.portArrivee;
    document.getElementById("date").textContent = carte.date;
    document.getElementById("heure").textContent = carte.heure;
    document.getElementById("bateau").textContent = carte.bateau;

    document.getElementById("reservation").textContent = carte.id;
    document.getElementById("famille").textContent = carte.nom;

}

function chargerCarte(){

    if(index <= carte.nbPassagers && index > 0){
        alert(index);
        chargerPassager();
    }

    else if(index > carte.nbPassagers && index <= (carte.nbPassagers + carte.nbVehicules)){
        alert(index);
        chargerVehicule();
    }

}

async function chargerPassager(){

    const urlPassager = `${urlAPI}/passager/${index}`

    try {
        const responsePassager = await fetch(urlPassager);
        cartePassager = await responsePassager.json();
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    document.getElementById("nom").textContent = cartePassager.nom;
    document.getElementById("prenom").textContent = cartePassager.prenom;
    document.getElementById("categorie").textContent = cartePassager.libelleCategorie;
    document.getElementById("prix").textContent = cartePassager.price + "€";

}

async function chargerVehicule(){

    const urlVehicule = `${urlAPI}/vehicule/${index - carte.nbPassagers}`;

    try {
        const responseVehicule = await fetch(urlVehicule);
        carteVehicule = await responseVehicule.json();
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    document.getElementById("nom").style.display = "hidden";
    document.getElementById("prenom").style.display = "hidden";
    document.getElementsByClassName("nombre").style.display = "block";

    document.getElementById("nb").textContent = carteVehicule.quantite;
    //document.getElementById("categorie").textContent =                                //CATÉGORIE 4 ??????????????????????????????????
    document.getElementById("prix").textContent = carteVehicule.prix + "€";

}

function changerPassagerEnPlus(){

    index = index + 1;
    chargerCarte();
}

function changerPassagerEnMoins(){

    if(index > 0){
        index = index - 1;
        chargerCarte();
    }
    else{
        alert("Plus de passagers avant ce point.");
    }

}



































































// Chargement du JSON


/*async function reservation(){
    const numResa = document.getElementById("numResa").value;
    const navigation = document.getElementById("navigation");

    if (cartes.length == 0) {
        await chargerJSON();
    }

    tabCartesBonnes = [];
    index = 0;

    cartes.forEach(carte => {
        if (carte.reservation === numResa) {
            tabCartesBonnes.push(carte);
        }
    });

    if (tabCartesBonnes.length > 0) {
        navigation.classList.remove("hidden");
        afficherCarte(0);
    } else {
        alert("Aucune réservation trouvée");
    }
}

// Navigation gauche / droite
function initNavigation() {
    console.log("initNavigation exécuté");

    const fg = document.getElementById("flechegauche");
    const fd = document.getElementById("flechedroite");

    fg.addEventListener("click", () => {
    if (index > 0) {
        index--;
        afficherCarte(index);
    }
    });

    fd.addEventListener("click", () => {
        if (index < tabCartesBonnes.length - 1) {
            index++;
            afficherCarte(index);
        }
    });
}

// Initialisation DOM
document.addEventListener("DOMContentLoaded", () => {
    chargerJSON();
    initNavigation();
});*/