import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntreprisesService {
  private apiUrl = 'http://localhost:5000/api/entreprises';

  constructor(private http: HttpClient) {}

  getAllEntreprises(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEntrepriseById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addEntreprise(entreprise: any): Observable<any> {
    return this.http.post(this.apiUrl, entreprise);
  }

  updateEntreprise(id: string, entreprise: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, entreprise);
  }

  deleteEntreprise(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
