using System;
using System.IO;

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
	}



}
