let facture;                                                                                        // on initialise une variable facture 
const id = document.getElementById("numResa").value;                                                // on initialise une constante id qui stocke le numéro de réservation récupéré depuis le html (entré par l'utilisateur)
const urlAPI = `https://can.iutrs.unistra.fr/api/reservation/${id}`;                                // on initialise une constante urlAPI qui stocke l'URL de l'API avec le bon numéro de réservation
let passager = 1;                                                                                   // on intiialise une variable passager à 1 car l'API commence à 1 et pas 0
let vehicule = 1;                                                                                   // on initialise une variable véhicule à 1 car l'API commence à 1 et pas 0
const urlPassager = `https://can.iutrs.unistra.fr/api/reservation/${id}/passager/${passager}`;      // on initialise une constante qui contient le modèle des URL pour les passagers
const urlVehicule = `https://can.iutrs.unistra.fr/api/reservation/${id}/vehicule/${vehicule}`;      // on initialise une constante qui contient le modèle des URL pour les véhicules

const TARIF_ADULTE_GROIX = 18.75;                                                                   // on initialise une constante qui contient le tarif pour les adultes pour la liaison qui vient ou part de Groix
const TARIF_JEUNE_GROIX = 13.80;                                                                    // on initialise une constante qui contient le tarif pour les jeunes pour la liaison qui vient ou part de Groix
const TARIF_ENFANT_GROIX = 11.25;                                                                   // on initialise une constante qui contient le tarif pour les enfants pour la liaison qui vient ou part de Groix

const TARIF_ANCOMP = 3.35;                                                                          // on initialise une constante qui contient le tarif pour les animaux de compagnie

const TARIF_ADULTE_BELLEILE = 18.80;                                                                // on initialise une constante qui contient le tarif pour les adultes pour la liaison qui vient ou part de Quiberon (Belle-île)
const TARIF_JEUNE_BELLEILE = 14.10;                                                                 // on initialise une constante qui contient le tarif pour les jeunes pour la liaison qui vient ou part de Quiberon (Belle-île)
const TARIF_ENFANT_BELLEILE = 11.65;                                                                // on initialise une constante qui contient le tarif pour les enfants pour la liaison qui vient ou part de Quiberon (Belle-île)

let prixTotalAdultes;                                                                               // on initialise une variable qui contient le tarif total pour les adultes
let prixTotalJeunes;                                                                                // on initialise une variable qui contient le tarif total pour les jeunes
let prixTotalEnfants;                                                                               // on initialise une variable qui contient le tarif total pour les enfants
let prixTotalAnimaux;                                                                               // on initialise une variable qui contient le tarif total pour les animaux

async function chargerAPI() {                                                                       // fonction principale qu'on appelle lorsqu'on appuie sur le bouton "appuyer" elle permet tout d'abord de charger les infos de l'API, asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)
    try {
        const response = await fetch(urlAPI);
        facture = await response.json();                                                            // on stocke les informations récupérées sur l'API dans la variable facture
    } catch (e) {
        console.error("Erreur de chargement JSON :", e);
    }

    afficherFacture();                                                                              // on affiche la facture après avoir récupéré ses infos
}

async function chargerPassager(passager) {                                                          // fonction pour charger les informations du passager depuis l'API, prend en paramètre passager, pour pouvoir parcourir tous les passagers. asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)
    const urlPassager = `https://can.iutrs.unistra.fr/api/reservation/${facture.id}/passager/${passager}`;
    const response = await fetch(urlPassager);
    return await response.json();
}

async function chargerVehicule(vehicule) {                                                          // asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)
    const urlVehicule = `https://can.iutrs.unistra.fr/api/reservation/${facture.id}/vehicule/${vehicule}`;
    const response = await fetch(urlVehicule);
    return await response.json();
}

async function afficherFacture() {                                                                  // fonction principale pour afficher la facture, asynchrone car on attend (await) d'avoir récupéré les informations (fetch) avec succès pour ensuite les stocker (response)

    document.getElementById("infosResaFacture").classList.remove("hidden");                         // on enlève la classe "hidden" => caché de la div qui contient toutes les infos, on l'affiche donc

    var laDate = new Date();                                                                        
    document.getElementById("LieuDate").textContent = "Illkirch le " + laDate.getDate() + "/" + (laDate.getMonth() + 1) + "/" + laDate.getFullYear();   // on cherche la date du jour et on l'affiche avec le lieu (j'ai mis Illkirch sans le changer car on ne consultera jamais le site en dehors de l'IUT et c'est trop compliqué de récupérer la localisation de la personne qui voit la facture)

    document.getElementById("numFacture").textContent = facture.id;                                 // on affiche le numéro de réservation depuis l'API
    document.getElementById("nomFacture").textContent = facture.nom;                                // on affiche le nom de réservation depuis l'API
    document.getElementById("traverseeFacture").textContent = facture.portDepart + " - " + facture.portArrivee; // on affiche le port de départ et d'arrivée depuis l'API
    
    const tabDate = facture.date.split("-");                                                        // on transforme la date récupérée depuis l'API en tableau pour pouvoir la reformater correctement

    document.getElementById("dateTraversee").textContent = tabDate[2] + "/" + tabDate[1] + "/" + tabDate[0];    // on récupère la date du tableau pour l'afficher correctement
    document.getElementById("heureTraversee").textContent = facture.heure;                          // on récupère l'heure de départ des infos de l'API et on l'affiche
    document.getElementById("bateauTraversee").textContent = facture.bateau;                        // on récupère le nom du bateau des infos de l'API et on l'affiche

    let nbAdultes = 0;                                                                              // on initialise une variable qui contient le nombre d'adultes
    let nbJeunes = 0;                                                                               // on initialise une variable qui contient le nombre de jeunes
    let nbEnfants = 0;                                                                              // on initialise une variable qui contient le nombre d'enfants
    let nbBebes = 0;                                                                                // on initialise une variable qui contient le nombre de bébés
    let nbAnimaux = 0;                                                                              // on initialise une variable qui contient le nombre d'animaux

    for(let i = 1; i <= facture.nbPassagers; i++){                                                  // tant qu'il y a encore des passagers à compter
        const infosPassager = await chargerPassager(i);                                             // on charge les infos du passager avec le numéro de passager pour avoir la bonne URL

        if(infosPassager.libelleCategorie.includes("Adulte")){                                      // si la catégorie du passager (info récupérée de l'API) contient "Adulte", c'est donc un adulte
            nbAdultes++;                                                                            // on augmente donc le nombre d'adultes
        }
        else if(infosPassager.libelleCategorie.includes("Jeune")){                                  // si la catégorie du passager (info récupérée de l'API) contient "Jeune", c'est donc un jeune
            nbJeunes++;                                                                             // on augmente donc le nombre de jeunes
        }
        else if(infosPassager.libelleCategorie.includes("Enfant")){                                 // si la catégorie du passager (info récupérée de l'API) contient "Enfant", c'est donc un enfant
            nbEnfants++;                                                                            // on augmente donc le nombre d'enfants
        }
        else if(infosPassager.libelleCategorie.includes("Bébé")){                                   // si la catégorie du passager (info récupérée de l'API) contient "Bébé", c'est donc un bébé
            nbBebes++;                                                                              // on augmente donc le nombre de bébés
        }
        else if(infosPassager.libelleCategorie.inclues("Animal")){                                  // si la catégorie du passager (info récupérée de l'API) contient "Animal", c'est donc un animal de compagnie
            nbAnimaux++;                                                                            // on augmente donc le nombre d'animaux de compagnie
        }
    }

    nbAdultes = 0;
    
    document.getElementById("nbAdultes").textContent = nbAdultes;                                   // on part du principe qu'il y a toujours au moins un adulte dans la réservation

    if(nbJeunes > 0){                                                                               // si il y a plus d'un jeune
        document.getElementById("ligneJeunes").classList.remove("hidden");                          // on affiche la ligne des jeunes
        document.getElementById("nbJeunes").textContent = nbJeunes;                                 // on affiche le nombre de jeunes
    }

    if(nbEnfants > 0){                                                                              // si il y a plus d'un enfant
        document.getElementById("ligneEnfants").classList.remove("hidden");                         // on affiche la ligne des enfants
        document.getElementById("nbEnfants").textContent = nbEnfants;                               // on affiche le nombre d'enfants
    }
    
    if(nbBebes > 0){                                                                                // si il y a plus d'un bébé
        document.getElementById("ligneBebes").classList.remove("hidden");                           // on affiche la ligne des bébés
        document.getElementById("nbBebes").textContent = nbBebes;                                   // on affiche le nombre de bébés
    }

    if(nbAnimaux > 0){                                                                              // si il y a plus d'un animal
        document.getElementById("ligneAnimaux").classList.remove("hidden");                         // on affiche la ligne des animaux
        document.getElementById("nbAnimaux").textContent = nbAnimaux;                               // on affiche le nombre d'animaux
    }


    if(facture.portDepart.includes("Groix") || facture.portArrivee.includes("Groix") || facture.portDepart.includes("Tudy") || facture.portArrivee.includes("Tudy")){   // Si le port de départ ou le port d'arrivée contient Groix ou Tudy, on applique les tarifs communs à ces ports
        document.getElementById("prixUnitAdultes").textContent = TARIF_ADULTE_GROIX;                // on affiche le tarif unitaire pour les adultes sur cette liaison (aller ou retour) 
        document.getElementById("prixUnitJeunes").textContent = TARIF_JEUNE_GROIX;                  // on affiche le tarif unitaire pour les jeunes sur cette liaison (aller ou retour)
        document.getElementById("prixUnitEnfants").textContent = TARIF_ENFANT_GROIX;                // on affiche le tarif unitaire pour les enfants sur cette liaison (aller ou retour)
        prixTotalAdultes = TARIF_ADULTE_GROIX * nbAdultes;                                          // on multiplie le tarif unitaire par le nombre d'adultes
        prixTotalJeunes = TARIF_JEUNE_GROIX * nbJeunes;                                             // on multiplie le tarif unitaire par le nombre de jeunes
        prixTotalEnfants = TARIF_ENFANT_GROIX * nbEnfants;                                          // on multiplie le tarif unitaire par le nombre d'enfants
    }

    else if(facture.portDepart.includes("Belle") || facture.portArrivee.includes("Belle") || facture.portDepart.includes("Palais") || facture.portArrivee.includes("Palais")){  // Si le port de départ ou le port d'arrivée contient Belle ou Palais, on applique les tarifs communs à ces ports
        document.getElementById("prixUnitAdultes").textContent = TARIF_ADULTE_BELLEILE;             // on affiche le tarif unitaire pour les adultes sur cette liaison (aller ou retour) 
        document.getElementById("prixUnitJeunes").textContent = TARIF_JEUNE_BELLEILE;               // on affiche le tarif unitaire pour les jeunes sur cette liaison (aller ou retour) 
        document.getElementById("prixUnitEnfants").textContent = TARIF_ENFANT_BELLEILE;             // on affiche le tarif unitaire pour les enfants sur cette liaison (aller ou retour) 
        prixTotalAdultes = TARIF_ADULTE_BELLEILE * nbAdultes;                                       // on multiplie le tarif unitaire par le nombre d'adultes
        prixTotalJeunes = TARIF_JEUNE_BELLEILE * nbJeunes;                                          // on multiplie le tarif unitaire par le nombre de jeunes
        prixTotalEnfants = TARIF_ENFANT_BELLEILE * nbEnfants;                                       // on multiplie le tarif unitaire par le nombre d'enfants
    }

    let prixTotalAnimaux = TARIF_ANCOMP * nbAnimaux;                                                // les animaux de compagnie ont toujours les mêmes tarifs peu importe la liaison, donc on calcule juste le prix total selon le nombre d'animaux

    document.getElementById("prixAdultes").textContent = prixTotalAdultes;                          // on affiche le prix total adultes
    document.getElementById("prixJeunes").textContent = prixTotalJeunes;                            // on affiche le prix total jeunes
    document.getElementById("prixEnfants").textContent = prixTotalEnfants;                          // on affiche le prix total enfants
    document.getElementById("prixAnimaux").textContent = prixTotalAnimaux;                          // on affiche le prix total animaux

    let prixTotalPersonnes = prixTotalAdultes + prixTotalJeunes + prixTotalEnfants + prixTotalAnimaux;  // on calcule le prix total de tous les passagers
    
    document.getElementById("prixTotalPersonnes").textContent =  Number.parseFloat(prixTotalPersonnes).toFixed(2) + "€";    // on l'affiche en coupant au deuxième chiffre pour pas que ce soit trop long et avec un euro

    if(facture.nbVehicules > 0){                                                                    // si il y a des véhicules dans la réservation
        let nbTrots = 0;                                                                            // on initialise une variable qui contient le nombre de trottinettes
        let nbVelos = 0;                                                                            // on initialise une variable qui contient le nombre de vélos
        let nbVelosElec = 0;                                                                        // on initialise une variable qui contient le nombre de vélos électriques
        let nbGrosVelos = 0;                                                                        // on initialise une variable qui contient le nombre de gros vélos (cargo ou tandem)
        let nbMobil = 0;                                                                            // on initialise une variable qui contient le nombre de mobilettes (deux roues en dessous de 125cm/3)
        let nbMotos = 0;                                                                            // on initialise une variable qui contient le nombre de motos (deux roues au dessus de 125cm/3)
        let nbAutosCat1 = 0;                                                                        // on initialise une variable qui contient le nombre de voiture catégorie 1 (moins de 4 mètres)
        let nbAutosCat2 = 0;                                                                        // on initialise une variable qui contient le nombre de voiture catégorie 2 (de 4 mètres à 4.39 mètres)
        let nbAutosCat3 = 0;                                                                        // on initialise une variable qui contient le nombre de voiture catégorie 3 (de 4.40 mètres à 4.79 mètres)
        let nbAutosCat4 = 0;                                                                        // on initialise une variable qui contient le nombre de voiture catégorie 4 (de 4.80 mètres et plus)
        let nbCampCars = 0;                                                                         // on initialise une variable qui contient le nombre de véhicules qui font plus de 2.10 mètres de hauteur (camping-cars)...

        for(let i = 1; i <= facture.nbVehicules; i++){                                              // tant qu'il y a encore des véhicules à compter
            const infosVehicule = await chargerVehicule(i);                                         // on charge les infos du véhicule avec le numéro de véhicule pour avoir la bonne URL

            if(infosVehicule.code.includes("trot")){                                                // si la catégorie du véhicule (info récupérée de l'API) contient "trot", c'est donc une trottinette
                nbTrots++;                                                                          // on augmente donc le nombre de trottinettes
            }
            else if(infosVehicule.code.includes("velo")){                                           // si la catégorie du véhicule (info récupérée de l'API) contient "velo", c'est donc un vélo
                nbVelos++;                                                                          // on augmente donc le nombre de vélos
            }
            else if(infosVehicule.code.includes("velelec")){                                        // si la catégorie du véhicule (info récupérée de l'API) contient "velelec", c'est donc un vélo électrique
                nbVelosElec++;                                                                      // on augmente donc le nombre de vélos électriques
            }
            else if(infosVehicule.code.includes("cartand")){                                        // si la catégorie du véhicule (info récupérée de l'API) contient "cartand", c'est donc un gros vélo (tandem ou cargo)
                nbGrosVelos++;                                                                      // on augmente donc le nombre de gros vélos (cargos ou tandems)
            }
            else if(infosVehicule.code.includes("mobil")){                                          // si la catégorie du véhicule (info récupérée de l'API) contient "mobil", c'est donc une mobilette
                nbMobil++;                                                                          // on augmente donc le nombre de mobilettes
            }
            else if(infosVehicule.code.includes("moto")){                                           // si la catégorie du véhicule (info récupérée de l'API) contient "moto", c'est donc une moto
                nbMotos++;                                                                          // on augmente donc le nombre de motos
            }
            else if(infosVehicule.code.includes("cat1")){                                           // si la catégorie du véhicule (info récupérée de l'API) contient "cat1", c'est donc une voiture catégorie 1 (moins de 4 mètres)
                nbAutosCat1++;                                                                      // on augmente donc le nombre de voitures catégorie 1
            }
            else if(infosVehicule.code.includes("cat2")){                                           // si la catégorie du véhicule (info récupérée de l'API) contient "cat2", c'est donc une voiture catégorie 2 (de 4 mètres à 4.39 mètres)
                nbAutosCat2++;                                                                      // on augmente donc le nombre de voitures catégorie 2
            }
            else if(infosVehicule.code.includes("cat3")){                                           // si la catégorie du véhicule (info récupérée de l'API) contient "cat3", c'est donc une voiture catégorie 3 (de 4.40 mètres à 4.79 mètres)
                nbAutosCat3++;                                                                      // on augmente donc le nombre de voitures catégorie 3
            }
            else if(infosVehicule.code.includes("cat4")){                                           // si la catégorie du véhicule (info récupérée de l'API) contient "cat4", c'est donc une nombre de voiture catégorie 4 (de 4.80 mètres et plus)
                nbAutosCat4++;                                                                      // on augmente donc le nombre de voitures catégorie 4
            }
            else if(infosVehicule.code.includes("camp")){                                           // si la catégorie du véhicule (info récupérée de l'API) contient "camp", c'est donc un véhicule qui font plus de 2.10 mètres de hauteur (camping-car)...
                nbCampCars++;                                                                       // on augmente donc le nombre de camping-cars
            }
        }

        if(nbTrots > 0){                                                                            // si il y a des trottinettes dans la réservation
            document.getElementById("ligneTrot").classList.remove("hidden");                        // on affiche la ligne auparavant cachée
            document.getElementById("nbTrot").textContent = nbTrots;                                // on affiche le nombre de trottinettes
        }

        if(nbVelos > 0){                                                                            // si il y a des vélos dans la réservation
            document.getElementById("ligneVelo").classList.remove("hidden");                        // on affiche la ligne auparavant cachée
            document.getElementById("nbVelo").textContent = nbVelos;                                // on affiche le nombre de vélos
        }
        
        if(nbVelosElec > 0){                                                                        // si il y a des vélos électriques dans la réservation
            document.getElementById("ligneVeloElec").classList.remove("hidden");                    // on affiche la ligne auparavant cachée
            document.getElementById("nbVeloElec").textContent = nbVelosElec;                        // on affiche le nombre de vélos électriques
        }

        if(nbGrosVelos > 0){                                                                        // si il y a des gros vélos dans la réservation
            document.getElementById("ligneGrosVelo").classList.remove("hidden");                    // on affiche la ligne auparavant cachée
            document.getElementById("nbGrosVelo").textContent = nbGrosVelos;                        // on affiche le nombre de gros vélos
        }

        if(nbMobil > 0){                                                                            // si il y a des mobilettes dans la réservation
            document.getElementById("ligneMobil").classList.remove("hidden");                       // on affiche la ligne auparavant cachée
            document.getElementById("nbMobil").textContent = nbMobil;                               // on affiche le nombre de mobilettes
        }

        if(nbMotos > 0){                                                                            // si il y a des motos dans la réservation
            document.getElementById("ligneMoto").classList.remove("hidden");                        // on affiche la ligne auparavant cachée
            document.getElementById("nbMoto").textContent = nbMotos;                                // on affiche le nombre de motos
        }

        if(nbAutosCat1 > 0){                                                                        // si il y a des voitures catégorie 1 dans la réservation
            document.getElementById("ligneAutoCat1").classList.remove("hidden");                    // on affiche la ligne auparavant cachée
            document.getElementById("nbAutoCat1").textContent = nbAutosCat1;                        // on affiche le nombre de voitures catégorie 1
        }

        if(nbAutosCat2 > 0){                                                                        // si il y a des voitures catégorie 2 dans la réservation
            document.getElementById("ligneAutoCat2").classList.remove("hidden");                    // on affiche la ligne auparavant cachée
            document.getElementById("nbAutoCat2").textContent = nbAutosCat2;                        // on affiche le nombre de voitures catégorie 2
        }

        if(nbAutosCat3 > 0){                                                                        // si il y a des voitures catégorie 3 dans la réservation
            document.getElementById("ligneAutoCat3").classList.remove("hidden");                    // on affiche la ligne auparavant cachée
            document.getElementById("nbAutoCat3").textContent = nbAutosCat3;                        // on affiche le nombre de voitures catégorie 3
        }

        if(nbAutosCat4 > 0){                                                                        // si il y a des voitures catégorie 4 dans la réservation                                                                        
            document.getElementById("ligneAutoCat4").classList.remove("hidden");                    // on affiche la ligne auparavant cachée
            document.getElementById("nbAutoCat4").textContent = nbAutosCat4;                        // on affiche le nombre de voitures catégorie 4
        }

        if(nbCampCars > 0){                                                                         // si il y a des camping-cars dans la réservation
            document.getElementById("ligneCampCar").classList.remove("hidden");                     // on affiche la ligne auparavant cachée
            document.getElementById("nbCampCar").textContent = nbCampCars;                          // on affiche le nombre de camping-cars
        }


        let prixTotalMobils;                                                                        // on initialise une variable qui contient le nombre de mobilettes
        let prixTotalMotos;                                                                         // on initialise une variable qui contient le nombre de motos
        let prixTotalAutoCat1;                                                                      // on initialise une variable qui contient le nombre de voitures catégorie 1
        let prixTotalAutoCat2;                                                                      // on initialis.colonnese une variable qui contient le nombre de voitures catégorie 2
        let prixTotalAutoCat3;                                                                      // on initialise une variable qui contient le nombre de voitures catégorie 3
        let prixTotalAutoCat4;                                                                      // on initialise une variable qui contient le nombre de voitures catégorie 4
        let prixTotalCampCars;                                                                      // on initialise une variable qui contient le nombre de camping-cars
        // on initialise pas les trottinettes, les vélos, les vélos électriques et les gros vélos ici car ils ne dépendent pas de la liaison, on les définira donc après

        if(facture.portDepart.includes("Groix") || facture.portArrivee.includes("Groix") || facture.portDepart.includes("Tudy") || facture.portArrivee.includes("Tudy")){   // Si le port de départ ou le port d'arrivée contient Groix ou Tudy, on applique les tarifs communs à ces ports
            document.getElementById("prixUnitMobil").textContent = 23.10;                           // on affiche le tarif unitaire pour les mobilettes sur cette liaison (aller ou retour) 
            document.getElementById("prixUnitMoto").textContent = 66.05;                            // on affiche le tarif unitaire pour les motos sur cette liaison (aller ou retour) 
            document.getElementById("prixUnitAutoCat1").textContent = 96.05;                        // on affiche le tarif unitaire pour les voitures catégorie 1 sur cette liaison (aller ou retour) 
            document.getElementById("prixUnitAutoCat2").textContent = 114.80;                       // on affiche le tarif unitaire pour les voitures catégorie 2 sur cette liaison (aller ou retour) 
            document.getElementById("prixUnitAutoCat3").textContent = 174.45;                       // on affiche le tarif unitaire pour les voitures catégorie 3 sur cette liaison (aller ou retour) 
            document.getElementById("prixUnitAutoCat4").textContent = 210.90;                       // on affiche le tarif unitaire pour les voitures catégorie 4 sur cette liaison (aller ou retour) 
            document.getElementById("prixUnitCampCar").textContent = 330.20;                        // on affiche le tarif unitaire pour les camping-cars sur cette liaison (aller ou retour) 
            prixTotalMobils = 23.10 * nbMobil;                                                      // on multiplie le tarif unitaire par le nombre de mobilettes
            prixTotalMotos = 66.05 * nbMotos;                                                       // on multiplie le tarif unitaire par le nombre de motos
            prixTotalAutoCat1 = 96.05 * nbAutosCat1;                                                // on multiplie le tarif unitaire par le nombre de voitures catégorie 1
            prixTotalAutoCat2 = 114.80 * nbAutosCat2;                                               // on multiplie le tarif unitaire par le nombre de voitures catégorie 2
            prixTotalAutoCat3 = 174.45 * nbAutosCat3;                                               // on multiplie le tarif unitaire par le nombre de voitures catégorie 3
            prixTotalAutoCat4 = 210.90 * nbAutosCat4;                                               // on multiplie le tarif unitaire par le nombre de voitures catégorie 4
            prixTotalCampCars = 330.20 * nbCampCars;                                                // on multiplie le tarif unitaire par le nombre de camping-cars
        }

        else if(facture.portDepart.includes("Belle") || facture.portArrivee.includes("Belle") || facture.portDepart.includes("Palais") || facture.portArrivee.includes("Palais")){  // Si le port de départ ou le port d'arrivée contient Belle ou Palais, on applique les tarifs communs à ces ports
            document.getElementById("prixUnitMobil").textContent = 23.35;                           // on affiche le tarif unitaire pour les mobilettes sur cette liaison (aller ou retour)
            document.getElementById("prixUnitMoto").textContent = 66.40;                            // on affiche le tarif unitaire pour les motos sur cette liaison (aller ou retour) 
            document.getElementById("prixUnitAutoCat1").textContent = 98.50;                        // on affiche le tarif unitaire pour les voitures catégorie 1 sur cette liaison (aller ou retour)
            document.getElementById("prixUnitAutoCat2").textContent = 117.20;                       // on affiche le tarif unitaire pour les voitures catégorie 2 sur cette liaison (aller ou retour)
            document.getElementById("prixUnitAutoCat3").textContent = 176.90;                       // on affiche le tarif unitaire pour les voitures catégorie 3 sur cette liaison (aller ou retour)
            document.getElementById("prixUnitAutoCat4").textContent = 213.35;                       // on affiche le tarif unitaire pour les voitures catégorie 4 sur cette liaison (aller ou retour)
            document.getElementById("prixUnitCampCar").textContent = 332.70;                        // on affiche le tarif unitaire pour les camping-cars sur cette liaison (aller ou retour)
            prixTotalMobils = 23.35 * nbMobil;                                                      // on multiplie le tarif unitaire par le nombre de mobilettes
            prixTotalMotos = 66.40 * nbMotos;                                                       // on multiplie le tarif unitaire par le nombre de motos
            prixTotalAutoCat1 = 98.50 * nbAutosCat1;                                                // on multiplie le tarif unitaire par le nombre de voitures catégorie 1
            prixTotalAutoCat2 = 117.20 * nbAutosCat2;                                               // on multiplie le tarif unitaire par le nombre de voitures catégorie 2
            prixTotalAutoCat3 = 176.90 * nbAutosCat3;                                               // on multiplie le tarif unitaire par le nombre de voitures catégorie 3
            prixTotalAutoCat4 = 213.35 * nbAutosCat4;                                               // on multiplie le tarif unitaire par le nombre de voitures catégorie 4
            prixTotalCampCars = 332.70 * nbCampCars;                                                // on multiplie le tarif unitaire par le nombre de camping-cars
        }

        document.getElementById("prixUnitTrot").textContent = 4.70;                                 // on affiche le tarif unitaire pour les trottinettes sur cette liaison (aller ou retour)
        document.getElementById("prixUnitVelo").textContent = 8.20;                                 // on affiche le tarif unitaire pour les vélos sur cette liaison (aller ou retour)
        document.getElementById("prixUnitVeloElec").textContent = 11.00;                            // on affiche le tarif unitaire pour les vélos électriques sur cette liaison (aller ou retour)
        document.getElementById("prixUnitGrosVelo").textContent = 16.45;                            // on affiche le tarif unitaire pour les gros vélos sur cette liaison (aller ou retour)
        let prixTotalTrots = 4.70 * nbTrots;                                                        // on multiplie le tarif unitaire par le nombre de trottinettes
        let prixTotalVelos = 8.20 * nbVelos;                                                        // on multiplie le tarif unitaire par le nombre de vélos
        let prixTotalVelosElec = 11.00 * nbVelosElec;                                               // on multiplie le tarif unitaire par le nombre de vélos électriques
        let prixTotalGrosVelos = 16.45 * nbGrosVelos;                                               // on multiplie le tarif unitaire par le nombre de gros vélos

        document.getElementById("prixTotalTrot").textContent = prixTotalTrots;                      // on affiche le prix total trottinettes
        document.getElementById("prixTotalVelo").textContent = prixTotalVelos;                      // on affiche le prix total vélos
        document.getElementById("prixTotalVeloElec").textContent = prixTotalVelosElec;              // on affiche le prix total vélos électriques
        document.getElementById("prixTotalGrosVelo").textContent = prixTotalGrosVelos;              // on affiche le prix total gros vélos
        document.getElementById("prixTotalMobil").textContent = prixTotalMobils;                    // on affiche le prix total mobilettes
        document.getElementById("prixTotalMoto").textContent = prixTotalMotos;                      // on affiche le prix total motos
        document.getElementById("prixTotalAutoCat1").textContent = prixTotalAutoCat1;               // on affiche le prix total voitures catégorie 1
        document.getElementById("prixTotalAutoCat2").textContent = prixTotalAutoCat2;               // on affiche le prix total voitures catégorie 2
        document.getElementById("prixTotalAutoCat3").textContent = prixTotalAutoCat3;               // on affiche le prix total voitures catégorie 3
        document.getElementById("prixTotalAutoCat4").textContent = prixTotalAutoCat4;               // on affiche le prix total voitures catégorie 4
        document.getElementById("prixTotalCampCar").textContent = prixTotalCampCars;                // on affiche le prix total camping-cars

        let prixTotalVehicules = prixTotalTrots + prixTotalVelos + prixTotalVelosElec + prixTotalGrosVelos + prixTotalMobils + prixTotalMotos + prixTotalAutoCat1 + prixTotalAutoCat2 + prixTotalAutoCat3 + prixTotalAutoCat4 + prixTotalCampCars;  // on calcule le prix total de tous les passagers
        
        document.getElementById("prixTotalVehicules").textContent =  Number.parseFloat(prixTotalVehicules).toFixed(2) + "€";    // on l'affiche en coupant au deuxième chiffre pour pas que ce soit trop long et avec un euro

        let prixTotal = 0;                                                                          // on initialise une variable qui stocke le prix total de toute la réservation
        prixTotal = prixTotalPersonnes + prixTotalVehicules;                                        // on calcule ce prix total

        document.getElementById("prixTotal").textContent = "Prix total : " + prixTotal + "€";       // on l'affiche (on a pas besoin de faire un toFixed parce qu'on le fait déjà sur les deux chiffres qu'on additionne ducoup ça donne un chiffre déjà à deux chiffre après la virgule)
    }
}