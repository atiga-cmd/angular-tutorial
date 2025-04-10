import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';  // Service pour récupérer les données de l'utilisateur
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-profil-rec',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],  // Importation des modules nécessaires
  templateUrl: './modifier-profil-rec.component.html',
  styleUrls: ['./modifier-profil-rec.component.css']
})
export class ModifierProfilRecComponent implements OnInit {
  recruteur: any = {
    nom: '',
    prenom: '',
    email: '',
    poste: '',
    entreprise: ''
  };

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  userId: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID utilisateur dans le localStorage
    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      const id = Number(this.userId);
      console.log('userId', id);

      // Récupérer les données du recruteur via le service
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

  onSaveProfile(): void {
    console.log('Profil enregistré', this.recruteur);
    // Appeler ton service pour sauvegarder les modifications du profil en BDD
    // Exemple : this.userService.saveRecruteur(this.recruteur);
  }

  onChangePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    console.log('Mot de passe changé');
    // Appeler ton service pour changer le mot de passe
    // Exemple : this.userService.changePassword(this.oldPassword, this.newPassword);
  }

  onDeleteAccount(): void {
    if (confirm('Êtes-vous sûr(e) de vouloir supprimer votre compte ?')) {
      console.log('Compte supprimé');
      // Appeler ton service pour supprimer le compte
      // Exemple : this.userService.deleteAccount(this.userId);
    }
  }
}
