import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';  // Assurez-vous d'importer le service UserService
import { ActivatedRoute } from '@angular/router';  // Pour lire les paramètres de l'URL

@Component({
  selector: 'app-modifier-offre',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],  // Importation des modules nécessaires
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit {

  // Propriétés de l'offre
  poste: string = '';
  missions: string = '';
  salaire: number = 0;
  lieu: string = '';
  profil: string = '';
  nomEntreprise: string = '';
  tel: string = '';
  adresse: string = '';
  ville: string = '';
  siteWeb: string = '';
  domaine: string = '';
  datePublication: string = '';  // Propriété pour la date de publication

  recruteur: any;
  userId: string | null = null; // ID utilisateur

  constructor(
    private userService: UserService,  // Injection du service pour récupérer le recruteur
    private route: ActivatedRoute  // Injection de ActivatedRoute pour les paramètres de l'URL
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du recruteur depuis le localStorage
    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      const id = Number(this.userId);
      console.log('userId', id);

      // Récupérer les données du recruteur
      this.userService.getRecruteurById(id).subscribe(
        (data) => {
          this.recruteur = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération du profil recruteur', error);
        }
      );
    }
  }

  // Méthode pour soumettre le formulaire d'offre
  onSubmit(): void {
    console.log('Formulaire soumis avec les données:', {
      poste: this.poste,
      missions: this.missions,
      salaire: this.salaire,
      lieu: this.lieu,
      profil: this.profil,
      nomEntreprise: this.nomEntreprise,
      tel: this.tel,
      adresse: this.adresse,
      ville: this.ville,
      siteWeb: this.siteWeb,
      domaine: this.domaine,
      datePublication: this.datePublication,  // Inclusion de la date
    });
  }
}
