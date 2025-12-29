const id = document.getElementById("numResa").value;
const urlAPI = `https://can.iutrs.unistra.fr/api/reservation/${id}`;
let passager = 1;
const urlPassager = `https://can.iutrs.unistra.fr/api/reservation/${id}/passager/${passager}`;
const infosFacture = document.getElementById("infosResaFacture");

const TARIF_ADULTE = 18.75;
const TARIF_JEUNE = 13.80;
const TARIF_ENFANT = 11.25;

async function chargerAPI() {
    try {
        const response = await fetch(urlAPI);
        facture = await response.json();
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    afficherFacture();
}

async function chargerPassager(passager) {
    const urlPassager = `https://can.iutrs.unistra.fr/api/reservation/${facture.id}/passager/${passager}`;
    const response = await fetch(urlPassager);
    return await response.json();
}

async function afficherFacture() {

    infosFacture.classList.remove("hidden");

    document.getElementById("numFacture").textContent = facture.id;
    document.getElementById("nomFacture").textContent = facture.nom;
    document.getElementById("traverseeFacture").textContent = facture.portDepart + " - " + facture.portArrivee;
    
    const tabDate = facture.date.split("-");

    document.getElementById("dateTraversee").textContent = tabDate[2] + "/" + tabDate[1] + "/" + tabDate[0];
    document.getElementById("heureTraversee").textContent = facture.heure;
    document.getElementById("bateauTraversee").textContent = facture.bateau.toUpperCase();

    let nbAdultes = 0;
    let nbJeunes = 0;
    let nbEnfants = 0;
    let nbBebes = 0;
    let nbAnimaux = 0;

    for(let i = 1; i <= facture.nbPassagers; i++){
        const infosPassager = await chargerPassager(i);

        if(infosPassager.libelleCategorie.includes("Adulte")){
            nbAdultes++;
        }
        else if(infosPassager.libelleCategorie.includes("Jeune")){
            nbJeunes++;
        }
        else if(infosPassager.libelleCategorie.includes("Enfant")){
            nbEnfants++;
        }
        else if(infosPassager.libelleCategorie.includes("Bébé")){
            nbBebes++;
        }
    }

    document.getElementById("nbAdultes").textContent = nbAdultes;
    document.getElementById("nbJeunes").textContent = nbJeunes;
    document.getElementById("nbEnfants").textContent = nbEnfants;
    document.getElementById("nbBebes").textContent = nbBebes;

    let prixTotalAdultes = TARIF_ADULTE * nbAdultes;
    let prixTotalJeunes = TARIF_JEUNE * nbJeunes;
    let prixTotalEnfants = TARIF_ENFANT * nbEnfants;

    document.getElementById("prixAdultes").textContent = prixTotalAdultes;
    document.getElementById("prixJeunes").textContent = prixTotalJeunes;
    document.getElementById("prixEnfants").textContent = prixTotalEnfants;

    let prixTotalPersonnes = prixTotalAdultes + prixTotalJeunes + prixTotalEnfants;
    
    document.getElementById("prixTotalPersonnes").textContent =  prixTotalPersonnes + "€";

    

    /*let nbAdultes = 0;
    let nbJeunes = 0;
    let nbEnfants = 0;
    let nbBebes = 0;

    for(let i = 1; i <= facture.nbPassagers; i++){
        const infosPassager = await chargerPassager(i);

        if(infosPassager.libelleCategorie.includes("Adulte")){
            nbAdultes++;
        }
        else if(infosPassager.libelleCategorie.includes("Jeune")){
            nbJeunes++;
        }
        else if(infosPassager.libelleCategorie.includes("Enfant")){
            nbEnfants++;
        }
        else if(infosPassager.libelleCategorie.includes("Bébé")){
            nbBebes++;
        }
    }

    document.getElementById("nbAdultes").textContent = nbAdultes;
    document.getElementById("nbJeunes").textContent = nbJeunes;
    document.getElementById("nbEnfants").textContent = nbEnfants;
    document.getElementById("nbBebes").textContent = nbBebes;

    let prixTotalAdultes = TARIF_ADULTE * nbAdultes;
    let prixTotalJeunes = TARIF_JEUNE * nbJeunes;
    let prixTotalEnfants = TARIF_ENFANT * nbEnfants;

    document.getElementById("prixAdultes").textContent = prixTotalAdultes;
    document.getElementById("prixJeunes").textContent = prixTotalJeunes;
    document.getElementById("prixEnfants").textContent = prixTotalEnfants;

    let prixTotalPersonnes = prixTotalAdultes + prixTotalJeunes + prixTotalEnfants;
    
    document.getElementById("prixTotalPersonnes").textContent =  prixTotalPersonnes + "€";*/
}