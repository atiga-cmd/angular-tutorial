import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {
  private apiUrl = 'http://localhost:5000/api/recruteurs';

  constructor(private http: HttpClient) {}

  inscrireRecruteur(recruteur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, recruteur);
  }
}
