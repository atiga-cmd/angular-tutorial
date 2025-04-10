/*import { RouterModule } from '@angular/router';
import { OffreService } from '../services/offres.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mes-offres',
  templateUrl: './mes-offres.component.html',
  styleUrls: ['./mes-offres.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})

export class MesOffresComponent implements OnInit {
  offres: any[] = []; // Tableau pour stocker les offres

  constructor(private offreService: OffreService) {}

  ngOnInit(): void {
    this.loadOffres(); // Charger les offres dès l'initialisation
  }

  loadOffres(): void {
    this.offreService.getOffres().subscribe(
      (data) => {
        this.offres = data; // Récupérer les données des offres via le service
      },
      (error) => {
        console.error('Erreur lors du chargement des offres:', error);
      }
    );
  }
}
*/import { RouterModule } from '@angular/router';
import { OffreService } from '../services/offres.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mes-offres',
  templateUrl: './mes-offres.component.html',
  styleUrls: ['./mes-offres.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})

export class MesOffresComponent implements OnInit {
  offres: any[] = []; // Tableau pour stocker les offres
  userId: string | null = null; // ID du recruteur

  constructor(private offreService: OffreService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId'); // Récupérer l'ID du recruteur depuis localStorage

    if (this.userId) {
      this.loadOffres(); // Charger les offres pour le recruteur
    }
  }

  loadOffres(): void {
    const id = Number(this.userId);
    if (id) {
      this.offreService.getOffresByRecruteurId(id).subscribe(
        (data) => {
          this.offres = data; // Récupérer les données des offres via le service
        },
        (error) => {
          console.error('Erreur lors du chargement des offres:', error);
        }
      );
    }
  }
}
