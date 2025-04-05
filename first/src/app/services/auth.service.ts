/*

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ id: number; type: string }>(`${this.apiUrl}/login`, { email, password });
  }

  redirectUser(user: { id: number; type: string }) {
    if (user.type === 'candidat') {
      this.router.navigate(['/profil', user.id]); // 🔗 Redirige vers le profil candidat
    } else if (user.type === 'recruteur') {
      this.router.navigate(['/profil-rec', user.id]); // 🔗 Redirige vers le profil recruteur
    }
  }


}
*/

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
//
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // ✅ Remplace par l'URL de ton backend

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient // ✅ Injection de HttpClient
  ) {}

  getUserEmail(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('email') : null;
  }

  getUserId(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('userId') : null;
  }

  getUserType(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('userType') : null;
  }

  setUserData(email: string, userId: string, userType: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('email', email);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userType', userType);
    }
  }

  // ✅ Correction : Injection de HttpClient
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  clearUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      localStorage.removeItem('userType');
    }
  }
}
