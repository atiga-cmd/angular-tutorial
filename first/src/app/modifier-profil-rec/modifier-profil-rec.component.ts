import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { RecruteurService } from '../recruteur.service';
import { Recruteur } from '../models/recruteur.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Ajouté pour *ngIf, *ngFor, etc.

@Component({
  selector: 'app-modifier-profil-rec',
  templateUrl: './modifier-profil-rec.component.html',
  styleUrls: ['./modifier-profil-rec.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class ModifierProfilRecComponent implements OnInit {

  userId!: number;
  recruteur: Recruteur = {
    id_rec: 0,
    nomRec: '',
    prenomRec: '',
    emailRec: '',
    poste: '',
    entreprise: ''
  };

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = ''; // Nouveau champ

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recruteurService: RecruteurService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userId = +storedUserId; // Convertir en nombre
        this.loadRecruteurProfile();
      } else {
        console.error('Aucun ID utilisateur trouvé dans localStorage.');
      }
    } else {
      console.error('localStorage n\'est pas disponible dans cet environnement.');
    }
  }

  loadRecruteurProfile(): void {
    if (!this.userId) {
      console.error('User ID invalide.');
      return;
    }

    this.recruteurService.getRecruteurById(this.userId).subscribe(
      (data: Recruteur) => {
        this.recruteur = {
          id_rec: data.id_rec,
          nomRec: data.nomRec,
          prenomRec: data.prenomRec,
          emailRec: data.emailRec,
          poste: data.poste,
          entreprise: data.entreprise
        };
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil recruteur:', error);
      }
    );
  }

  onSaveProfile(): void {
    this.recruteurService.updateRecruteur(this.userId, this.recruteur).subscribe(
      () => {
        alert('Profil mis à jour avec succès.');
        this.router.navigate(['/profil-recruteur', this.userId]);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil:', error);
      }
    );
  }

  onChangePassword(): void {
    this.errorMessage = ''; // Réinitialise le message d’erreur à chaque tentative
  
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
  
    this.recruteurService.changePassword(this.userId, this.oldPassword, this.newPassword).subscribe(
      () => {
        alert('Mot de passe modifié avec succès.');
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      (error) => {
        console.error('Erreur lors du changement de mot de passe:', error);
        if (error.status === 400) {
          this.errorMessage = error.error.message || 'Erreur de validation';
        } else {
          this.errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
        }
      }
    );
  }
  

  onDeleteAccount(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      this.recruteurService.deleteRecruteur(this.userId).subscribe(
        () => {
          alert('Compte supprimé avec succès.');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erreur lors de la suppression du compte:', error);
        }
      );
    }
  }
}
