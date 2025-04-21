import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-offre',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-offre.component.html',
  styleUrls: ['./admin-offre.component.css']
})
export class AdminOffreComponent implements OnInit {

  offres: any[] = [];
  userId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.chargerOffres();
  }

  chargerOffres() {
    this.http.get<any[]>('http://localhost:5000/api/offres').subscribe({
      next: (data) => this.offres = data,
      error: (err) => console.error('Erreur chargement offres:', err)
    });
  }

  supprimerOffre(id_offre: number) {
    if (confirm("Supprimer cette offre ?")) {
      this.http.delete(`http://localhost:5000/api/offres/${id_offre}`).subscribe({
        next: () => {
          alert("Offre supprimée.");
          this.chargerOffres();
        },
        error: (err) => {
          console.error("Erreur suppression offre:", err);
          alert("Erreur lors de la suppression.");
        }
      });
    }
  }
}
