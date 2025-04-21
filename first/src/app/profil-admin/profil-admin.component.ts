import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {
  admin: any;
  userId: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<any>(`http://localhost:5000/api/admin/${this.userId}`).subscribe({
      next: (data) => {
        this.admin = data;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement du profil admin:', error);
      }
    });
  }
}
