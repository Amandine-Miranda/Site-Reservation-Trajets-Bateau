let cartes = [];       
let index = 0;

// Chargement du JSON
async function chargerJSON() {
    try {
        const response = await fetch("test.json");
        cartes = await response.json();
        afficherCarte(0);
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }
}

// Mise à jour de la carte
function afficherCarte(i) {
    const c = cartes[i];

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
}

// Navigation gauche / droite
function initNavigation() {
    const fg = document.getElementById("flechegauche");
    const fd = document.getElementById("flechedroite");

    fg.addEventListener("click", () => {
        index = (index - 1 + cartes.length) % cartes.length;
        afficherCarte(index);
    });

    fd.addEventListener("click", () => {
        index = (index + 1) % cartes.length;
        afficherCarte(index);
    });
}

// Initialisation DOM
document.addEventListener("DOMContentLoaded", () => {
    chargerJSON();
    initNavigation();
});