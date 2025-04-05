import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from '../services/candidat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-per',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Suppression de RouterLink
  templateUrl: './info-per.component.html',
  styleUrls: ['./info-per.component.css']
})
export class InfoPerComponent implements OnInit {  // ✅ Ajout de implements OnInit

  candidatId!: number;  // ✅ Ajout de la déclaration de la variable

  infoPer = {
    dateNaiss: '',
    sexe: '',
    etat_civil: '',
    ville: '',
    codePostal: null,
    permis: '',
    url_photo: '',
    numTel: ''
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
    const infoPerData = { ...this.infoPer, id_candidat: this.candidatId };

    this.candidatService.infoPerCandidat(infoPerData).subscribe(
      response => {
        console.log('Informations personnelles enregistrées', response);
        this.successMessage = 'Informations personnelles enregistrées avec succès!';
        this.router.navigate(['/info-pro', this.candidatId]); // ✅ Redirection avec l'ID
      },
      error => {
        console.error('Erreur lors de l\'enregistrement des informations personnelles', error);
        this.erreurMessage = 'Une erreur est survenue, veuillez réessayer.';
      }
    );
  }
}
