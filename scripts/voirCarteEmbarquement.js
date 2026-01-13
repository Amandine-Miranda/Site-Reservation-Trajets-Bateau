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
        chargerPassager();
    }

    else if(index > carte.nbPassagers && index <= (carte.nbPassagers + carte.nbVehicules)){
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

    document.getElementById("catCarte").textContent = "Passager";
    
    let specPassager = document.getElementsByClassName("specPassager");

    for(let i = 0; i < specPassager.length; i++){
        specPassager[i].style.display = "block";
    }

    let tabNombre = document.getElementsByClassName("nombre");

    for(let i = 0; i < tabNombre.length; i++){
        tabNombre[i].style.display = "none";
    }

    document.getElementById("nom").textContent = cartePassager.nom;
    document.getElementById("prenom").textContent = cartePassager.prenom;
    document.getElementById("categorie").textContent = cartePassager.libelleCategorie;
    document.getElementById("prix").textContent = cartePassager.price + "€";

}

async function chargerVehicule(){

    document.getElementById("catCarte").textContent = "Véhicule";

    const urlVehicule = `${urlAPI}/vehicule/${index - carte.nbPassagers}`;
 
    try {
        const responseVehicule = await fetch(urlVehicule);
        carteVehicule = await responseVehicule.json();
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    let specPassager = document.getElementsByClassName("specPassager");

    for(let i = 0; i < specPassager.length; i++){
        specPassager[i].style.display = "none";
    }

    document.getElementById("nb").textContent = carteVehicule.quantite;
    document.getElementById("prix").textContent = carteVehicule.prix + "€";

    if(carteVehicule.code == "trot"){
        document.getElementById("categorie").textContent = "Trotinette";
    }
    else{
        document.getElementById("categorie").textContent = "Catégorie " + (carteVehicule.code).substr(3,3);
    }

    let tabNombre = document.getElementsByClassName("nombre");

    for(let i = 0; i < tabNombre.length; i++){
        tabNombre[i].style.display = "block";
    }


}

function changerPassagerEnPlus(){

    if(index < (carte.nbPassagers + carte.nbVehicules)){
        index = index + 1;
        chargerCarte();
    }
    else{
        alert("Plus rien après ce point.");
    }
}

function changerPassagerEnMoins(){

    if(index > 0){
        index = index - 1;
        chargerCarte();
    }
    else{
        alert("Plus rien avant ce point.");
    }

}