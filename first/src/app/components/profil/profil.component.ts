import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  
})
export class ProfilComponent implements OnInit {
  profil: any;
  errorMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient) {}
  ngOnInit() {
    const id = Number(localStorage.getItem('userId')); 
  
    if (id) {
      this.http.get(`http://localhost:5000/api/candidat/${id}`)
        .subscribe({
          next: (data) => {
            console.log("✅ Données du candidat :", data);
            this.profil = data;
          },
          error: (error) => {
            console.error("❌ Erreur de récupération du profil :", error);
            this.errorMessage = "Impossible de charger le profil.";
          }
        });
    } else {
      this.errorMessage = "Aucun email trouvé, veuillez vous reconnecter.";
    }
  }
}  