/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from '../services/candidat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-pro',
  standalone: true,
    imports: [FormsModule, CommonModule],  // Suppression de RouterLink
  
  templateUrl: './info-pro.component.html',
  styleUrls: ['./info-pro.component.css']
})
export class InfoProComponent {
  candidatId!: number;  // ✅ Ajout de la déclaration de la variable

  infoPro = {
    niveauEducation: '',
    diplomeObtenu: '',
    etablissement: '',
    niveauExperience: '',
    statutActuel: '',
    competences: '',
    langues: '',
    posteDesire: '',
    lieuTravailSouhaite: '',
    url_cv: ''
  };
/////

  erreurMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private candidatService: CandidatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du candidat depuis l'URL
    this.route.params.subscribe(params => {
      this.candidatId = +params['id']; // ✅ Correction : Stocker l'ID du candidat
    });
  }

  onSubmit(): void {
    const infoProData = { ...this.infoPro, id_candidat: this.candidatId };

    this.candidatService.infoProCandidat(infoProData).subscribe(
      response => {
        console.log('Informations professionnelles enregistrées', response);
        this.successMessage = 'Informations professionnelles enregistrées avec succès!';
        this.router.navigate(['/profil-rec', this.candidatId]); // ✅ Redirection avec l'ID
      },
      error => {
        console.error('Erreur lors de l\'enregistrement des informations professionnelles', error);
        this.erreurMessage = 'Une erreur est survenue, veuillez réessayer.';
      }
    );
  }
}
*/
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from '../services/candidat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-pro',
  standalone: true,
    imports: [FormsModule, CommonModule],  // Suppression de RouterLink
  
  templateUrl: './info-pro.component.html',
  styleUrls: ['./info-pro.component.css'],
  providers: [CandidatService] // ✅ Vérifier que le service est bien fourni
})
export class InfoProComponent implements OnInit {
  candidatId!: number;
  infoPro = {
    niveauEducation: '',
    diplomeObtenu: '',
    etablissement: '',
    niveauExperience: '',
    statutActuel: '',
    competences: '',
    langues: '',
    posteDesire: '',
    lieuTravailSouhaite: '',
    url_cv: ''
  };

  erreurMessage = '';
  successMessage = '';

  private route = inject(ActivatedRoute);  // ✅ Utilisation de `inject` pour éviter le problème d'injection
  private router = inject(Router);
  private candidatService = inject(CandidatService);  // ✅ Utilisation correcte pour un Standalone Component

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.candidatId = +params['id']; 
    });
  }

  onSubmit(): void {
    const infoProData = { ...this.infoPro, id_candidat: this.candidatId };

    this.candidatService.infoProCandidat(infoProData).subscribe(
      response => {
        console.log('Informations professionnelles enregistrées', response);
        this.successMessage = 'Informations professionnelles enregistrées avec succès!';
        this.router.navigate(['/se-connecter']); 
      },
      error => {
        console.error('Erreur lors de l\'enregistrement des informations professionnelles', error);
        this.erreurMessage = 'Une erreur est survenue, veuillez réessayer.';
      }
    );
  }
}
