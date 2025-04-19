import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GererOffreService } from '../services/gerer-offre.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-modifier-offre',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],  // Importation des modules nécessaires
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit {

  
    idOffre!: number;
    idRecruteur: string | null = null;
  
    // Objet représentant l'offre à modifier
    offre: any = null;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private offreService: GererOffreService
    ) {}
    ngOnInit(): void {
      this.idRecruteur = localStorage.getItem('userId');
      console.log("🆔 ID du recruteur récupéré depuis localStorage :", this.idRecruteur); // 👈 debug ici
      this.idOffre = +this.route.snapshot.paramMap.get('id')!;
      this.chargerOffre();
    }
    // Récupérer les informations de l'offre à modifier
    chargerOffre(): void {
      this.offreService.getOffreById(this.idOffre).subscribe({
        next: (offre) => {
          this.offre = {
            typePoste: offre.typePoste,
            missions: offre.missions,
            salaire: offre.salaire,
            local: offre.local,
            competences: offre.competences,
            domaine: offre.domaine,
            nomESE: offre.nomESE,
            datePublication: offre.datePublication, // Assure-toi que c’est bien ce nom côté back
          };
        },
        error: (err) => {
          console.error('❌ Erreur lors du chargement de l\'offre :', err);
        }
      });
    }
  
    // Enregistrer les modifications
    onSubmit(): void {
      this.offreService.updateOffre(this.idOffre, this.offre).subscribe({
        next: () => {
          alert('✅ Offre modifiée avec succès.');
          this.router.navigate(['/gerer-offre']);
        },
        error: (err) => {
          console.error('❌ Erreur lors de la modification :', err);
        }
      });
    }
  }
  