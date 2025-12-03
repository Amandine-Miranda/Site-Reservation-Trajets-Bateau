using System;
using System.IO;
using System.Collections.Generic;

class Code
{
	

	public static void Main()
	{
		Dictionary<string, Dictionary<string, float>> catPass;
		catPass = new Dictionary<string, Dictionary<string, float>>();
		// dictionnaire contenant des dictionnaires contenant les prix par catégorie de passagers par traversée
		Dictionary<string, Dictionary<string, float>> catVe;
                catVe = new Dictionary<string, Dictionary<string, float>>();
		// dictionnaire contenant des dictionnaires contenant les prix par catégorie de vehicule par traversee
        
		initPrix(catPass,catVe);
		// remplis les deux dictionnaires si dessus 
	
			




	}	

	public static void reservation(Dictionary<string, Dictionary<string, float>> catPass , Dictionary<string, Dictionary<string, float>> catVe)
	{
	
		Reservation res;
		string nomRes;
		int trav;
		string hour;
		string date;
		string horodatage;

		Console.WriteLine("Quel est le nom de votre reservation ?");
		nomRes = Console.ReadLine();
		Console.WriteLine("Quel est la traversee pour laquelle vous souhaitez reserver ?\n 1 : \n 2 : \n 3 : \n 4 : ");
                trav = int.Parse(Console.ReadLine());
		while(trav != 1 && trav != 2 && trav != 3 && trav != 4 )
		{
		
			Console.WriteLine("Traversee invalide.\nQuel est la traversee pour laquelle vous souhaitez reserver ?\n 1 : \n 2 : \n 3 : \n 4 : ");
                	trav = int.Parse(Console.ReadLine());

		}	
		Console.WriteLine("Quel est le nom de votre reservation ?");
                nomRes = Console.ReadLine();
		Console.WriteLine("Quel est le nom de votre reservation ?");
                nomRes = Console.ReadLine();
		Console.WriteLine("Quel est le nom de votre reservation ?");
                nomRes = Console.ReadLine();


	}
	
	/////////////////////////////////////////////////ICI LES STRUCTURES MOCHES AU COIN ////////////////////////////////////////////////////////////////////
	
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

	
	//////////////////////////////////////////////////////////////////////Init des dicos dégeus///////////////////////////////////	
	
	public static void initPrix(Dictionary<string, Dictionary<string, float>> catPass,Dictionary<string, Dictionary<string, float>> catVe)
	{
	
		Dictionary<string,float> adu;
                adu = new Dictionary<string, float>();
                Dictionary<string,float> jeu;
                jeu = new Dictionary<string, float>();
                Dictionary<string,float> enf;
                enf = new Dictionary<string, float>();
                Dictionary<string,float> bb;
                bb = new Dictionary<string, float>();
                Dictionary<string,float> ani;
                ani = new Dictionary<string, float>();


                catPass.Add("adu26p",adu);
                catPass.Add("jeu1825",jeu);
                catPass.Add("enf417",enf);
                catPass.Add("bebe",bb);
                catPass.Add("ancomp",ani);

                adu.Add("Groix",18.75f);
                adu.Add("Belle-Ile",18.80f);
                jeu.Add("Groix",13.80f);
                jeu.Add("Belle-Ile",14.10f);
                enf.Add("Groix",11.25f);
                enf.Add("Belle-Ile",11.65f);
                bb.Add("Groix",0);
                bb.Add("Belle-Ile",0);
                ani.Add("Groix",3.35f);
                ani.Add("Belle-Ile",3.35f);

		Dictionary<string,float> trot;
                trot = new Dictionary<string, float>();
                Dictionary<string,float> vel;
                vel = new Dictionary<string, float>();
                Dictionary<string,float> velec;
                velec = new Dictionary<string, float>();
                Dictionary<string,float> cartand;
                cartand = new Dictionary<string, float>();
                Dictionary<string,float> mob;
                mob = new Dictionary<string, float>();
                Dictionary<string,float> moto;
                moto = new Dictionary<string, float>();
                Dictionary<string,float> cat1;
                cat1 = new Dictionary<string, float>();
                Dictionary<string,float> cat2;
                cat2 = new Dictionary<string, float>();
                Dictionary<string,float> cat3;
                cat3 = new Dictionary<string, float>();
                Dictionary<string,float> cat4;
                cat4 = new Dictionary<string, float>();
                Dictionary<string,float> camp;
                camp = new Dictionary<string, float>();

		catVe.Add("trot",trot);
                catVe.Add("velo",vel);
                catVe.Add("velelec",velec);
                catVe.Add("cartand",cartand);
                catVe.Add("mobil",mob);
                catVe.Add("moto",moto);
                catVe.Add("cat1",cat1);
                catVe.Add("cat2",cat2);
                catVe.Add("cat3",cat3);
                catVe.Add("cat4",cat4);
                catVe.Add("camp",camp);

                trot.Add("Groix",4.70f);
                trot.Add("Belle-Ile",4.70f);
                vel.Add("Groix",8.20f);
                vel.Add("Belle-Ile",8.20f);
                velec.Add("Groix",11);
                velec.Add("Belle-Ile",11);
                cartand.Add("Groix",16.45f);
                cartand.Add("Belle-Ile",16.45f);
                mob.Add("Groix",23.10f);
                mob.Add("Belle-Ile",23.35f);
                moto.Add("Groix",66.05f);
                moto.Add("Belle-Ile",66.40f);
                cat1.Add("Groix",96.05f);
                cat1.Add("Belle-Ile",98.50f);
                cat2.Add("Groix",114.80f);
                cat2.Add("Belle-Ile",117.20f);
                cat3.Add("Groix",174.45f);
                cat3.Add("Belle-Ile",176.90f);
                cat4.Add("Groix",210.90f);
                cat4.Add("Belle-Ile",213.35f);
                camp.Add("Groix",330.20f);
                camp.Add("Belle-Ile",332.70f);
	
	}

}
