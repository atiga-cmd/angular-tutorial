/*import { Component, OnInit } from '@angular/core';
import { RechercheOffreService } from '../recherche-offre.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recherche-offres',
  standalone: true,
  templateUrl: './recherche-offre.component.html',
  styleUrls: ['./recherche-offre.component.css'],
  imports: [FormsModule, RouterModule, CommonModule],
  providers: [RechercheOffreService]
})
export class RechercheOffresComponent implements OnInit {
  motCle: string = '';
  local: string = '';
  offres: any[] = [];
  userId: number = 0;

  constructor(private rechercheOffreService: RechercheOffreService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = Number(id);
    } else {
      alert("Erreur : aucun utilisateur connecté.");
    }
  }

  rechercher(): void {
    this.rechercheOffreService.rechercherOffres(this.motCle, this.local)
      .subscribe({
        next: data => this.offres = data,
        error: err => console.error('Erreur lors de la recherche des offres', err)
      });
  }

  postuler(offre: any): void {
    if (!this.userId) {
      alert("Erreur : utilisateur non identifié.");
      return;
    }

    const confirmation = confirm(`Voulez-vous postuler à l'offre "${offre.nomESE}" ?`);
    if (confirmation) {
      const date = new Date().toISOString(); // Date actuelle
      this.rechercheOffreService.postuler(this.userId, offre.id_offre, date)
        .subscribe({
          next: () => alert('Candidature envoyée avec succès !'),

          error: err => {
            alert('Erreur lors de l\'enregistrement de la candidature');
            console.error(err);
          }
        });
    }
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { RechercheOffreService } from '../recherche-offre.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-recherche-offres',
  standalone: true,
  templateUrl: './recherche-offre.component.html',
  styleUrls: ['./recherche-offre.component.css'],
  imports: [FormsModule, RouterModule, CommonModule],
  providers: [RechercheOffreService]
})
export class RechercheOffresComponent implements OnInit {
  motCle: string = '';
  local: string = '';
  offres: any[] = [];
  userId: number = 0;

  constructor(
    private rechercheOffreService: RechercheOffreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = Number(id);
    } else {
      alert("Erreur : aucun utilisateur connecté.");
    }
  }

  rechercher(): void {
    this.rechercheOffreService.rechercherOffres(this.motCle, this.local)
      .subscribe({
        next: data => this.offres = data,
        error: err => console.error('Erreur lors de la recherche des offres', err)
      });
  }

  postuler(offre: any): void {
    if (!this.userId) {
      alert("Erreur : utilisateur non identifié.");
      return;
    }

    const confirmation = confirm(`Voulez-vous postuler à l'offre "${offre.nomESE}" ?`);
    if (confirmation) {
      const date = new Date().toISOString();
      this.rechercheOffreService.postuler(this.userId, offre.id_offre, date)
        .subscribe({
          next: () => {
            alert('Candidature envoyée avec succès !');
            this.router.navigate(['/candidatures']); // Redirection ici ✅
          },
          error: err => {
            alert('Erreur lors de l\'enregistrement de la candidature');
            console.error(err);
          }
        });
    }
  }
}