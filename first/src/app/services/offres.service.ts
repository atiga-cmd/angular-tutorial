import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffresService {
  private apiUrl = 'http://localhost:5000/api/offres';

  constructor(private http: HttpClient) {}

  getAllOffres(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOffreById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addOffre(offre: any): Observable<any> {
    return this.http.post(this.apiUrl, offre);
  }

  updateOffre(id: string, offre: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, offre);
  }

  deleteOffre(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
