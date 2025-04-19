export interface Recruteur {
    id_rec: number;
    nomRec: string;
    prenomRec: string;
    emailRec: string;
    motPasse_rec?: string; // mot de passe optionnel ici
    poste: string;
    entreprise: string;
  }
  