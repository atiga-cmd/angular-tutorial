// recherche-offre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechercheOffreService {

  private apiUrl = 'http://localhost:5000/api/recherche-offres';

  constructor(private http: HttpClient) { }

  // Recherche des offres par compétence et localisation
  rechercherOffres(competence: string, localisation: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?competence=${competence}&localisation=${localisation}`);
  }

  // Enregistrer la candidature
  postuler(idCandidat: number, idOffre: number, date: string): Observable<any> {
    return this.http.post('http://localhost:5000/api/candidatures', {
      id_candidat: idCandidat,
      id_offre: idOffre,
      date: date
    });
  }
}
