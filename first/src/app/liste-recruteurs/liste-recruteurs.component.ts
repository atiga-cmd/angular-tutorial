import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GererOffreService } from '../services/gerer-offre.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste-recruteurs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './liste-recruteurs.component.html',
  styleUrl: './liste-recruteurs.component.css'
})
export class ListeRecruteursComponent implements OnInit {
  recruteurs: any[] = [];
  userId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.chargerRecruteurs();
  }

  chargerRecruteurs() {
    this.http.get<any[]>('http://localhost:5000/api/recruteurs').subscribe({
      next: (data) => this.recruteurs = data,
      error: (err) => console.error('Erreur chargement recruteurs:', err)
    });
  }

  supprimerRecruteur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce recruteur ?')) {
      this.http.delete(`http://localhost:5000/api/recruteur/${id}`).subscribe(() => {
        this.recruteurs = this.recruteurs.filter(r => r.id_rec !== id);
      });
    }
  }
}