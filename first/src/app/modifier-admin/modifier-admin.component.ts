import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifier-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // 👈 Ajout ici
    templateUrl: './modifier-admin.component.html',
  styleUrls: ['./modifier-admin.component.css']
})
export class ModifierAdminComponent {


  admin: any = null;
  userId = '';
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`http://localhost:5000/api/admin/${this.userId}`).subscribe({
      next: (data) => {
        this.admin = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil admin :', err);
      }
    });
  }

  onSubmit(): void {
    if (this.oldPassword !== this.admin.motPasse_admin) {
      this.errorMessage = "Ancien mot de passe incorrect.";
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = "Les nouveaux mots de passe ne correspondent pas.";
      return;
    }

    const updatedAdmin = {
      nom_admin: this.admin.nom_admin,
      prenom_admin: this.admin.prenom_admin,
      email_admin: this.admin.email_admin,
      motPasse_admin: this.newPassword
    };

    this.http.put(`http://localhost:5000/api/admin/${this.userId}`, updatedAdmin).subscribe({
      next: () => {
        alert('Profil modifié avec succès');
        this.router.navigate(['/profil-admin', this.userId]);
      },
      error: (err) => {
        console.error('Erreur mise à jour admin :', err);
      }
    });
  }

  supprimerCompte(): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
      this.http.delete(`http://localhost:5000/api/admin/${this.userId}`).subscribe({
        next: () => {
          alert("Compte supprimé avec succès.");
          this.router.navigate(['/']); // ou page de login
        },
        error: (err) => {
          console.error("Erreur suppression :", err);
        }
      });
    }
  }
}
