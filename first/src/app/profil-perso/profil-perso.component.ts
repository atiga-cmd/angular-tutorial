import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-profil-perso',
  standalone: true,
  imports: [CommonModule, RouterModule],

  templateUrl: './profil-perso.component.html',
  styleUrls: ['./profil-perso.component.css']
})
export class ProfilPersoComponent implements OnInit {

  persoInfo: any;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.http.get(`http://localhost:5000/api/persoinfo/${id}`)
        .subscribe({
          next: data => this.persoInfo = data,
          error: err => {
            this.errorMessage = 'Erreur lors du chargement des informations personnelles.';
            console.error(err);
          }
        });
    } else {
      this.errorMessage = 'Utilisateur non identifié.';
    }
  }
}
