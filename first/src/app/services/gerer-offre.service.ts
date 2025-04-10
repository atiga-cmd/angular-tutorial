import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Service global accessible dans toute l'application
})
export class GererOffreService {

  private apiUrl = 'http://localhost:5000/api/offres';  // L'URL de l'API pour récupérer les offres
  constructor(private http: HttpClient) { }

  // Récupérer toutes les offres
  getOffres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/offres`);
  }

  // Récupérer une offre par son ID
  getOffreById(offerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/offres/${offerId}`);
  }

  // Ajouter une nouvelle offre
  addOffre(offre: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/offres`, offre);
  }

  // Modifier une offre
  updateOffre(offerId: number, offre: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/offres/${offerId}`, offre);
  }

  // Supprimer une offre
  deleteOffre(offerId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/offres/${offerId}`);
  }
}