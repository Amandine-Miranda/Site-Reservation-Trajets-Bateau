using System;
using System.Diagnostics;
using System.IO;
using System.Collections.Generic;

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
                public string nom;	//nom de la reservation 
		public int liaison;     //liaison de la traversee ex : 1
                public string date;     //date de la traversee ex : "01/11/2025"
                public string heure;    //heure de la traversee ex : "9h45"
		public string horodatage;	//heure de la reservation

                public Reservation(string n, int l, string d, string h)     //constructeur de Reservation
                {
			nom = n;
                        liaison = l;
                        date = d;
                        heure = h;
			horodatage = "vide pour l'instant";
                }

        


        }

	public static void Main()
	{
                string nomResaUtil;     //Nom entré par l'utilisateur pour la réservation
                int liaisonUtil = 0;        //Liaison choisie par l'utilisateur
                Dictionary<string, Dictionary<string,int>> horaires;    //Dictionnaire des horaires en fonction de la liaison choisie
                horaires = new Dictionary<string, Dictionary<string, int>>();   //Initialisation du dictionnaire

                string confirmation = "non";   //Variable pour confirmer la réservation

                while (confirmation.ToLower().Contains("non"))  //Tant que la réservation n'est pas confirmée
                {       
                        Console.WriteLine("Quel est le nom de votre réservation ?");    // Demande le nom de la réservation à l'utilisateur
                        nomResaUtil = Console.ReadLine();      // L'enregistre dans nomResaUtil

                        string reponse = "non"; //Variable pour confirmer le nom

                        while (reponse.ToLower().Contains("non"))       //Tant que le nom n'est pas confirmé
                        {
                                Console.WriteLine("Quel est le nom de votre réservation ?");    //Demande le nom pour la réservation
                                nomResaUtil = Console.ReadLine();       //L'enregistre dans nomResaUtil
                                Console.WriteLine("Est-ce le bon nom de réservation : " + nomResaUtil + " ?");  //Demande si le nom est le bon
                                reponse = Console.ReadLine();   //Enregistre la réponse dans reponse
                        }


                        while(liaisonUtil != 1 && liaisonUtil != 2 && liaisonUtil != 3 && liaisonUtil != 4) //Tant que l'utilisateur n'a pas fait un choix valide (entre 1 et 4)
                        {
                                Console.WriteLine("Pour quelle liaison voulez-vous réserver ?\n1 - Lorient => Groix\n2 - Groix => Lorient\n3 - Quiberon => Le Palais\n4 - Le Palais => Quiberon");      //Demande à l'utilisateur quelle liaison il veut choisir
                                liaisonUtil = int.Parse(Console.ReadLine()); //L'enregistre dans liaisonUtil
                                
                                if(liaisonUtil == 1) //Si liaisonUtil est égal à 1 (si l'utilisateur à choisi la liaison Lorient => Groix)
                                {
                                        horaires = creerLorientGroix(); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                                        Console.WriteLine("Horaires pour Lorient => Groix :\n");        // On informe à l'utilisateur qu'il s'apprête à voir les horaires de la bonne liaison
                                }

                                else if(liaisonUtil == 2) //Si liaisonUtil est égal à 2 (si l'utilisateur à choisi la liaison Groix => Lorient)
                                {
                                        horaires = creerGroixLorient(); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                                        Console.WriteLine("Horaires pour Groix => Lorient :\n");        // On informe à l'utilisateur qu'il s'apprête à voir les horaires de la bonne liaison
                                }

                                else if(liaisonUtil == 3) //Si liaisonUtil est égal à 3 (si l'utilisateur à choisi la liaison Quiberon => Le Palais)
                                {
                                        horaires = creerQuiberonPalais(); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                                        Console.WriteLine("Horaires pour Quiberon => Le Palais :\n");   // On informe à l'utilisateur qu'il s'apprête à voir les horaires de la bonne liaison
                                }

                                else if(liaisonUtil == 4) //Si liaisonUtil est égal à 4 (si l'utilisateur à choisi la liaison Le Palais => Quiberon)
                                {
                                        horaires = creerPalaisQuiberon(); // On utilise une fonction pour remplir le dictionnaire avec les horaires de la bonne liaison prises du .txt correspondant
                                        Console.WriteLine("Horaires pour Le Palais => Quiberon :\n");   // On informe à l'utilisateur qu'il s'apprête à voir les horaires de la bonne liaison
                                }

                                else //Sinon, c'est que l'utilisateur à entré un chiffre non valide
                                {
                                        Console.WriteLine("Veuillez réessayez en entrant un chiffre entre 1 et 4"); // On en l'informe
                                }
                        }

                        foreach(string horaire in horaires.Keys) //Pour chaque clé (jour) du dictionnaire des horaires du mois de novembre
                        {
                                Console.Write(horaire + " : "); //On affiche la clé avec un : pour bien espacer
                                foreach(string heure in horaires[horaire].Keys) // Pour chaque valeur de chaque clé dans le dictionnaire des horaire
                                {
                                        Console.Write(heure + " | "); // On affiche cette valeur (l'heure) avec un | pour bien les séparer
                                }
                                Console.WriteLine("\n"); //Retour à la ligne à chaque jour pour améliorer la lisibilité
                        }

                        string dateDepart; // Variable qui stocke le date de départ choisie par l'utilisateur

                        Console.Write("Choisissez votre date de départ : "); //Demande à l'utilisateur de choisir une date de départ à partir de la liste de jours proposés précédemment
                        dateDepart = Console.ReadLine().ToUpper(); //Stocke la réponse de l'utilisateur et la mets en majuscule pour chercher plus facilement dans le dictionnaire des horaires

                        foreach(string horaire in horaires.Keys) //Pour chaque jour dans le dictionnaire des horaires
                        {
                                if(horaire == dateDepart) //Si le jour correspond à celui choisi par l'utilisateur
                                {
                                        Console.Write("\n" + horaire + " : "); // Alors on reprécise ce jour
                                        foreach(string heure in horaires[horaire].Keys) // Et pour chaque heure dans le jour
                                        {
                                                Console.Write(heure + " | "); // On l'écrit avec un séparateur pour aérer
                                        }
                                        Console.WriteLine("\n"); // Et on met un retour à la ligne pour aérer (encore)
                                }
                        }

                        string horaireDepart; // Variable qui stocke l'heure choisie par l'utilisateur

                        Console.Write("Choisissez votre horaire : "); // On demande à l'utilisateur de choisir une heure de départ parmi celles proposées
                        horaireDepart = Console.ReadLine(); // On stocke ce choix dans la variable horaireDepart

                        Console.WriteLine("\nVeuillez confirmer votre réservation :\nNom : " + nomResaUtil + "\nDate du départ : " + dateDepart + "\nHeure du départ : " + horaireDepart); //On demande à l'utilisateur si sa réservation est bonne

                        confirmation = Console.ReadLine(); // Et ensuite on stocke sa réponse dans confirmation pour sortir du Tant Que si c'est égal à "oui"
                }

                //On a bien toutes les infos de la réservation !
	}








        public static Dictionary<string,Dictionary<string,int>> creerLorientGroix()
        {
                Dictionary<string,Dictionary<string,int>> jourB = new Dictionary<string,Dictionary<string,int>>();
                
                FileStream fs = new FileStream("lorientgroix.txt", FileMode.Open, FileAccess.Read);
                StreamReader lorientgroix = new StreamReader(fs);
                
                if(File.Exists("lorientgroix.txt"))
                {
                        while(!lorientgroix.EndOfStream)
                        {
                                string ligne =lorientgroix.ReadLine();
                                char[] separateur = new char[] {';'};
                                string[] temp = ligne.Split(separateur);
                                string[] temp2 = temp[1].Split('|');
                                Dictionary<string,int> tempdic2 = new Dictionary<string,int>();
                                for(int i =1; i<=temp2.Length-1; i++)
                                {
                                        tempdic2.Add(temp2[i], 30);
                                }
                                jourB.Add(temp[0],tempdic2);
                        }
                }
                return jourB;
        }



        public static Dictionary<string,Dictionary<string,int>> creerGroixLorient()
        {
                Dictionary<string,Dictionary<string,int>> jourB = new Dictionary<string,Dictionary<string,int>>();
                
                FileStream fs = new FileStream("groixlorient.txt", FileMode.Open, FileAccess.Read);
                StreamReader groixlorient = new StreamReader(fs);

                if(File.Exists("groixlorient.txt"))
                {
                        while(!groixlorient.EndOfStream)
                        {
                                string ligne =groixlorient.ReadLine();
                                char[] separateur = new char[] {';'};
                                string[] temp = ligne.Split(separateur);
                                string[] temp2 = temp[1].Split('|');
                                Dictionary<string,int> tempdic2 = new Dictionary<string,int>();
                                for(int i =1; i<=temp2.Length-1; i++)
                                {
                                        tempdic2.Add(temp2[i], 30);
                                }
                                jourB.Add(temp[0],tempdic2);
                        }
                }
                return jourB;
        }



        public static Dictionary<string,Dictionary<string,int>> creerQuiberonPalais()
        {
                Dictionary<string,Dictionary<string,int>> jourB = new Dictionary<string,Dictionary<string,int>>();
                
                FileStream fs = new FileStream("quiberonpalais.txt", FileMode.Open, FileAccess.Read);
                StreamReader quiberonpalais = new StreamReader(fs);

                if(File.Exists("quiberonpalais.txt"))
                {
                        while(!quiberonpalais.EndOfStream)
                        {
                                string ligne =quiberonpalais.ReadLine();
                                char[] separateur = new char[] {';'};
                                string[] temp = ligne.Split(separateur);
                                string[] temp2 = temp[1].Split('|');
                                Dictionary<string,int> tempdic2 = new Dictionary<string,int>();
                                for(int i =1; i<=temp2.Length-1; i++)
                                {
                                        tempdic2.Add(temp2[i], 30);
                                }
                                jourB.Add(temp[0],tempdic2);
                        }
                }
                return jourB;
        }




        public static Dictionary<string,Dictionary<string,int>> creerPalaisQuiberon()
        {
                Dictionary<string,Dictionary<string,int>> jourB = new Dictionary<string,Dictionary<string,int>>();

                FileStream fs = new FileStream("palaisquiberon.txt", FileMode.Open, FileAccess.Read);
                StreamReader palaisquiberon = new StreamReader(fs);

                if(File.Exists("palaisquiberon.txt"))
                {
                        while(!palaisquiberon.EndOfStream)
                        {
                                string ligne =palaisquiberon.ReadLine();
                                char[] separateur = new char[] {';'};
                                string[] temp = ligne.Split(separateur);
                                string[] temp2 = temp[1].Split('|');
                                Dictionary<string,int> tempdic2 = new Dictionary<string,int>();
                                for(int i =1; i<=temp2.Length-1; i++)
                                {
                                        tempdic2.Add(temp2[i], 30);
                                }
                                jourB.Add(temp[0],tempdic2);
                        }
                }
                return jourB;
        }

}
