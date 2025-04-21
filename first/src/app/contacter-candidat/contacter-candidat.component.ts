import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contacter-candidat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contacter-candidat.component.html',
  styleUrl: './contacter-candidat.component.css'

})
export class ContacterCandidatComponent implements OnInit {
  idCandidat!: number;
  candidat: any;
  infoPerso: any;
  infoPro: any;
  message: string = '';
  userId: string | null = null;
  recruteur: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.idCandidat = +this.route.snapshot.paramMap.get('id')!;
    this.chargerInfos(); // ✅ on charge les infos du candidat

    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      const id = Number(this.userId);
      console.log('userId', id);

      this.userService.getRecruteurById(id).subscribe(
        (data) => {
          this.recruteur = data;
          console.log('Recruteur chargé :', this.recruteur);
        },
        (error) => {
          console.error('Erreur lors de la récupération du profil recruteur', error);
        }
      );
    } else {
      console.warn("Aucun userId trouvé dans le localStorage !");
    }
  }

  chargerInfos() {
    this.http.get<any>(`http://localhost:5000/api/candidat-info/${this.idCandidat}`).subscribe(data => {
      this.candidat = data.candidat;
      this.infoPerso = data.infoPerso;
      this.infoPro = data.infoPro;
    });
  }

  envoyerMessage() {
    if (!this.message) {
      alert("Veuillez entrer un message.");
      return;
    }

    if (!this.recruteur || !this.recruteur.id_rec) {
      alert("Erreur : recruteur non chargé !");
      return;
    }

    const payload = {
      id_candidat: this.idCandidat,
      id_rec: this.recruteur.id_rec,
      contenu: this.message
    };

    this.http.post('http://localhost:5000/api/envoyer-message', payload).subscribe(() => {
      alert("Message envoyé !");
      this.message = '';
    });
  }
}
