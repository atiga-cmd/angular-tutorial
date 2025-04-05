/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = 'http://localhost:5000/api/candidat'; // URL de ton backend

  constructor(private http: HttpClient) {}

  // Récupérer les informations du profil du candidat
  getProfilCandidat(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
*//*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private apiUrl = 'http://localhost:5000/api/candidat'; // ✅ Assure-toi que c'est la bonne URL

  constructor(private http: HttpClient) {}

  getProfil(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
*/import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private apiUrl = 'http://localhost:5000/api/candidats';

  constructor(private http: HttpClient) {}

  getProfilCandidat(id: number): Observable<any> {
    console.log("Appel API avec l'ID :", id); // 🔍 Vérifie l'ID envoyé à l'API
    return this.http.get(`${this.apiUrl}/${id}`);
}

}
