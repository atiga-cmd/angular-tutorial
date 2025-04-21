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
  }*/
    import { Component } from '@angular/core';
    import { CandidatService } from '../services/candidat.service';
    import { Router } from '@angular/router';
    import { FormsModule } from '@angular/forms';
    import { CommonModule } from '@angular/common';
    
    @Component({
      selector: 'app-inscri-candidat',
      standalone: true,
      imports: [FormsModule, CommonModule],
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
    
      constructor(
        private candidatService: CandidatService,
        private router: Router
      ) {}
    
      onSubmit(): void {
        this.erreurMessage = '';
        this.successMessage = '';
    
        // ✅ Vérification des mots de passe
        if (this.candidat.motPasse_cand !== this.candidat.confirmer_motdepasse) {
          this.erreurMessage = '❌ Les mots de passe ne correspondent pas.';
          return;
        }
    
        // ✅ Envoi au service d'inscription
        this.candidatService.inscrireCandidat(this.candidat).subscribe(
          (response: any) => {
            console.log('✅ Inscription réussie', response);
            this.successMessage = '🎉 Inscription réussie !';
            setTimeout(() => {
              this.router.navigate(['/info-per', response.id_candidat]);
            }, 1500);
          },
          (error) => {
            console.error('❌ Erreur lors de l’inscription', error);
            if (error.error?.message) {
              this.erreurMessage = `⚠️ ${error.error.message}`;
            } else {
              this.erreurMessage = 'Une erreur est survenue lors de l’inscription.';
            }
          }
        );
      }
    }
    