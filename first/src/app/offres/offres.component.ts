import { Component, OnInit } from '@angular/core';
import { OffreService, Offre } from '../services/offres.service'; // Assure-toi que le chemin d'importation est correct

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule], // Import du CommonModule pour ngFor
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
  

  export class OffresComponent implements OnInit {
    offres: Offre[] = [];
    errorMessage: string = '';
  
    constructor(private offreService: OffreService) {}
  
    ngOnInit(): void {
      this.getOffres();
    }
  
    // Appel au service pour récupérer les offres
    getOffres(): void {
      this.offreService.getOffres().subscribe(
        (data: Offre[]) => {
          this.offres = data;
          console.log('Offres récupérées', data);
        },
        (error) => {
          this.errorMessage = 'Erreur lors du chargement des offres';
          console.error('Erreur lors du chargement des offres:', error);
        }
      );
    }
  }
  