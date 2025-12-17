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
                string nomResaUtil;
                int liaisonUtil;
                Dictionary<string, Dictionary<string,int>> horaires;
                horaires = new Dictionary<string, Dictionary<string, int>>();

                string confirmation = "non";

                while (confirmation.ToLower().Contains("non"))
                {       
                        Console.WriteLine("Quel est le nom de votre réservation ?");
                        nomResaUtil = Console.ReadLine();

                        string reponse = "non";

                        while (reponse.ToLower().Contains("non"))
                        {
                                Console.WriteLine("Quel est le nom de votre réservation ?");
                                nomResaUtil = Console.ReadLine();
                                Console.WriteLine("Est-ce le bon nom de réservation : " + nomResaUtil + " ?");
                                reponse = Console.ReadLine();
                        }

                        Console.WriteLine("Pour quelle liaison voulez-vous réserver ?\n1 - Lorient => Groix\n2 - Groix => Lorient\n3 - Quiberon => Le Palais\n4 - Le Palais => Quiberon");
                        liaisonUtil = int.Parse(Console.ReadLine());

                        if(liaisonUtil == 1)
                        {
                                horaires = creerLorientGroix();
                                Console.WriteLine("Horaires pour Lorient => Groix :\n");
                        }

                        else if(liaisonUtil == 2)
                        {
                                horaires = creerGroixLorient();
                                Console.WriteLine("Horaires pour Groix => Lorient :\n");
                        }

                        else if(liaisonUtil == 3)
                        {
                                horaires = creerQuiberonPalais();
                                Console.WriteLine("Horaires pour Quiberon => Le Palais :\n");
                        }

                        else if(liaisonUtil == 4)
                        {
                                horaires = creerPalaisQuiberon();
                                Console.WriteLine("Horaires pour Le Palais => Quiberon :\n");
                        }

                        else
                        {
                                Console.WriteLine("Veuillez réessayez en entrant un chiffre entre 1 et 4");
                        }

                        foreach(string horaire in horaires.Keys)
                        {
                                Console.Write(horaire + " : ");
                                foreach(string heure in horaires[horaire].Keys)
                                {
                                        Console.Write(heure + " | ");
                                }
                                Console.WriteLine("\n");
                        }

                        string dateDepart;

                        Console.Write("Choisissez votre date de départ : ");
                        dateDepart = Console.ReadLine().ToUpper();

                        foreach(string horaire in horaires.Keys)
                        {
                                if(horaire == dateDepart)
                                {
                                        Console.Write("\n" + horaire + " : ");
                                        foreach(string heure in horaires[horaire].Keys)
                                        {
                                                Console.Write(heure + " | ");
                                        }
                                        Console.WriteLine("\n");
                                }
                        }

                        string horaireDepart;

                        Console.Write("Choisissez votre horaire : ");
                        horaireDepart = Console.ReadLine();

                        /*bool heureValide = false;

                        while (!heureValide)
                        {
                                if (horaires.ContainsKey(dateDepart) && horaires[dateDepart].ContainsKey(horaireDepart))
                                {
                                        heureValide = true;
                                }
                                
                                else
                                {
                                        Console.Write("Horaire invalide, recommencez : ");
                                        horaireDepart = Console.ReadLine();
                                }
                        }*/

                        //Horaire valide ça marche pas même quand je mets un horaire valide ça veut pas....

                        Console.WriteLine("\nVeuillez confirmer votre réservation :\nNom : " + nomResaUtil + "\nDate du départ : " + dateDepart + "\nHeure du départ : " + horaireDepart);

                        confirmation = Console.ReadLine();
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
