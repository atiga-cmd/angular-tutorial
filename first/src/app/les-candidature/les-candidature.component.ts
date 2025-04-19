import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OffreService } from '../services/offres.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Si tu utilises ngModel dans ton formulaire
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';  // Importation du service UserService

@Component({
  selector: 'app-les-candidature',
  imports: [CommonModule, RouterModule, FormsModule], // Importation des modules nécessaires
  templateUrl: './les-candidature.component.html',
  styleUrls: ['./les-candidature.component.css']
})
export class LesCandidatureComponent implements OnInit {
    candidatures: any[] = [];
    recruteur: any;
    userId: string | null = null; // 🔥 ajouter cette ligne
    apiUrl: string = 'http://localhost:5000/api';
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.userId = localStorage.getItem('userId'); // 🔥 lire localStorage ici
    
      const id = Number(this.userId);
      console.log('userId', id);
    
      if (this.userId) {
        this.getCandidatures(); // ✅ APPEL ICI
      }
    }
    
  
    getCandidatures(): void {
      this.http.get<any[]>(`${this.apiUrl}/candidatures-recu/${this.userId}`).subscribe({
        next: (data) => {
          this.candidatures = data;
        },
        error: (err) => {
          console.error("❌ Erreur lors de la récupération des candidatures :", err);
        }
      });
    }
  }

