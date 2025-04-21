import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-info-candidat',
standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './info-candidat.component.html',
  styleUrl: './info-candidat.component.css'
})
export class InfoCandidatComponent implements OnInit {

  
    idCandidat!: number;
    perso: any;
    pro: any;
    userId: number = 0;

    constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.idCandidat = Number(this.route.snapshot.paramMap.get('id'));
      this.userId = Number(this.route.snapshot.paramMap.get('userId'));  // Récupère userId correctement
      console.log('idCandidat:', this.idCandidat);
      console.log('userId:', this.userId);  // Vérifiez que userId est récupéré correctement
    
      this.http.get(`http://localhost:5000/api/candidats/${this.idCandidat}`).subscribe({
        next: (data) => this.perso = data,
        error: (err) => console.error('Erreur chargement infos personnelles:', err)
      });
    
      this.http.get(`http://localhost:5000/api/candidats/${this.idCandidat}`).subscribe({
        next: (data) => this.pro = data,
        error: (err) => console.error('Erreur chargement infos professionnelles:', err)
      });
    }
    
  
    supprimerCandidat() {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce candidat ?")) {
        this.http.delete(`http://localhost:5000/api/candidats/${this.idCandidat}`).subscribe({
          next: () => {
            alert("✅ Candidat supprimé avec succès.");
            this.router.navigate(['/voir-candidat']);
          },
          error: (err) => {
            console.error("Erreur suppression candidat :", err);
            alert("❌ Erreur lors de la suppression du candidat.");
          }
        });
      }
    }
  }
  

