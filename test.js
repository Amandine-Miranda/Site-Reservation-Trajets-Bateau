let cartes = [];       
let index = 0;
let tabCartesBonnes = [];

// Chargement du JSON
async function chargerJSON() {
    try {
        const response = await fetch("test.json");
        cartes = await response.json();
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }
}

async function reservation(){
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
        afficherCarte(index);
    } else {
        alert("Aucune réservation trouvée");
    }
}

function afficherCarte(i) {
    const c = tabCartesBonnes[i];

    document.getElementById("gareDepart").textContent = c.gareDepart;
    document.getElementById("gareArrivee").textContent = c.gareArrivee;
    document.getElementById("date").textContent = c.date;
    document.getElementById("heure").textContent = c.heure;
    document.getElementById("bateau").textContent = c.bateau;

    document.getElementById("reservation").textContent = c.reservation;
    document.getElementById("famille").textContent = c.famille;

    document.getElementById("nom").textContent = c.nom;
    document.getElementById("prenom").textContent = c.prenom;
    document.getElementById("categorie").textContent = c.categorie;
    document.getElementById("prix").textContent = c.prix;

    console.log("Carte affichée :", i, tabCartesBonnes[i]);

    document.getElementById("compteur").textContent = `Carte ${index + 1} / ${tabCartesBonnes.length}`;

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
        console.log("CLICK DROITE");
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
});