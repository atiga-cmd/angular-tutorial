import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GererOffreService {
  private apiUrl = 'http://localhost:5000/api'; // URL de ton backend

  constructor(private http: HttpClient) {}

  // Récupérer les offres par recruteur
  getOffresByRecruteur(idRecruteur: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/offres/recruteur/${idRecruteur}`);
  }

  // Supprimer une offre
  supprimerOffre(idOffre: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/supprimer/${idOffre}`);
  }

  getOffreById(id: number) {
    return this.http.get<any>(`http://localhost:5000/api/offre/${id}`);
  }
  
  updateOffre(id: number, data: any) {
    return this.http.put(`http://localhost:5000/api/modifier/${id}`, data);
  }
  
  
}
