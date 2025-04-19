import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deconnexion',
  standalone: true,
  template: '', // Pas besoin de template visible
})
export class DeconnexionComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

    if (confirmation) {
      // Suppression de l'ID utilisateur
      localStorage.removeItem('userId');
      sessionStorage.clear();

      // Redirection vers la page de connexion
      this.router.navigate(['/se-connecter']);
    } else {
      // Redirection vers une autre page (par exemple profil ou accueil)
      this.router.navigate(['/profil-recruteur/:id']);
    }
  }
}
