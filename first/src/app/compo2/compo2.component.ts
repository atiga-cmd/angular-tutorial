/*
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importer CommonModule
import { FormsModule } from '@angular/forms'; // ✅ Importer FormsModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compo2',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Ajouter les modules nécessaires
  templateUrl: './compo2.component.html',
  styleUrls: ['./compo2.component.css']
})
export class Compo2Component {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const userData = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:5000/api/auth', userData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        if (response.type === 'candidat') {
          this.router.navigate(['/profil', response.id]);
          localStorage.setItem('userId',response.id); 
          
          // Redirection candidat
        } else if (response.type === 'recruteur') {
          localStorage.setItem('userId',response.id);
          this.router.navigate(['/profil-recruteur', response.id]); // Redirection recruteur
        }
        
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else {
          this.errorMessage = error.error.message || 'Erreur lors de la connexion.';
        }
        console.error('Erreur de connexion:', error);
      }
    });
 
  }



}

*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compo2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compo2.component.html',
  styleUrls: ['./compo2.component.css']
})
export class Compo2Component {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const userData = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:5000/api/auth', userData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        localStorage.setItem('userId', response.id);

        if (response.type === 'candidat') {
          this.router.navigate(['/profil', response.id]); // ✅ Redirection candidat
        } else if (response.type === 'recruteur') {
          this.router.navigate(['/profil-recruteur', response.id]); // ✅ Redirection recruteur
        } else if (response.type === 'admin') {
          this.router.navigate(['/admin', response.id]); // ✅ Redirection admin
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else {
          this.errorMessage = error.error.message || 'Erreur lors de la connexion.';
        }
        console.error('Erreur de connexion:', error);
      }
    });
  }
}
