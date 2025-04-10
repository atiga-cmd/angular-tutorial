import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GererOffreService } from '../services/gerer-offre.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerer-offre',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gerer-offre.component.html',
  styleUrls: ['./gerer-offre.component.css']
})
export class GererOffreComponent implements OnInit {

  offers: any[] = [];
  // Ajout de la propriété userId pour que le template y ait accès
  public userId: string | null = null;

  constructor(
    private router: Router,
    private gererOffreService: GererOffreService
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID du recruteur depuis le localStorage
    this.userId = localStorage.getItem('userId');

    // Récupérer la liste des offres depuis le service
    this.gererOffreService.getOffres().subscribe(
      (data) => {
        this.offers = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des offres', error);
      }
    );
  }

  // Méthode pour supprimer une offre
  onDeleteOffer(offerId: number): void {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer cette offre ?')) {
      this.gererOffreService.deleteOffre(offerId).subscribe(
        () => {
          console.log('Offre supprimée avec ID:', offerId);
          this.offers = this.offers.filter(offer => offer.id !== offerId);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'offre', error);
        }
      );
    }
  }

  // Méthode pour rediriger vers la page de modification de l'offre
  onEditOffer(offerId: number): void {
    this.router.navigate(['/modifier-offre', offerId]);
  }
}
