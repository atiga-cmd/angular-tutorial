/*

import { Component } from '@angular/core';
import { CandidatService } from '../services/candidat.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscri-candidat',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Suppression de RouterLink
  templateUrl: './inscri-candidat.component.html',
  styleUrls: ['./inscri-candidat.component.css']
})
export class InscriCandidatComponent {
  candidat = {
    nomCand: '',
    prenomCand: '',
    emailCand: '',
    motPasse_cand: '',
    confirmer_motdepasse: ''
  };

    erreurMessage = '';
    successMessage = '';
  
    constructor(private candidatService: CandidatService, private router: Router) {}
  
    onSubmit() {
      this.erreurMessage = '';
      this.successMessage = '';
  
      if (this.candidat.motPasse_cand !== this.candidat.confirmer_motdepasse) {
        this.erreurMessage = 'Les mots de passe ne correspondent pas.';
        return;
      }
  
      this.candidatService.inscrireCandidat(this.candidat).subscribe(
        (response) => {
          console.log('Candidat inscrit avec succès', response);
          this.successMessage = 'Inscription réussie ! Redirection en cours...';
        // this.router.navigate(['/info-per']);
        /*  setTimeout(() => {
            this.router.navigate(['/se-connecter']);
          }, 2000);*/
        
        /*  this.router.navigate(['/info-per', response.id_candidat]); // 🔄 Redirection vers info-per

        },
        (error) => {
          console.error('Erreur lors de l’inscription', error);
          this.erreurMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      );
    }
  }
  */
  
/*
import { Component } from '@angular/core';
import { CandidatService } from '../services/candidat.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscri-candidat',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Suppression de RouterLink
  templateUrl: './inscri-candidat.component.html',
  styleUrls: ['./inscri-candidat.component.css']
})
  export class InscriptionCandidatComponent {
    candidat = {
      nomCand: '',
      prenomCand: '',
      emailCand: '',
      motPasse_cand: '',
      confirmer_motdepasse: ''
    };
  
    erreurMessage = '';
    successMessage = ''; // ✅ Ajout de la propriété

    constructor(private candidatService: CandidatService, private router: Router) {}
  
    onSubmit() {
      this.candidatService.inscrireCandidat(this.candidat).subscribe(
        (response: any) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/info-per', response.id_candidat]); // 🔄 Redirection vers info-per
        },
        (error) => {
          console.error('Erreur lors de l’inscription', error);
          this.erreurMessage = 'Une erreur est survenue.';
        }
      );
    }
  }
  */
  import { Component } from '@angular/core';
  import { CandidatService } from '../services/candidat.service';
  import { Router } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  
  @Component({
    selector: 'app-inscri-candidat',
    standalone: true,
    imports: [FormsModule, CommonModule],  // Suppression de RouterLink
    templateUrl: './inscri-candidat.component.html',
    styleUrls: ['./inscri-candidat.component.css']
  })
  export class InscriptionCandidatComponent {
    candidat = {
      nomCand: '',
      prenomCand: '',
      emailCand: '',
      motPasse_cand: '',
      confirmer_motdepasse: '',
    };
    erreurMessage = '';
    successMessage = '';
  
    constructor(private candidatService: CandidatService, private router: Router) {}
  
    onSubmit(): void {
      this.erreurMessage = '';
      this.successMessage = '';
  
      this.candidatService.inscrireCandidat(this.candidat).subscribe(
        (response: any) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/info-per', response.id_candidat]); // Redirection vers info-per
        },
        (error) => {
          console.error('Erreur lors de l’inscription', error);
          this.erreurMessage = 'Une erreur est survenue lors de l’inscription.';
        }
      );
    }
  }