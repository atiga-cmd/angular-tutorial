import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CandidatService } from '../candidat.service';
import { Candidat } from '../models/candidat.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class ModifierProfilComponent implements OnInit {

  userId!: number;
  profil: Candidat = {
    id_cand: 0,
    nomCand: '',
    prenomCand: '',
    emailCand: '',
    dateNaiss: '',
    etat_civil: '',
    sexe: '',
    ville: '',
    codePostal: '',
    numTel: '',
    permis: '',
    niveauEducation: '',
    diplomeObtenu: '',
    etablissement: '',
    niveauExperience: '',
    statutActuel: '',
    langues: '',
    competences: '',
    posteDesire: '',
    lieuTravailSouhaite: ''
  };

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private candidatService: CandidatService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userId = +storedUserId;
        this.loadCandidatProfile();
      } else {
        console.error('Aucun ID utilisateur trouvé dans localStorage.');
      }
    } else {
      console.warn("Ce n'est pas un environnement navigateur. `localStorage` n'est pas accessible.");
    }
  }

  loadCandidatProfile(): void {
    this.candidatService.getCandidatById(this.userId).subscribe(
      (data: Candidat) => {
        this.profil = { ...data };
      },
      (error) => {
        console.error('Erreur chargement profil candidat :', error);
      }
    );
  }

  onSubmit(): void {
    this.candidatService.updateCandidat(this.userId, this.profil).subscribe(
      () => {
        alert('Profil mis à jour avec succès.');
        this.router.navigate(['/profil']);
      },
      (error) => {
        console.error('Erreur mise à jour du profil :', error);
      }
    );
  }

  onChangePassword(): void {
    this.errorMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.candidatService.changePassword(this.userId, this.oldPassword, this.newPassword).subscribe(
      () => {
        alert('Mot de passe modifié.');
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      (error) => {
        console.error('Erreur modification mot de passe :', error);
        this.errorMessage = error.status === 400 ? error.error.message : 'Erreur serveur';
      }
    );
  }

  onDeleteAccount(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.candidatService.deleteCandidat(this.userId).subscribe(
        () => {
          alert('Compte supprimé.');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erreur suppression de compte :', error);
        }
      );
    }
  }
}
