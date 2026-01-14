async function chargerAPI() {                                                                       // fonction principale qu'on appelle lorsqu'on appuie sur le bouton "appuyer" elle permet tout d'abord de charger les infos de l'API, asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)
    let liaisonUtil = document.getElementById("liaison").value;                                     // on initialise une variable liaisonUtil qui stocke le numéro de liaison récupéré depuis le html (entré par l'utilisateur)
    let dateUtil = document.getElementById("date").value;                                           // on initialise une variable dateUtil qui stocke la date depuis le html (entré par l'utilisateur)

    let urlLiaisonDate = `https://can.iutrs.unistra.fr/api/liaison/${liaisonUtil}/remplissage/${dateUtil}`;     // on initialise une variable qui stocke l'URL de l'API avec le bon numéro de liaison avec le suffixe chiffreAffaire car c'est à ce lien que les infos qui nous intéressent se trouvent

    try {
        const response = await fetch(urlLiaisonDate);
        infos = await response.json();                                                              // on stocke les informations récupérées sur l'API dans la variable infos
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    chargerInfosLiaison();                                                                          // on charge les infos de la liaison à la date donnée
}

async function chargerInfosLiaison(){                                                               // permet de charger les infos du tableau de bord avec une liaison et une date donnée
    liaisonUtil = document.getElementById("liaison").value;                                         // 
    dateUtil = document.getElementById("date").value;

    let tbody = document.getElementById("tableBody");

    document.getElementById("infosTableauBord").classList.remove("hidden");
    
    if(liaisonUtil == 1){
        document.getElementById("liaisonUtil").textContent = "Lorient → Groix";
    }
    else if(liaisonUtil == 2){
        document.getElementById("liaisonUtil").textContent = "Groix → Lorient";
    }
    else if(liaisonUtil == 3){
        document.getElementById("liaisonUtil").textContent = "Quiberon → Le Palais";
    }
    else if(liaisonUtil == 4){
        document.getElementById("liaisonUtil").textContent = "Le Palais → Quiberon";
    }

    document.getElementById("dateUtil").textContent = dateUtil;

    tbody.innerHTML = "";

    for(let i = 0; i < infos.length; i++){
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        let remplissagePassagers = Number.parseFloat((infos[i].nbReservationPassagers / infos[i].capacitePassagers) * 100).toFixed(2);
        let remplissageVoitures = Number.parseFloat((infos[i].nbReservationVoitures / infos[i].capaciteVoitures) * 100).toFixed(2);
        var td1content = document.createTextNode(infos[i].heure);
        var td2content = document.createTextNode(remplissagePassagers + "%");
        var td3content = document.createTextNode(remplissageVoitures + "%");
        const img = document.createElement("img");
        if(remplissageVoitures >= 0 && remplissageVoitures <= 50){
            img.src = "img/pastilleVerte.png";
        }
        else if(remplissageVoitures > 50 && remplissageVoitures < 75){
            img.src = "img/pastilleOrange.png";
        }
        else if(remplissageVoitures >= 75 && remplissageVoitures < 100){
            img.src = "img/pastilleRouge.png";
        }
        else if(remplissageVoitures == 100){
            img.src = "img/pastilleJaune.png";
        }
        td1.appendChild(td1content);
        td2.appendChild(td2content);
        td3.appendChild(td3content);
        td3.appendChild(img);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
}