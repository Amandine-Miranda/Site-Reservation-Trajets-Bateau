using System;
using System.Diagnostics;
using System.IO;
using System.Collections.Generic;



//
//si des variables sont initialisées a null , 0,"" ect , c'est pour eviter certains bugs. on sait qu'on est pas obligés de leur assigner une valeur quand on les declare
//




class Structures
{
        public struct Passager
        {
                public string categorie;     	//categorie du passager ex : "adu26p"
                public string nomFamille;     	//nom de famille du passager ex : "Adams"
                public string prenom;		//heure de la traversee ex : "Gomez"

                public Passager(string c, string nf, string p)     //constructeur de Passager
                {

                        categorie = c;
                        nomFamille = nf;
                        prenom = p;
                }

        }

        public struct Vehicule
        {
                public string categorie;       //categorie du vehicule ex : "cat4"
                public int quantite;	       //quantite de vehicules de cette categorie ex : 1

                public Vehicule(string c, int q)     //constructeur de Vehicule
                {

                        categorie = c;
                        quantite = q;
                }


        }
        public struct Reservation
        {
                public string nom;      //nom de la reservation 
                public int liaison;     //liaison de la traversee ex : 1
                public string date;     //date de la traversee ex : "01/11/2025"
                public string heure;    //heure de la traversee ex : "9h45"
                public string horodatage;	//heure de la reservation
                public List<Passager> passagers;	// Liste des passagers
                public List<Vehicule> vehicules;	// Liste des vehicules

                public Reservation(string n, int l, string d, string h, List<Passager> pass, List<Vehicule> vehi)     //constructeur de Reservation
                {
                        nom = n;
                        liaison = l;
                        date = d;
                        heure = h;
                        DateTime localDate = DateTime.Now;
                        horodatage = localDate.ToString("yyyy-MM-dd HH:mm:ss");
                        passagers = new List<Passager>();
                        vehicules = new List<Vehicule>();
                        passagers = pass;
                        vehicules = vehi;
                }
        }



        public static void Main()
        {
                string fichierSauvegarde = "ressources/res.json"; // fichier dans lequel on sauvegarde les reservations

                Dictionary<string, Dictionary<string, float>> catPass;
                catPass = new Dictionary<string, Dictionary<string, float>>();
                // dictionnaire contenant des dictionnaires contenant les prix par catégorie de passagers par traversée
                Dictionary<string, Dictionary<string, float>> catVe;
                catVe = new Dictionary<string, Dictionary<string, float>>();
                // dictionnaire contenant des dictionnaires contenant les prix par catégorie de vehicule par traversee

                initPrix(catPass, catVe);
                float prixTotal = 0;
                // remplis les deux dictionnaires si dessus

                Reservation reservationClient;          // Déclare une reservation qui sera remplie ( ou pas ) par le client
                Reservation reservationRetourClient;    // Déclare une reservation qui sera remplie ( ou pas ) partiellement par le client
                Console.WriteLine("Bonjour, voulez vous reserver ? (oui/non)"); // on demande a l'utilisateur s'il veut reserver ( au cas où on developpe d'autres fonctionnalitées plus tard)
                if (Console.ReadLine() == "oui")
                {
                        clearFichier(fichierSauvegarde);    // on prepare le fichier a la sauvegarde de la reservation
                        debutSauvegarde(fichierSauvegarde);
                        reservationClient = reserver(catPass, catVe);   // on permet a l'utilisateur de reserver
                        sauvegardeRes(reservationClient, fichierSauvegarde);               // on enregistre sa reservation
                        prixTotal = calculPrix(reservationClient, catPass, catVe);      // on met a jour le prix de sa reservation
                        Console.WriteLine("Voulez vous reserver votre retour ? (oui/non)");     // on demande a l'utilisateur s'il veut reserver son retour
                        if (Console.ReadLine() == "oui")                                        // si l'utilisateur veut reserver
                        {
                                prepareSauvegardeRetour(fichierSauvegarde);
                                reservationRetourClient = reserverRetour(reservationClient);    // on lance la reservation du retour 
                                sauvegardeRes(reservationRetourClient, fichierSauvegarde);
                                prixTotal += calculPrix(reservationClient, catPass, catVe);     // le prix du retour est le même que l'aller (même tarifs,memes passagers et memes vehicules)
                        }
                }
                finSauvegarde(fichierSauvegarde);
                afficher(fichierSauvegarde);
                Console.WriteLine("Voici un récapitulatif de votre reservation");        // on affiche le fichier json par flemme de faire un truc propre, ça respecte la consigne et on verra après si on a le temps de faire mieu
                Console.WriteLine("Vous avez reserver pour un total de : " + prixTotal + "€.");        // on affiche le prix des reservations de l'utilisateur
                Console.WriteLine("Au revoir");
        }

        public static Reservation reserver(Dictionary<string, Dictionary<string, float>> catPass, Dictionary<string, Dictionary<string, float>> catVe) //gère la reservation
        {

                string nomResaUtil = null;     //Nom entré par l'utilisateur pour la réservation
                int liaisonUtil = 0;        //Liaison choisie par l'utilisateur
                Dictionary<string, List<string>> horaires;    //Dictionnaire des horaires en fonction de la liaison choisie
                horaires = new Dictionary<string, List<string>>();   //Initialisation du dictionnaire

                string confirmeRes = "non";     //Variable pour confirmer la réservation, par defaut a "non" pour eviter d'enregister une reservation par accident
                string dateDepart = null;       // Variable qui stocke le date de départ choisie par l'utilisateur
                string horaireDepart = null;    // Variable qui stocke l'heure choisie par l'utilisateur
                List<Passager> passagers = new List<Passager>();        // on declare la liste des passagers
                List<Vehicule> vehicules = new List<Vehicule>();        // on declare la liste des vehicules

                while (!(confirmeRes.ToLower().Contains("oui")))  //Tant que la réservation n'est pas confirmée
                {
                        //on reinitialise les variables changées dans cette boucle au cas où on boucle
                        liaisonUtil = 0;        //on réinitialise la liaison choisie pour que l'utilisateur puisse re-choisir sa liaison  
                        passagers = new List<Passager>();
                        vehicules = new List<Vehicule>();

                        nomResaUtil = reserveNom();
                        horaires = reserveHoraires();
                        afficherHoraires(horaires);
                        dateDepart= reserveDate(horaires);
                        horaireDepart = reserveHoraireDepart(dateDepart,horaires);
                        passagers = reservePassagers();
                        vehicules = reserveVehicules(catVe);

                        dateDepart = dateDepart.Substring(1, dateDepart.Length - 1);        // on récupère le numéro du jour de la reservation
                        dateDepart = "2025-11-" + dateDepart;                           // on prepare la date au format json
                        Console.WriteLine("Confirmez-vous cette reservation ? (oui/non)\nNom : " + nomResaUtil + "\nDate du départ : " + dateDepart + "\nHeure du départ : " + horaireDepart); //On demande à l'utilisateur si sa réservation est bonne

                        confirmeRes = Console.ReadLine(); // Et ensuite on stocke sa réponse dans confirmeRes pour sortir du Tant Que si c'est égal à "oui"
                }

                //On a bien toutes les infos de la réservation !
                Reservation res = new Reservation(nomResaUtil, liaisonUtil, dateDepart, horaireDepart, passagers, vehicules); //On créé une reservation
                return res;

        }

        public static Reservation reserverRetour(Reservation aller)
        {
                string nomRes = null;     //Nom entré par l'utilisateur pour la réservation
                Dictionary<string, List<string>> horaires;    //Dictionnaire des horaires en fonction de la liaison choisie
                horaires = new Dictionary<string, List<string>>();   //Initialisation du dictionnaire

                string confirmeRes = "non";   //Variable pour confirmer la réservation, par defaut a "non" pour eviter d'enregister une reservation par accident
                string dateDepart = null; // Variable qui stocke le date de départ choisie par l'utilisateur
                string horaireDepart = null; // Variable qui stocke l'heure choisie par l'utilisateur


                while (!(confirmeRes.ToLower().Contains("oui")))  //Tant que la réservation n'est pas confirmée
                {
                        nomRes = "retour " + aller.nom;      // enregistre le nom de la reservation retour dans nomRes

                        /////////////// on choisit la liaison inverse a la place de l'utilisateur pour éviter les erreurs ///////////////
                        if (aller.liaison == 1)
                        {
                                horaires = creerDicoHoraires("ressources/groixlorient.txt"); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                        }
                        else if (aller.liaison == 2)
                        {
                                horaires = creerDicoHoraires("ressourceslorientgroix.txt"); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                        }
                        else if (aller.liaison == 3)
                        {
                                horaires = creerDicoHoraires("ressources/palaisquiberon.txt"); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                        }

                        else //Si aller.liason est égal à 4 (si l'utilisateur à choisi la liaison Le Palais => Quiberon)
                        {
                                horaires = creerDicoHoraires("ressources/quiberonpalais.txt"); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                        }


                        afficherHoraires(horaires);
                        dateDepart = reserveDate(horaires);
                        horaireDepart = reserveHoraireDepart(dateDepart, horaires);
                        Console.WriteLine("Confirmez-vous cette reservation ? (oui/non)\nNom : " + nomRes + "\nDate du départ : " + dateDepart + "\nHeure du départ : " + horaireDepart); //On demande à l'utilisateur si sa réservation est bonne

                        confirmeRes = Console.ReadLine(); // Et ensuite on stocke sa réponse dans confirmeRes pour sortir du Tant Que si c'est égal à "oui"
                }
                dateDepart = dateDepart.Substring(1, dateDepart.Length - 1);        // on récupère le numéro du jour de la reservation
                dateDepart = "2025-11-" + dateDepart;                           // on prepare la date au format json
                Reservation res = new Reservation(nomRes, aller.liaison, dateDepart, horaireDepart, aller.passagers, aller.vehicules); //On créé la reservation retour
                return res;
        }

        public static string reserveNom() // gere la partie nom de la reservation
        {
                string confirmeNom = "non";     //Variable pour confirmer le nom , par defaut a "non" pour eviter d'enregister le mauvais nom par accident
                string nomResaUtil = "";             //Variable du nom
                while (!(confirmeNom.ToLower().Contains("oui")))       //Tant que le nom n'est pas confirmé
                {
                        // on reinitialise les variables au cas ou on boucle
                        confirmeNom = "non";
                        nomResaUtil = "";

                        Console.WriteLine("Quel est le nom de votre réservation ?");    //Demande le nom pour la réservation
                        nomResaUtil = Console.ReadLine();       //L'enregistre dans nomResaUtil
                        Console.WriteLine("Est-ce le bon nom de réservation : " + nomResaUtil + " ? ( oui/non )");  //Demande si le nom est le bon
                        confirmeNom = Console.ReadLine();   //Enregistre la réponse dans confirmeNom
                }
                return nomResaUtil;
        }

        public static Dictionary<string, List<string>> reserveHoraires()        // gere la reservation de la liaison
        {
                int liaisonUtil = 0;
                Dictionary<string, List<string>> horaires = new Dictionary<string, List<string>>();
                while (liaisonUtil != 1 && liaisonUtil != 2 && liaisonUtil != 3 && liaisonUtil != 4) //Tant que l'utilisateur n'a pas fait un choix valide (entre 1 et 4)
                {
                        Console.WriteLine("Pour quelle liaison voulez-vous réserver ?\n1 - Lorient => Groix\n2 - Groix => Lorient\n3 - Quiberon => Le Palais\n4 - Le Palais => Quiberon");      //Demande à l'utilisateur quelle liaison il veut choisir
                        liaisonUtil = int.Parse(Console.ReadLine()); //L'enregistre dans liaisonUtil
                        if (liaisonUtil == 1) //Si liaisonUtil est égal à 1 (si l'utilisateur à choisi la liaison Lorient => Groix)
                        {
                                horaires = creerDicoHoraires("ressources/lorientgroix.txt"); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                                Console.WriteLine("Horaires pour Lorient => Groix :\n");        // On informe à l'utilisateur qu'il s'apprête à voir les horaires de la bonne liaison
                        }

                        else if (liaisonUtil == 2) //Si liaisonUtil est égal à 2 (si l'utilisateur à choisi la liaison Groix => Lorient)
                        {
                                horaires = creerDicoHoraires("ressources/groixlorient.txt"); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                                Console.WriteLine("Horaires pour Groix => Lorient :\n");        // On informe à l'utilisateur qu'il s'apprête à voir les horaires de la bonne liaison
                        }

                        else if (liaisonUtil == 3) //Si liaisonUtil est égal à 3 (si l'utilisateur à choisi la liaison Quiberon => Le Palais)
                        {
                                horaires = creerDicoHoraires("ressources/quiberonpalais.txt"); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                                Console.WriteLine("Horaires pour Quiberon => Le Palais :\n");   // On informe à l'utilisateur qu'il s'apprête à voir les horaires de la bonne liaison
                        }

                        else if (liaisonUtil == 4) //Si liaisonUtil est égal à 4 (si l'utilisateur à choisi la liaison Le Palais => Quiberon)
                        {
                                horaires = creerDicoHoraires("ressources/palaisquiberon.txt"); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                                Console.WriteLine("Horaires pour Le Palais => Quiberon :\n");   // On informe à l'utilisateur qu'il s'apprête à voir les horaires de la bonne liaison
                        }

                        else //Sinon, c'est que l'utilisateur à entré un chiffre non valide
                        {
                                Console.WriteLine("Veuillez réessayez en entrant un chiffre entre 1 et 4"); // On en l'informe
                        }
                }
                return horaires;

        }

        public static string reserveDate(Dictionary<string, List<string>> horaires)
        {
                bool dateValide = false;        // Variable permettant de verifier si la date de depart entrée est valide , initialisée a faux car au début du code aucune date n'est rentrée
                string dateDepart = null;       // Variable qui stocke le date de départ choisie par l'utilisateur
                while (!dateValide) // boucle verifiant que la date entrée est valide
                {
                        Console.WriteLine("Choisissez votre date de départ. "); //Demande à l'utilisateur de choisir une date de départ à partir de la liste de jours proposés précédemment
                        dateDepart = Console.ReadLine().ToUpper(); //Stocke la réponse de l'utilisateur et la mets en majuscule pour chercher plus facilement dans le dictionnaire des horaires
                        foreach (string date in horaires.Keys) //parcoure les clefs du dictionnaire horaires qui sont des dates 
                        {

                                if (date == dateDepart)
                                {
                                        dateValide = true; // si la date entrée par l'utilisateur est une clef du dictionnaire horaires alort la date est valide
                                }

                        }
                        if (!dateValide)
                        {
                                Console.WriteLine("Vous avez entré une date ( " + dateDepart + " ) invalide , recommencez."); // previens l'utilisateur que la date qu'il a entré est invalide	
                        }
                }
                return dateDepart;
        }

        public static string reserveHoraireDepart(string dateDepart,Dictionary<string, List<string>> horaires)
        {
                string horaireDepart = null; // Variable qui stocke l'heure choisie par l'utilisateur
                bool horaireValide = false;     // Variable permettant de verifier si l'heure de depart entrée est valide , initialisée a faux car au début du code aucune heure n'est rentrée
                
                Console.Write("\n" + dateDepart + " : "); //on précise le jour choisit
                foreach (string heure in horaires[dateDepart]) // Et pour chaque heure dans le jour
                {
                        Console.Write(heure + " | "); // On l'écrit avec un séparateur pour aérer
                }
                Console.Write("\n"); // On saute a la prochane ligne pour faire propre
                while (!horaireValide) // boucle verifiant que l'horaire entrée est valide
                {
                        Console.WriteLine("Choisissez votre heure de départ . (NN:NN) "); //Demande à l'utilisateur de choisir une date de départ à partir de la liste de jours proposés précédemment
                        horaireDepart = Console.ReadLine(); //Stocke la réponse de l'utilisateur 

                        foreach (string heure in horaires[dateDepart]) //parcoure les horaires disponibles du jour choisit 
                        {

                                if (heure == horaireDepart)
                                {
                                        horaireValide = true; // si l'horaire entrée par l'utilisateur est une valeur du dictionnaire horaires alort l'horaire est valide
                                }

                        }
                        if (!horaireValide)
                        {
                                Console.WriteLine("Vous avez entré une heure ( " + horaireDepart + " ) invalide , recommencez."); // previens l'utilisateur que la date qu'il a entré est invalide  
                        }
                }
                return horaireDepart;
        }

        public static List<Passager> reservePassagers() // gère la partie passagers de la reservation
        {
                List<Passager> passagers = new List<Passager>();        // initialise la liste qu'on va renvoyer
                int age = 0;
                string nomDeFamille = null;
                string prenom = null;
                string boucle = "oui"; // variable verifiant si on boucle , initialisée a oui car on veut que la boucle s'execute au moins une fois
                string valide = "non"; // variable verifiant si les information esntrées sont correctes, initialisée a non car on veut que la boucle s'execute au moins une fois


                while (!(boucle.ToLower().Contains("non")))  //Tant que la boucle n'est pas confirmée
                {
                        //on reinitialise les variables changées dans cette boucle au cas où on boucle
                        age = 0;
                        nomDeFamille = null;
                        prenom = null;
                        valide = "non";
                        while (!(valide.ToLower().Contains("oui")))     //tant que les informations ne sont pas validées apr l'utilisateur
                        {
                                Console.WriteLine("Le passager est-t'il un animal de compagnie ? (oui/non)");   // on verifie si le passager et un humain ou un animal
                                nomDeFamille = Console.ReadLine(); // on utilise la variable nomDeFamille pour éviter de créer une variable pour un seul if
                                if (nomDeFamille.ToLower().Contains("oui"))     // si le passager est un animal
                                {
                                        age = -1;                                               // on precise que c'est un animal de compagnie ( voir getCatPassager )
                                        Console.WriteLine("Quel est le nom de votre animal?");  // on demande son nom
                                        prenom = Console.ReadLine();                               // on l'enregistre
                                        Console.WriteLine("Quel est la race de votre animal?"); // on demande sa race
                                        nomDeFamille = Console.ReadLine();                      // on l'enregistre

                                        Console.WriteLine("votre animal est bien un(e) " + nomDeFamille + " nommé(e) " + prenom + " ? (oui/non)");    // on verifie que les valeurs entrées soient correctes
                                        valide = Console.ReadLine();    //on stocke la reponse dans la variable valide

                                }
                                else
                                {
                                        Console.WriteLine("Quel est le prenom de votre passager ?");            // on demande son prenom
                                        prenom = Console.ReadLine();                                            // on l'enregistre
                                        Console.WriteLine("Quel est le nom de famille de votre passager ?");    // on demande son som de famille
                                        nomDeFamille = Console.ReadLine();                                      // on l'enregistre
                                        Console.WriteLine("Quel est l'age de votre passager ? (1/2/3/...) ");   // on demande son age
                                        age = int.Parse(Console.ReadLine());                                    // on l'enregistre

                                        Console.WriteLine("votre passager est bien " + nomDeFamille + " " + prenom + " agé(e) de " + age + " ans? (oui/non)");    // on verifie que les valeurs entrées soient correctes
                                        valide = Console.ReadLine();
                                }
                        }
                        Passager nouveauPassager = new Passager(getCatPassager(age), nomDeFamille, prenom);     // on créé un passager avec les informations fournies par l'utilisateur
                        passagers.Add(nouveauPassager); // on ajoute le passager créé a la liste de passagers de cette reservation
                        Console.WriteLine("Voulez vous rajouter un passager a votre reservation ? (oui/non)");    // on demande au passager si il souhaite rajouter une passager a sa réservation
                        boucle = Console.ReadLine();    // on l'enregistre dans la variable boucle
                }
                return passagers;
        }



        public static string getCatPassager(int age)    //renvoie la catégorie du passager calculée a partir de son age
        {
                string cat;

                if (age < 0)    // on assigne aux animaux de compagnie un age négatif pour les diferencier des passagers humains et pouvoir récuperer leur catégorie avec cette fonction pour gagner du temps
                {
                        cat = "ancomp";
                }
                else if (age < 4)
                {
                        cat = "bebe";
                }
                else if (age < 18)
                {
                        cat = "enf417";
                }
                else if (age < 26)
                {
                        cat = "jeu1825";
                }
                else cat = "adu26p";

                return cat;
        }

        public static List<Vehicule> reserveVehicules(Dictionary<string, Dictionary<string, float>> catVe) // gère la partie vhicules de la reservation
        {
                List<Vehicule> vehicules = new List<Vehicule>();        // initialise la liste qu'on va renvoyer
                string choixCat = null;        // catégorie du vehicule enregistré
                int qtt = 0;            // nombre de vehicule par categorie de ehicule enregistré
                bool catValide = false; // permet de verfier la validité de la catégorie entrée par l'utilisateur
                string boucle = "oui"; // variable verifiant si on boucle , initialisée a oui car on veut que la boucle s'execute au moins une fois
                string valide = "non"; // variable verifiant si les information esntrées sont correctes, initialisée a non car on veut que la boucle s'execute au moins une fois


                Console.WriteLine("Souhaitez vos rajouter un vehicule a votre reservation ? ( oui/non )");
                if (Console.ReadLine() == "oui")
                {
                        while (!(boucle.ToLower().Contains("non")))  //Tant que la boucle n'est pas confirmée
                        {
                                //on reinitialise les variables changées dans cette boucle au cas où on boucle
                                choixCat = null;
                                qtt = 0;
                                catValide = false;
                                valide = "non";
                                while (!(valide.ToLower().Contains("oui")))     //tant que les informations ne sont pas validées apr l'utilisateur
                                {
                                        while (!catValide)
                                        {
                                                Console.WriteLine("catégorie \t description");          // on presente a l'utilisateur les différentes catégories pour qu'il puisse choisir a laquelle appartiens son vehicule
                                                Console.WriteLine("trot\t\t Trottinette électrique");
                                                Console.WriteLine("velo\t\t Vélo ou remorque à vélo");
                                                Console.WriteLine("velelec\t\t Vélo électrique");
                                                Console.WriteLine("cartand\t\t Vélo cargo ou tandem");
                                                Console.WriteLine("mobil\t\t Deux-roues <= 125 cm3");
                                                Console.WriteLine("moto\t\t Deux-roues > 125 cm3");
                                                Console.WriteLine("cat1\t\t Voiture moins de 4 m");
                                                Console.WriteLine("cat2\t\t Voiture de 4 m à 4.39 m");
                                                Console.WriteLine("cat3\t\t Voiture de 4.40 m à 4.79 m");
                                                Console.WriteLine("cat4\t\t Voiture 4.80 m et plus");
                                                Console.WriteLine("camp\t\t Camping-car - véhicule plus de 2.10 m de haut");

                                                Console.WriteLine("Quel est la catégorie de votre vehicule ?");         // on demande a l'utilisateur la catégorie de son vehicule
                                                choixCat = (Console.ReadLine());                                        // on l'enregistre
                                                foreach (string cat in catVe.Keys)      // on parcoure les categories de vehicules
                                                {
                                                        if (choixCat == cat)            // si le choix de l'utilisateur correspond a une catégorie
                                                        {
                                                                catValide = true;       // son choix est valide
                                                        }
                                                }
                                        }
                                        Console.WriteLine("Pour combiens de vehicules de cette catégorie souhaitez-vous reserver ? ( 1/2/3/... )");    // on demande combiens de vehicules de cette catégorie l'utilisateur veut réserver
                                        qtt = int.Parse(Console.ReadLine());      // on enregistre combiens de vehicules de cette catégorie l'utilisateur veut réserver
                                        Console.WriteLine("vous avez réservé pour " + qtt + " " + choixCat + " ? (oui/non)");    // on verifie que les valeurs entrées soient correctes
                                        valide = Console.ReadLine();    // on enregistre la reponse de l'utilisateur dan la variable valide

                                }
                                Vehicule nouveauVehicule = new Vehicule(choixCat, qtt);     // on créé une reservation de vehicule avec les informations fournies par l'utilisateur
                                vehicules.Add(nouveauVehicule); // on ajoute le passager créé a la liste de vehicules de cette reservation
                                Console.WriteLine("Voulez vous rajouter un vehicule a votre reservation ? (oui/non)");    // on demande au passager si il souhaite rajouter un vehicule a sa réservation
                                boucle = Console.ReadLine();    // on l'enregistre dans la variable boucle
                        }
                }
                return vehicules;
        }


        public static float calculPrix(Reservation res, Dictionary<string, Dictionary<string, float>> catPass, Dictionary<string, Dictionary<string, float>> catVe)     //renvoie de cout d'une reservation 
        {
                float prix = 0;

                if (res.liaison < 3)    //on est sur le tarrif de Groix
                {
                        foreach (Passager pass in res.passagers)        // on parcoure les passagers
                        {
                                prix += catPass[pass.categorie]["Groix"];     //on incremente le prix de la reservation par le prix de la place de chaque passager en fonction de sa catégorie et du trajet choisit
                        }
                        foreach (Vehicule vehi in res.vehicules)        // on parcoure les vehicules
                        {
                                prix += catVe[vehi.categorie]["Groix"] * vehi.quantite;     //on incremente le prix de la reservation par le prix de chaque vehicule en fonction de sa catégorie, du trajet choisit et de la quantitee reservee
                        }

                }
                else
                {
                        foreach (Passager pass in res.passagers)        // on parcoure les passagers
                        {
                                prix += catPass[pass.categorie]["Belle-Ile"];     //on incremente le prix de la reservation par le prix de la place de chaque passager en fonction de sa catégorie et du trajet choisit
                        }
                        foreach (Vehicule vehi in res.vehicules)        // on parcoure les vehicules
                        {
                                prix += catVe[vehi.categorie]["Belle-Ile"] * vehi.quantite;     //on incremente le prix de la reservation par le prix de chaque vehicule en fonction de sa catégorie, du trajet choisit et de la quantitee reservée
                        }
                }
                return prix;

        }




        public static void clearFichier(string fichier)     //vide le fichier passé en paramètre
        {
                if (File.Exists(fichier))               // si le fichier existe
                {
                        File.WriteAllText(fichier, string.Empty);       //on remplace son contenu par un string vide
                }
                else File.Create(fichier);              // sinon on créé le fichier ( sans le vider car il est vide de base)
        }
        


        ////////////////////////////////////////////////////// fonctions d'affichage ///////////////////////////////////////////////////////////////////////


        
        public static void afficherHoraires(Dictionary<string, List<string>> horaires)
        {
                foreach (string jour in horaires.Keys) //Pour chaque clé (jour) du dictionnaire des horaires du mois de novembre
                {
                        Console.Write(jour + " : "); //On affiche la clé avec un : pour bien espacer
                        foreach (string heure in horaires[jour]) // Pour chaque valeur de chaque clé dans le dictionnaire des horaire
                        {
                                Console.Write(heure + " | "); // On affiche cette valeur (l'heure) avec un | pour bien les séparer
                        }
                        Console.WriteLine("\n"); //Retour à la ligne à chaque jour pour améliorer la lisibilité
                }
        }

        

        public static void afficher(string fichier)
        {
                if (File.Exists(fichier))
                {
                        string ligne;

                        FileStream fs = new FileStream(fichier, FileMode.Open, FileAccess.Read);
                        StreamReader reader = new StreamReader(fs);
                        while (!reader.EndOfStream)
                        {
                                //lire l'enregistrement
                                ligne = reader.ReadLine();
                                Console.WriteLine(ligne);
                        }
                        reader.Close();
                }
                else Console.WriteLine("error: " + fichier + " not found");

        }


        //////////////////////////////////////////////////////////////////////fonctions de sauvegardes///////////////////////////////////	

        public static void debutSauvegarde(string fichier)
        {

                if (File.Exists(fichier))
                {
                        FileStream fs = new FileStream(fichier, FileMode.Append, FileAccess.Write);
                        StreamWriter writer = new StreamWriter(fs);

                        writer.WriteLine("[{");        //ouvre la liste de reservations et la structure reservation (l'aller)
                        writer.Close();
                }
                else Console.WriteLine("error: " + fichier + " not found");
        }
        public static void sauvegardeRes(Reservation res, string fichier)
        {


                if (File.Exists(fichier))
                {
                        int nbPassagers;
                        int nbVehicules;

                        FileStream fs = new FileStream(fichier, FileMode.Append, FileAccess.Write);
                        StreamWriter writer = new StreamWriter(fs);

                        writer.WriteLine("\t\"reservation\":");        // partie gauche de la paire reservation contenant les informations générales 
                        writer.WriteLine("\t{");                       // les informations générales :
                        writer.WriteLine("\t\t\"nom\": \"" + res.nom + "\",");
                        writer.WriteLine("\t\t\"idLiaison\": " + res.liaison + ",");
                        writer.WriteLine("\t\t\"date\": \"" + res.date + "\",");
                        writer.WriteLine("\t\t\"heure\": \"" + res.heure + "\",");
                        writer.WriteLine("\t\t\"horodatage\": \"" + res.horodatage + "\",");

                        writer.WriteLine("\t},");                      // fin des informations générales

                        writer.WriteLine("\t\"passagers\": [");        // partie gauche de la paire pasagers contenant les passagers et ouverture de la liste de passagers

                        nbPassagers = res.passagers.Count;
                        for (int i = 0; i < nbPassagers - 1; i++)
                        {
                                writer.WriteLine("\t\t{");                       // les informations du passager :
                                writer.WriteLine("\t\t\t\"nom\": \"" + res.passagers[i].nomFamille + "\",");
                                writer.WriteLine("\t\t\t\"prenom\": \"" + res.passagers[i].prenom + "\",");
                                writer.WriteLine("\t\t\t\"codeCategorie\": \"" + res.passagers[i].categorie + "\"");
                                writer.WriteLine("\t\t},");                      // fin des informations du passager
                        }

                        writer.WriteLine("\t\t{");                       // les informations du dernier passager :
                        writer.WriteLine("\t\t\t\"nom\": \"" + res.passagers[nbPassagers - 1].nomFamille + "\",");
                        writer.WriteLine("\t\t\t\"prenom\": \"" + res.passagers[nbPassagers - 1].prenom + "\",");
                        writer.WriteLine("\t\t\t\"codeCategorie\": \"" + res.passagers[nbPassagers - 1].categorie + "\"");
                        writer.WriteLine("\t\t}");                      // fin des informations du dernier passager ( on met pas de virgule a la fin car dernier de la structure)


                        writer.WriteLine("\t],");                      // fin des informations des passagers
                        writer.WriteLine("");                          // on saute une ligne comme demmandé dans l'énoncé

                        writer.WriteLine("\t\"vehicules\": [");        // partie gauche de la paire vehicules contenant les vehicules et ouverture de la liste de vehicules

                        nbVehicules = res.vehicules.Count;
                        if (nbVehicules > 0)
                        {
                                for (int i = 0; i < nbVehicules - 1; i++)
                                {
                                        writer.WriteLine("\t\t{");                       // les informations du vehicule :
                                        writer.WriteLine("\t\t\t\"codeCategorie\" \"" + res.vehicules[i].categorie + "\",");
                                        writer.WriteLine("\t\t\t\"quantite\" " + res.vehicules[i].quantite);
                                        writer.WriteLine("\t\t},");                      // fin des informations du vehicule
                                }

                                writer.WriteLine("\t\t{");                       // les informations du dernier vehicule :
                                writer.WriteLine("\t\t\t\"codeCategorie\" \"" + res.vehicules[nbVehicules - 1].categorie + "\",");
                                writer.WriteLine("\t\t\t\"quantite\" " + res.vehicules[nbVehicules - 1].quantite);
                                writer.WriteLine("\t\t}");                      // fin des informations du dernier vehicule
                        }
                        writer.WriteLine("\t],");                      // fin des informations des vehicules

                        writer.Close();

                }
                else Console.WriteLine("error: " + fichier + " not found");     
        }

        public static void prepareSauvegardeRetour(string fichier)
        {


                if (File.Exists(fichier))
                {
                        FileStream fs = new FileStream(fichier, FileMode.Append, FileAccess.Write);
                        StreamWriter writer = new StreamWriter(fs);

                        writer.WriteLine("},");        //ferme la structure reservations de l'aller
                        writer.WriteLine("{");        //ouvre la structure reservations du retour
                        writer.Close();
                }
                else Console.WriteLine("error: " + fichier + " not found");
        }


        public static void finSauvegarde(string fichier)
        {


                if (File.Exists(fichier))
                {
                        FileStream fs = new FileStream(fichier, FileMode.Append, FileAccess.Write);
                        StreamWriter writer = new StreamWriter(fs);

                        writer.WriteLine("}]");        //ferme la liste de reservations et la structure reservations
                        writer.Close();
                }
                else Console.WriteLine("error: " + fichier + " not found");
        }

        //////////////////////////////////////////////////////////////////////Init des dicos dégeus///////////////////////////////////	
        //rien d'interessant ici , on initialise des dictionnaires comme des bourrins. 
        //ceux des prix sont initialisés pas a pas en c# , les liaisons passent par des fichier textes
        public static void initPrix(Dictionary<string, Dictionary<string, float>> catPass, Dictionary<string, Dictionary<string, float>> catVe)
        {

                Dictionary<string, float> adu;
                adu = new Dictionary<string, float>();
                Dictionary<string, float> jeu;
                jeu = new Dictionary<string, float>();
                Dictionary<string, float> enf;
                enf = new Dictionary<string, float>();
                Dictionary<string, float> bb;
                bb = new Dictionary<string, float>();
                Dictionary<string, float> ani;
                ani = new Dictionary<string, float>();


                catPass.Add("adu26p", adu);
                catPass.Add("jeu1825", jeu);
                catPass.Add("enf417", enf);
                catPass.Add("bebe", bb);
                catPass.Add("ancomp", ani);

                adu.Add("Groix", 18.75f);
                adu.Add("Belle-Ile", 18.80f);
                jeu.Add("Groix", 13.80f);
                jeu.Add("Belle-Ile", 14.10f);
                enf.Add("Groix", 11.25f);
                enf.Add("Belle-Ile", 11.65f);
                bb.Add("Groix", 0);
                bb.Add("Belle-Ile", 0);
                ani.Add("Groix", 3.35f);
                ani.Add("Belle-Ile", 3.35f);

                Dictionary<string, float> trot;
                trot = new Dictionary<string, float>();
                Dictionary<string, float> vel;
                vel = new Dictionary<string, float>();
                Dictionary<string, float> velec;
                velec = new Dictionary<string, float>();
                Dictionary<string, float> cartand;
                cartand = new Dictionary<string, float>();
                Dictionary<string, float> mob;
                mob = new Dictionary<string, float>();
                Dictionary<string, float> moto;
                moto = new Dictionary<string, float>();
                Dictionary<string, float> cat1;
                cat1 = new Dictionary<string, float>();
                Dictionary<string, float> cat2;
                cat2 = new Dictionary<string, float>();
                Dictionary<string, float> cat3;
                cat3 = new Dictionary<string, float>();
                Dictionary<string, float> cat4;
                cat4 = new Dictionary<string, float>();
                Dictionary<string, float> camp;
                camp = new Dictionary<string, float>();

                catVe.Add("trot", trot);
                catVe.Add("velo", vel);
                catVe.Add("velelec", velec);
                catVe.Add("cartand", cartand);
                catVe.Add("mobil", mob);
                catVe.Add("moto", moto);
                catVe.Add("cat1", cat1);
                catVe.Add("cat2", cat2);
                catVe.Add("cat3", cat3);
                catVe.Add("cat4", cat4);
                catVe.Add("camp", camp);

                trot.Add("Groix", 4.70f);
                trot.Add("Belle-Ile", 4.70f);
                vel.Add("Groix", 8.20f);
                vel.Add("Belle-Ile", 8.20f);
                velec.Add("Groix", 11);
                velec.Add("Belle-Ile", 11);
                cartand.Add("Groix", 16.45f);
                cartand.Add("Belle-Ile", 16.45f);
                mob.Add("Groix", 23.10f);
                mob.Add("Belle-Ile", 23.35f);
                moto.Add("Groix", 66.05f);
                moto.Add("Belle-Ile", 66.40f);
                cat1.Add("Groix", 96.05f);
                cat1.Add("Belle-Ile", 98.50f);
                cat2.Add("Groix", 114.80f);
                cat2.Add("Belle-Ile", 117.20f);
                cat3.Add("Groix", 174.45f);
                cat3.Add("Belle-Ile", 176.90f);
                cat4.Add("Groix", 210.90f);
                cat4.Add("Belle-Ile", 213.35f);
                camp.Add("Groix", 330.20f);
                camp.Add("Belle-Ile", 332.70f);

        }


        public static Dictionary<string, List<string>> creerDicoHoraires(string fichier)
        {
                Dictionary<string, List<string>> jourB = new Dictionary<string, List<string>>();

                FileStream fs = new FileStream(fichier, FileMode.Open, FileAccess.Read);
                StreamReader trav = new StreamReader(fs);

                if (File.Exists(fichier))
                {
                        while (!trav.EndOfStream)
                        {
                                string ligne = trav.ReadLine();
                                char[] separateur = new char[] { ';' };
                                string[] temp = ligne.Split(separateur);
                                string[] temp2 = temp[1].Split(" | ");
                                List<string> tempdic2 = new List<string>();
                                for (int i = 1; i <= temp2.Length - 1; i++)
                                {
                                        tempdic2.Add(temp2[i]);
                                }
                                jourB.Add(temp[0], tempdic2);
                        }
                }
                return jourB;
        }
}
