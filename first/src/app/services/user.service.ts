import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getCandidatById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidat/${id}`);
  }

  getRecruteurById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recruteur/${id}`);
  }
}
