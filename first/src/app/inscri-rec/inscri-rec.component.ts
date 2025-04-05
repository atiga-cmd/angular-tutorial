/*
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inscri-rec',
  standalone: true,
  templateUrl: './inscri-rec.component.html',
  styleUrls: ['./inscri-rec.component.css']
})
export class InscriRecComponent {
  inscriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.inscriptionForm = this.fb.group({
      nom: [''],
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      this.apiService.postData('recruteurs', this.inscriptionForm.value).subscribe(
        (response: any) => {
          console.log('Réponse:', response);
        },
        (error: any) => {
          console.error('Erreur:', error);
        }
      );
    }
  }
}
*/
import { AuthService } from '../services/auth.service';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecruteurService } from '../services/recruteur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscri-rec',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './inscri-rec.component.html',
  styleUrls: ['./inscri-rec.component.css']
})
export class InscriRecComponent {
  recruteur = {
    nomRec: '',
    prenomRec: '',
    emailRec: '',
    motPasse_rec: '',
    confirmer_motdepasse: '',
    poste: '',
    entreprise: ''
  };

  erreurMessage: string = '';
  successMessage: string = '';

  constructor(private recruteurService: RecruteurService, private router: Router) {}

  onSubmit() {
    this.erreurMessage = '';  
    this.successMessage = '';

    if (this.recruteur.motPasse_rec !== this.recruteur.confirmer_motdepasse) {
      this.erreurMessage = '❌ Les mots de passe ne correspondent pas.';
      return;
    }

    this.recruteurService.inscrireRecruteur(this.recruteur).subscribe(
      (response) => {
        console.log('✅ Recruteur inscrit avec succès', response);
        this.successMessage = '🎉 Inscription réussie ! Redirection en cours...';
        
        setTimeout(() => {
          this.router.navigate(['/se-connecter']);
        }, 2000);
      },
      (error) => {
        console.error('❌ Erreur lors de l’inscription', error);
        this.erreurMessage = '⚠️ Une erreur est survenue. Veuillez réessayer.';
      }
    );
  }
}
