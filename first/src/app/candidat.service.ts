import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from './models/candidat.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private baseUrl = 'http://localhost:5000/api/candidats';

  constructor(private http: HttpClient) {}

  // Obtenir les infos du candidat par ID
  getCandidatById(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.baseUrl}/${id}`);
  }

  // Mettre à jour le profil du candidat
  updateCandidat(id: number, candidat: Candidat): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, candidat);
  }

  // Modifier le mot de passe du candidat
  changePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/password`, {
      oldPassword,
      newPassword
    });
  }

  // Supprimer le compte du candidat
  deleteCandidat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
