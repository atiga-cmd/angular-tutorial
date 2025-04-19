import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CandidatureService } from '../services/candidature.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-candidature',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
///////////////////

  candidatures: any[] = [];
  userId: number = 0;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = Number(id);
      this.chargerCandidatures();
    } else {
      this.errorMessage = 'Utilisateur non identifié. Veuillez vous reconnecter.';
    }
  }

  chargerCandidatures(): void {
    this.http.get<any[]>(`http://localhost:5000/api/candidatures/${this.userId}`)
      .subscribe({
        next: (data) => this.candidatures = data,
        error: (err) => {
          console.error('❌ Erreur récupération candidatures :', err);
          this.errorMessage = 'Impossible de charger vos candidatures.';
        }
      });
  }
  annulerCandidature(id: number): void {
    const confirmation = confirm("Êtes-vous sûr de vouloir annuler cette candidature ?");
    if (confirmation) {
      this.http.delete(`http://localhost:5000/api/candidatures/${id}`)
        .subscribe({
          next: () => {
            alert("❌ Candidature annulée !");
            this.candidatures = this.candidatures.filter(c => c.id_candidature !== id);
          },
          error: (err) => {
            console.error("Erreur lors de l'annulation :", err);
            alert("Erreur lors de l'annulation de la candidature.");
          }
        });
    }
  }
  
}
