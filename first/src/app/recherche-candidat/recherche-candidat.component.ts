import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-recherche-candidat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // تأكد من إضافة CommonModule و FormsModule للـ *ngIf, *ngFor, وngModel
  templateUrl: './recherche-candidat.component.html',
  styleUrl: './recherche-candidat.component.css'
})
export class RechercheCandidatComponent {
  competence: string = '';
  posteDesire: string = '';
  candidats: any[] = [];  // تهيئة المتغير كمصفوفة فارغة
  rechercheEffectuee: boolean = false;
//


// 🔥 Voici ce qu’il manquait 🔥
idRecruteur: number = 1;                   // Simuler l'id du recruteur connecté (à remplacer dynamiquement plus tard)

  constructor(private http: HttpClient) { }

  rechercher(): void {
    if (!this.competence && !this.posteDesire) {
      alert('Veuillez entrer une compétence ou un poste désiré pour effectuer la recherche.');
      return;
    }
    
    const params = {
      competence: this.competence,
      posteDesire: this.posteDesire
    };
    
    this.http.get<any[]>('http://localhost:5000/api/recherche-candidats', { params }).subscribe({
      next: (data) => {
        this.candidats = data;
        this.rechercheEffectuee = true;
      },
      error: (error) => {
        console.error('Erreur lors de la recherche de candidats :', error);
        alert('Erreur lors de la recherche. Veuillez réessayer.');
      }
    });
  }
  
  
}
