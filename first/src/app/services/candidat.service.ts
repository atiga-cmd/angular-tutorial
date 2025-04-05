/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiUrl = 'http://localhost:5000/api/candidats';  

  constructor(private http: HttpClient) {}

  inscrireCandidat(candidat: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, candidat);
  }

  getCandidats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
*//*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private apiUrl = 'http://localhost:5000/api';  // URL de ton backend

  constructor(private http: HttpClient) {}

  // Inscrire un candidat
  inscrireCandidat(candidat: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/candidats`, candidat);
  }

  // Obtenir la liste des candidats
  getCandidats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidats`);
  }

  // Soumettre les informations personnelles
  infoPerCandidat(infoPer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/info-per`, infoPer);
  }

  // Soumettre les informations professionnelles
  infoProCandidat(infoPro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/info-pro`, infoPro);
  }
}
*/
// src/app/services/candidat.service.ts
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  private apiUrl = 'http://localhost:5000/api';  // URL de ton backend

  constructor(private http: HttpClient) {}

  // Soumettre les informations d'inscription du candidat
  inscrireCandidat(candidat: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/candidats`, candidat);
  }

  // Soumettre les informations personnelles
  infoPerCandidat(infoPer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/info-per`, infoPer);
  }

  // Soumettre les informations professionnelles
  infoProCandidat(infoPro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/info-pro`, infoPro);
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // ✅ Permet d'éviter d'importer le service partout
})
export class CandidatService {
  private apiUrl = 'http://localhost:5000/api';  

  constructor(private http: HttpClient) {}

  inscrireCandidat(candidat: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/candidats`, candidat);
  }

  infoPerCandidat(infoPer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/info-per`, infoPer);
  }

  infoProCandidat(infoPro: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/info-pro`, infoPro);
  }
  
}

