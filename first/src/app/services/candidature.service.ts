import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private apiUrl = 'http://localhost:5000/api/candidatures';  // Change URL if needed

  constructor(private http: HttpClient) { }

  // Apply for a job offer
  postuler(id_candidat: number, id_offre: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/postuler`, { id_candidat, id_offre });
  }

  // Get all candidatures for a candidate
  getCandidaturesByCandidat(id_candidat: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidat/${id_candidat}`);
  }

  // Delete a candidature
  deleteCandidature(id_candidature: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/supprimer/${id_candidature}`);
  }

  // Get all candidatures
  getAllCandidatures(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
