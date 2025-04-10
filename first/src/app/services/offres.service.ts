/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définir l'interface pour les données des offres
export interface Offre {
  id_offre: number;
  nomESE: string;
  local: string;
  typePoste: string;
  missions: string;
  competences: string;
  domaine: string;
  salaire: number;
  statut: string;
  datePublication: string;
  id_rec: number;
}

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiUrl = 'http://localhost:5000/api/offres'; // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les offres
  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl);
  }

  // Exemple d'appel HTTP avec gestion des erreurs
  fetchOffres() {
    this.http.get<Offre[]>(this.apiUrl).subscribe(
      (data: Offre[]) => {
        console.log('Offres récupérées', data);
      },
      (error: any) => {  // Typage explicite de l'erreur
        console.error('Erreur lors du chargement des offres:', error);
      }
    );
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définir l'interface pour les données des offres
export interface Offre {
  id_offre: number;
  nomESE: string;
  local: string;
  typePoste: string;
  missions: string;
  competences: string;
  domaine: string;
  salaire: number;
  statut: string;
  datePublication: string;
  id_rec: number;
}

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiUrl = 'http://localhost:5000/api/offres'; // L'URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les offres
  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl);
  }

  // Récupérer les offres d'un recruteur spécifique par ID
  getOffresByRecruteurId(recruteurId: number): Observable<Offre[]> {
    const url = `${this.apiUrl}?id_rec=${recruteurId}`;  // Assurez-vous que votre API prend en charge ce paramètre
    return this.http.get<Offre[]>(url);
  }

  // Exemple d'appel HTTP avec gestion des erreurs
  fetchOffres() {
    this.http.get<Offre[]>(this.apiUrl).subscribe(
      (data: Offre[]) => {
        console.log('Offres récupérées', data);
      },
      (error: any) => {  // Typage explicite de l'erreur
        console.error('Erreur lors du chargement des offres:', error);
      }
    );
  }
}
