const infosStats = document.getElementById("infosStats");

async function chargerAPI() {
    const liaison = document.getElementById("liaison").value;

    const urlAPI = `https://can.iutrs.unistra.fr//api/liaison/${liaison}/chiffreAffaire`;

    try {
        const response = await fetch(urlAPI);
        stats = await response.json();
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    afficherStats();
}

async function afficherStats(){

    infosStats.classList.remove("hidden");

    document.getElementById("liaisonUtil").textContent = stats.nom;

    document.getElementById("nbPassagers").textContent = stats.passagers.nombre;

    document.getElementById("chiffrePassagers").textContent = Number.parseFloat(stats.passagers.chiffreAffaire).toFixed(2) + "€";

    document.getElementById("nbVehicules").textContent = stats.vehicules.quantite;

    document.getElementById("chiffreVehicules").textContent = Number.parseFloat(stats.vehicules.chiffreAffaire).toFixed(2) + "€";

    let CAtotal = stats.passagers.chiffreAffaire + stats.vehicules.chiffreAffaire;

    document.getElementById("chiffreGlobal").textContent = Number.parseFloat(CAtotal).toFixed(2) + "€";

}