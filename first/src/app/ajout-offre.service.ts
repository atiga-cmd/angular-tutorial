import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjoutOffre {

  private apiUrl = 'http://localhost:5000/api/offre'; // L'URL de ton API

  constructor(private http: HttpClient) { }

  ajouterOffre(offre: any): Observable<any> {
    return this.http.post(this.apiUrl, offre);
  }
}
