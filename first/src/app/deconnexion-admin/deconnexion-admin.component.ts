import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deconnexion-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '' // Pas besoin de template, redirection automatique
})
export class DeconnexionAdminComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

    if (confirmation) {
      // Supprimer les données de session/localStorage
      localStorage.removeItem('adminId');
      localStorage.removeItem('userId'); // si utilisé aussi

      // Redirection vers la page de connexion
      this.router.navigate(['/se-connecter']);
    } else {
      // Redirection vers le profil admin
      const adminId = localStorage.getItem('adminId');
      if (adminId) {
        this.router.navigate(['/profil-admin', adminId]);
      } else {
        // Fallback si l'id est introuvable
        alert("Erreur : ID admin introuvable, retour à l'accueil.");
        this.router.navigate(['/']);
      }
    }
  }
}
