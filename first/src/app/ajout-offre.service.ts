/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjoutOffre {

  private apiUrl = 'http://localhost:5000/api/offre'; // L'URL de ton API

  constructor(private http: HttpClient) { }

  ajouterOffre(offre: any): Observable<any> {
    return this.http.post(this.apiUrl, offre);
  }
}
*/import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface représentant une offre
export interface Offre {
  nomEntreprise: string;
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
export class AjoutOffreService {

  private apiUrl = 'http://localhost:5000/api/offre'; // L'URL de ton API

  constructor(private http: HttpClient) { }

  ajouterOffre(offre: Offre): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, offre, { headers }).pipe(
      catchError(this.handleError)  // Gestion des erreurs
    );
  }

  // Méthode pour gérer les erreurs
  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (error.error && error.error.error) {
        // Vérifie si l'API renvoie un champ 'error'
        errorMessage = error.error.error;
      } else {
        errorMessage = `Code erreur: ${error.status}\nMessage: ${error.message}`;
      }
    }

    // Afficher l'erreur dans la console
    console.error('Erreur dans le service AjoutOffreService:', errorMessage);
    
    // Assurez-vous que l'erreur est aussi retournée pour que l'UI puisse la capturer
    return throwError(errorMessage);  // Retourne l'erreur sous forme d'observable
  }
}
