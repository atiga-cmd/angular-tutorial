import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-pro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil-pro.component.html',
  styleUrls: ['./profil-pro.component.css']
})
export class ProfilProComponent implements OnInit {
  proInfo: any;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.http.get(`http://localhost:5000/api/proinfo/${id}`)
        .subscribe({
          next: data => this.proInfo = data,
          error: err => {
            this.errorMessage = 'Erreur lors du chargement des informations professionnelles.';
            console.error(err);
          }
        });
    } else {
      this.errorMessage = 'Utilisateur non identifié.';
    }
  }
}
