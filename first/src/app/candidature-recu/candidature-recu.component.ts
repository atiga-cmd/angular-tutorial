import { RouterModule } from '@angular/router';
import { OffreService } from '../services/offres.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Si tu utilises ngModel dans ton formulaire
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';  // Importation du service UserService

@Component({
  selector: 'app-candidature-recu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Importation des modules nécessaires
  templateUrl: './candidature-recu.component.html',
  styleUrls: ['./candidature-recu.component.css']
})
export class CandidatureRECUComponent implements OnInit {
  recruteur: any;  // Déclaration du profil recruteur
  userId: string | null = null; // ID de l'utilisateur

  constructor(
    private userService: UserService,  // Injection du service UserService
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId'); // Récupération de l'ID depuis le localStorage

    if (this.userId) {
      const id = Number(this.userId);  // Conversion de l'ID en nombre
      console.log('userId', id);

      if (id) {
        this.userService.getRecruteurById(id).subscribe(
          (data) => {
            this.recruteur = data;  // Stocke le profil recruteur
          },
          (error) => {
            console.error('Erreur lors de la récupération du profil recruteur', error);
          }
        );
      }
    }
  }

  // Logique pour accepter la candidature
  accepterCandidature(): void {
    console.log('Candidature acceptée');
  }

  // Logique pour refuser la candidature
  refuserCandidature(): void {
    console.log('Candidature refusée');
  }

  // Logique pour voir les détails de la candidature
  voirDetails(): void {
    console.log('Affichage des détails de la candidature');
  }
}
