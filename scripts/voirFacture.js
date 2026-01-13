let facture;
const id = document.getElementById("numResa").value;
const urlAPI = `https://can.iutrs.unistra.fr/api/reservation/${id}`;
let passager = 1;
let vehicule = 1;
const urlPassager = `https://can.iutrs.unistra.fr/api/reservation/${id}/passager/${passager}`;
const urlVehicule = `https://can.iutrs.unistra.fr/api/reservation/${id}/vehicule/${vehicule}`;
const infosFacture = document.getElementById("infosResaFacture");

const TARIF_ADULTE_GROIX = 18.75;
const TARIF_JEUNE_GROIX = 13.80;
const TARIF_ENFANT_GROIX = 11.25;

const TARIF_ANCOMP = 3.35;

const TARIF_ADULTE_BELLEILE = 18.80;
const TARIF_JEUNE_BELLEILE = 14.10;
const TARIF_ENFANT_BELLEILE = 11.65;

let prixTotalAdultes;
let prixTotalJeunes;
let prixTotalEnfants;
let prixTotalAnimaux;

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

async function chargerVehicule(vehicule) {
    const urlVehicule = `https://can.iutrs.unistra.fr/api/reservation/${facture.id}/vehicule/${vehicule}`;
    const response = await fetch(urlVehicule);
    return await response.json();
}

async function afficherFacture() {

    infosFacture.classList.remove("hidden");

    var laDate = new Date();
    document.getElementById("LieuDate").textContent = "Illkirch le " + laDate.getDate() + "/" + (laDate.getMonth() + 1) + "/" + laDate.getFullYear();

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
        else if(infosPassager.libelleCategorie.inclues("Animal")){
            nbAnimaux++;
        }
    }
    
    document.getElementById("nbAdultes").textContent = nbAdultes;

    if(nbJeunes > 0){
        document.getElementById("ligneJeunes").classList.remove("hidden");
        document.getElementById("nbJeunes").textContent = nbJeunes;
    }

    if(nbEnfants > 0){
        document.getElementById("ligneEnfants").classList.remove("hidden");
        document.getElementById("nbEnfants").textContent = nbEnfants;
    }
    
    if(nbBebes > 0){
        document.getElementById("ligneBebes").classList.remove("hidden");
        document.getElementById("nbBebes").textContent = nbBebes;
    }

    if(nbAnimaux > 0){
        document.getElementById("ligneAnimaux").classList.remove("hidden");
        document.getElementById("nbAnimaux").textContent = nbAnimaux;
    }


    if(facture.portDepart.includes("Groix") || facture.portArrivee.includes("Groix") || facture.portDepart.includes("Tudy") || facture.portArrivee.includes("Tudy")){
        document.getElementById("prixUnitAdultes").textContent = TARIF_ADULTE_GROIX;
        document.getElementById("prixUnitJeunes").textContent = TARIF_JEUNE_GROIX;
        document.getElementById("prixUnitEnfants").textContent = TARIF_ENFANT_GROIX;
        prixTotalAdultes = TARIF_ADULTE_GROIX * nbAdultes;
        prixTotalJeunes = TARIF_JEUNE_GROIX * nbJeunes;
        prixTotalEnfants = TARIF_ENFANT_GROIX * nbEnfants;
    }

    else if(facture.portDepart.includes("Belle") || facture.portArrivee.includes("Belle") || facture.portDepart.includes("Palais") || facture.portArrivee.includes("Palais")){
        document.getElementById("prixUnitAdultes").textContent = TARIF_ADULTE_BELLEILE;
        document.getElementById("prixUnitJeunes").textContent = TARIF_JEUNE_BELLEILE;
        document.getElementById("prixUnitEnfants").textContent = TARIF_ENFANT_BELLEILE;
        prixTotalAdultes = TARIF_ADULTE_BELLEILE * nbAdultes;
        prixTotalJeunes = TARIF_JEUNE_BELLEILE * nbJeunes;
        prixTotalEnfants = TARIF_ENFANT_BELLEILE * nbEnfants;
    }

    let prixTotalAnimaux = TARIF_ANCOMP * nbAnimaux;

    document.getElementById("prixAdultes").textContent = prixTotalAdultes;
    document.getElementById("prixJeunes").textContent = prixTotalJeunes;
    document.getElementById("prixEnfants").textContent = prixTotalEnfants;
    document.getElementById("prixAnimaux").textContent = prixTotalAnimaux;

    let prixTotalPersonnes = prixTotalAdultes + prixTotalJeunes + prixTotalEnfants + prixTotalAnimaux;
    
    document.getElementById("prixTotalPersonnes").textContent =  Number.parseFloat(prixTotalPersonnes).toFixed(2) + "€";

    if(facture.nbVehicules > 0){
        let nbTrots = 0;
        let nbVelos = 0;
        let nbVelosElec = 0;
        let nbGrosVelos = 0;
        let nbMobil = 0;
        let nbMotos = 0;
        let nbAutosCat1 = 0;
        let nbAutosCat2 = 0;
        let nbAutosCat3 = 0;
        let nbAutosCat4 = 0;
        let nbCampCars = 0;

        for(let i = 1; i <= facture.nbVehicules; i++){
            const infosVehicule = await chargerVehicule(i);

            if(infosVehicule.code.includes("trot")){
                nbTrots++;
            }
            else if(infosVehicule.code.includes("velo")){
                nbVelos++;
            }
            else if(infosVehicule.code.includes("velelec")){
                nbVelosElec++;
            }
            else if(infosVehicule.code.includes("cartand")){
                nbGrosVelos++;
            }
            else if(infosVehicule.code.includes("mobil")){
                nbMobil++;
            }
            else if(infosVehicule.code.includes("moto")){
                nbMotos++;
            }
            else if(infosVehicule.code.includes("cat1")){
                nbAutosCat1++;
            }
            else if(infosVehicule.code.includes("cat2")){
                nbAutosCat2++;
            }
            else if(infosVehicule.code.includes("cat3")){
                nbAutosCat3++;
            }
            else if(infosVehicule.code.includes("cat4")){
                nbAutosCat4++;
            }
            else if(infosVehicule.code.includes("camp")){
                nbCampCars++;
            }
        }

        if(nbTrots > 0){
            document.getElementById("ligneTrot").classList.remove("hidden");
        }

        if(nbVelos > 0){
            document.getElementById("ligneVelo").classList.remove("hidden");
        }
        
        if(nbVelosElec > 0){
            document.getElementById("ligneVeloElec").classList.remove("hidden");
        }

        if(nbGrosVelos > 0){
            document.getElementById("ligneGrosVelo").classList.remove("hidden");
        }

        if(nbMobil > 0){
            document.getElementById("ligneMobil").classList.remove("hidden");
        }

        if(nbMotos > 0){
            document.getElementById("ligneMoto").classList.remove("hidden");
        }

        if(nbAutosCat1 > 0){
            document.getElementById("ligneAutoCat1").classList.remove("hidden");
        }

        if(nbAutosCat2 > 0){
            document.getElementById("ligneAutoCat2").classList.remove("hidden");
        }

        if(nbAutosCat3 > 0){
            document.getElementById("ligneAutoCat3").classList.remove("hidden");
        }

        if(nbAutosCat4 > 0){
            document.getElementById("ligneAutoCat4").classList.remove("hidden");
        }

        if(nbCampCars > 0){
            document.getElementById("ligneCampCar").classList.remove("hidden");
        }

        document.getElementById("nbTrot").textContent = nbTrots;
        document.getElementById("nbVelo").textContent = nbVelos;
        document.getElementById("nbVeloElec").textContent = nbVelosElec;
        document.getElementById("nbGrosVelo").textContent = nbGrosVelos;
        document.getElementById("nbMobil").textContent = nbMobil;
        document.getElementById("nbMoto").textContent = nbMotos;
        document.getElementById("nbAutoCat1").textContent = nbAutosCat1;
        document.getElementById("nbAutoCat2").textContent = nbAutosCat2;
        document.getElementById("nbAutoCat3").textContent = nbAutosCat3;
        document.getElementById("nbAutoCat4").textContent = nbAutosCat4;
        document.getElementById("nbCampCar").textContent = nbCampCars;

        let prixTotalMobils;
        let prixTotalMotos;
        let prixTotalAutoCat1;
        let prixTotalAutoCat2;
        let prixTotalAutoCat3;
        let prixTotalAutoCat4;
        let prixTotalCampCars;

        if(facture.portDepart.includes("Groix") || facture.portArrivee.includes("Groix") || facture.portDepart.includes("Tudy") || facture.portArrivee.includes("Tudy")){
            document.getElementById("prixUnitMobil").textContent = 23.10;
            document.getElementById("prixUnitMoto").textContent = 66.05;
            document.getElementById("prixUnitAutoCat1").textContent = 96.05;
            document.getElementById("prixUnitAutoCat2").textContent = 114.80;
            document.getElementById("prixUnitAutoCat3").textContent = 174.45;
            document.getElementById("prixUnitAutoCat4").textContent = 210.90;
            document.getElementById("prixUnitCampCar").textContent = 330.20;
            prixTotalMobils = 23.10 * nbMobil;
            prixTotalMotos = 66.05 * nbMotos;
            prixTotalAutoCat1 = 96.05 * nbAutosCat1;
            prixTotalAutoCat2 = 114.80 * nbAutosCat2;
            prixTotalAutoCat3 = 174.45 * nbAutosCat3;
            prixTotalAutoCat4 = 210.90 * nbAutosCat4;
            prixTotalCampCars = 330.20 * nbCampCars;
        }

        else if(facture.portDepart.includes("Belle") || facture.portArrivee.includes("Belle") || facture.portDepart.includes("Palais") || facture.portArrivee.includes("Palais")){
            document.getElementById("prixUnitMobil").textContent = 23.35;
            document.getElementById("prixUnitMoto").textContent = 66.40;
            document.getElementById("prixUnitAutoCat1").textContent = 98.50;
            document.getElementById("prixUnitAutoCat2").textContent = 117.20;
            document.getElementById("prixUnitAutoCat3").textContent = 176.90;
            document.getElementById("prixUnitAutoCat4").textContent = 213.35;
            document.getElementById("prixUnitCampCar").textContent = 332.70;
            prixTotalMobils = 23.35 * nbMobil;
            prixTotalMotos = 66.40 * nbMotos;
            prixTotalAutoCat1 = 98.50 * nbAutosCat1;
            prixTotalAutoCat2 = 117.20 * nbAutosCat2;
            prixTotalAutoCat3 = 176.90 * nbAutosCat3;
            prixTotalAutoCat4 = 213.35 * nbAutosCat4;
            prixTotalCampCars = 332.70 * nbCampCars;
        }

        document.getElementById("prixUnitTrot").textContent = 4.70;
        document.getElementById("prixUnitVelo").textContent = 8.20;
        document.getElementById("prixUnitVeloElec").textContent = 11.00;
        document.getElementById("prixUnitGrosVelo").textContent = 16.45;
        let prixTotalTrots = 4.70 * nbTrots;
        let prixTotalVelos = 8.20 * nbVelos;
        let prixTotalVelosElec = 11.00 * nbVelosElec;
        let prixTotalGrosVelos = 16.45 * nbGrosVelos;

        document.getElementById("prixTotalTrot").textContent = prixTotalTrots;
        document.getElementById("prixTotalVelo").textContent = prixTotalVelos;
        document.getElementById("prixTotalVeloElec").textContent = prixTotalVelosElec;
        document.getElementById("prixTotalGrosVelo").textContent = prixTotalGrosVelos;
        document.getElementById("prixTotalMobil").textContent = prixTotalMobils;
        document.getElementById("prixTotalMoto").textContent = prixTotalMotos;
        document.getElementById("prixTotalAutoCat1").textContent = prixTotalAutoCat1;
        document.getElementById("prixTotalAutoCat2").textContent = prixTotalAutoCat2;
        document.getElementById("prixTotalAutoCat3").textContent = prixTotalAutoCat3;
        document.getElementById("prixTotalAutoCat4").textContent = prixTotalAutoCat4;
        document.getElementById("prixTotalCampCar").textContent = prixTotalCampCars;

        let prixTotalVehicules = prixTotalTrots + prixTotalVelos + prixTotalVelosElec + prixTotalGrosVelos + prixTotalMobils + prixTotalMotos + prixTotalAutoCat1 + prixTotalAutoCat2 + prixTotalAutoCat3 + prixTotalAutoCat4 + prixTotalCampCars;
        
        document.getElementById("prixTotalVehicules").textContent =  Number.parseFloat(prixTotalVehicules).toFixed(2) + "€";

        let prixTotal = 0;
        prixTotal = prixTotalPersonnes + prixTotalVehicules;

        document.getElementById("prixTotal").textContent = "Prix total : " + prixTotal + "€";
    }
}