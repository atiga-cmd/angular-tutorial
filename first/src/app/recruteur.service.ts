/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recruteur } from './models/recruteur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {
  private baseUrl = 'http://localhost:5000/api/recruteur';

  constructor(private http: HttpClient) {}

  getRecruteurById(id: number): Observable<Recruteur> {
    return this.http.get<Recruteur>(`${this.baseUrl}/${id}`);
  }

  updateRecruteur(id: number, recruteur: Recruteur): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, recruteur);
  }

  changePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/changer-motdepasse`, {
      oldPassword,
      newPassword
    });
  }

  deleteRecruteur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recruteur } from './models/recruteur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruteurService {
  private baseUrl = 'http://localhost:5000/api/recruteur';

  constructor(private http: HttpClient) {}

  getRecruteurById(id: number): Observable<Recruteur> {
    return this.http.get<Recruteur>(`${this.baseUrl}/${id}`);
  }

  updateRecruteur(id: number, recruteur: Recruteur): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, recruteur);
  }

  // Corrected the HTTP method to PUT for password change to match the backend
  changePassword(id: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/password/${id}`, { oldPassword, newPassword });
  }

  deleteRecruteur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
