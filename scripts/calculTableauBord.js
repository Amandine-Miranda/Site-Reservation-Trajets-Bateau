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
    liaisonUtil = document.getElementById("liaison").value;                                         // récupère de nouveau la liaison entrée par l'utilisateur dans le HTML et la stocke dans la variable liaisonUtil pour changer quand l'utilisateur en sélectionne une autre
    dateUtil = document.getElementById("date").value;                                               // récupère de nouveau la date entrée par l'utilisateur dans le HTML et la stocke dans la variable dateUtil pour changer quand l'utilisateur en sélectionne une autre

    let tbody = document.getElementById("tableBody");                                               // récupère la div tableBody (corps principal du tableau) et le stocke dans la variable tbody

    document.getElementById("infosTableauBord").classList.remove("hidden");                         // enlève la classe "hidden" => "caché" de la div infosTableauBord, permet donc de l'afficher
    
    if(liaisonUtil == 1){                                                                           // si l'utilisateur à selectionné la liaison 1
        document.getElementById("liaisonUtil").textContent = "Lorient → Groix";                     // alors on affiche "Lorient Groix"
    }
    else if(liaisonUtil == 2){                                                                      // si c'est 2
        document.getElementById("liaisonUtil").textContent = "Groix → Lorient";                     // alors on affiche "Groix Lorient"
    }
    else if(liaisonUtil == 3){                                                                      // si c'est 3
        document.getElementById("liaisonUtil").textContent = "Quiberon → Le Palais";                // alors on affiche "Quiberon Le Palais"
    }
    else if(liaisonUtil == 4){                                                                      // et si c'est 4
        document.getElementById("liaisonUtil").textContent = "Le Palais → Quiberon";                // alors on affiche "Le Palais Quiberon"
    }

    document.getElementById("dateUtil").textContent = dateUtil;                                     // on réaffiche la date choisie par l'utilisateur

    tbody.innerHTML = "";                                                                           // on vide bien le tableau avant de le remplir

    for(let i = 0; i < infos.length; i++){                                                          // tant qu'il y a des éléments à parcourir dans infos
        var tr = document.createElement("tr");                                                      // on créé un élément qui va contenir la ligne i qui nous intéresse
        var td1 = document.createElement("td");                                                     // on créé les 3 colonnes de cette ligne
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        let remplissagePassagers = Number.parseFloat((infos[i].nbReservationPassagers / infos[i].capacitePassagers) * 100).toFixed(2);  // On calcule le taux de remplissage des passagers qu'on stocke dans la variable remplissagePassagers
        let remplissageVoitures = Number.parseFloat((infos[i].nbReservationVoitures / infos[i].capaciteVoitures) * 100).toFixed(2);     // On calcule le taux de remplissage des véhicules qu'on stocke dans la variable remplissageVoitures
        var td1content = document.createTextNode(infos[i].heure);                                   // on crée une variable qui indiquera le contenu de la première colonne
        var td2content = document.createTextNode(remplissagePassagers + "%");                       // on crée une variable qui indiquera le contenu de la deuxième colonne
        var td3content = document.createTextNode(remplissageVoitures + "%");                        // on crée une variable qui indiquera le contenu de la troisième colonne
        const img = document.createElement("img");                                                  // on crée un élément qui contiendra une image
        if(remplissageVoitures >= 0 && remplissageVoitures <= 50){                                  // si le remplissage des voitures sur la liaison à cette date est entre 0% et 50% (inclus)
            img.src = "img/pastilleVerte.png";                                                      // on affiche une pastille verte
        }
        else if(remplissageVoitures > 50 && remplissageVoitures < 75){                              // sinon si le remplissage des voitures sur la liaison à cette date est entre 50% et 75%
            img.src = "img/pastilleOrange.png";                                                     // on affiche une pastille orange
        }
        else if(remplissageVoitures >= 75 && remplissageVoitures < 100){                            // sinon si le remplissage des voitures sur la liaison à cette date est entre 0% et 50% (inclus)
            img.src = "img/pastilleRouge.png";                                                      // on affiche une pastille rouge
        }
        else if(remplissageVoitures >= 100){                                                        // sinon si le remplissage des voitures sur la liaison à cette date de 100% ou plus (nous n'avons pas eu le temps de gérer le fait que lors de la réservation il ne puisse pas y avoir plus de passagers / de véhicules que la capacité maximale)
            img.src = "img/pastilleJaune.png";                                                      // on affiche une pastille jaune fluo
        }
        td1.appendChild(td1content);                                                                // on dit au html que td1content est l'enfant (représente le contenu) de td1 (1ère colonne)
        td2.appendChild(td2content);                                                                // on dit au html que td2content est l'enfant (représente le contenu) de td2 (2ème colonne)
        td3.appendChild(td3content);                                                                // on dit au html que td3content est l'enfant (représente le contenu) de td3 (3ème colonne)
        td3.appendChild(img);                                                                       // on dit au html que img est également l'enfant (représente le contenu) de td3 (3ème colonne)
        tr.appendChild(td1);                                                                        // on dit au html que td1 est l'enfant (représente le contenu) de tr (i tième ligne)
        tr.appendChild(td2);                                                                        // on dit au html que td2 est également l'enfant (représente le contenu) de tr (i tième ligne)
        tr.appendChild(td3);                                                                        // on dit au html que td3 est également l'enfant (représente le contenu) de tr (i tième ligne)
        tbody.appendChild(tr);                                                                      // on dit au html que tr est l'enfant (représente le contenu) de tbody
    }
}