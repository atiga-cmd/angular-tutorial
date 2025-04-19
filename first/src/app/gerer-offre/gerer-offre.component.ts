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
    offres: any[] = [];
    userId: string | null = null;  // Déclaration correcte de userId
  
    constructor(
      private offreService: GererOffreService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      // Récupération de l'ID du recruteur depuis le localStorage
      this.userId = localStorage.getItem('userId');  // Récupération correcte
  
      // Vérifier si l'ID est bien présent
      if (this.userId) {
        const idRecruteur = Number(this.userId); // Conversion en number si nécessaire
        this.offreService.getOffresByRecruteur(idRecruteur).subscribe({
          next: (data) => {
            this.offres = data;
            console.log('✅ Offres reçues :', data);
          },
          error: (error) => {
            console.error('❌ Erreur lors du chargement des offres :', error);
          }
        });
      } else {
        console.warn('Aucun ID recruteur trouvé dans le localStorage.');
      }
    }
  
    // Méthode pour gérer la modification d'une offre
    modifierOffre(id: number): void {
      this.router.navigate(['/modifier-offre', id]);
    }
  
    // Méthode pour gérer la suppression d'une offre
    // Méthode pour gérer la suppression d'une offre avec confirmation
  supprimerOffre(id: number): void {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?");
    if (confirmation) {
      this.offreService.supprimerOffre(id).subscribe({
        next: () => {
          this.offres = this.offres.filter((offre) => offre.id_offre !== id);
          alert('✅ Offre supprimée avec succès');
          console.log('✅ Offre supprimée');
        },
        error: (err) => {
          console.error('❌ Erreur lors de la suppression de l\'offre :', err);
        }
      });
    } else {
      console.log('❌ Suppression annulée');
    }
  }
  }