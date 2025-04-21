import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GererOffreService } from '../services/gerer-offre.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-liste-candidats',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './liste-candidats.component.html',
  styleUrl: './liste-candidats.component.css'
})
export class ListeCandidatsComponent implements OnInit{
  candidats: any[] = [];
  userId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.chargerCandidats();
  }

  chargerCandidats() {
    this.http.get<any[]>('http://localhost:5000/api/candidats').subscribe({
      next: (data) => this.candidats = data,
      error: (err) => console.error('Erreur chargement candidats:', err)
    });
  }

  supprimerCandidat(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce candidat ?')) {
      this.http.delete(`http://localhost:5000/api/candidats/${id}`).subscribe(() => {
        this.candidats = this.candidats.filter(c => c.id_candidat !== id);
      });
    }
  }
}
