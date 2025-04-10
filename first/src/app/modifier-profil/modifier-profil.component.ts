import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';  // Assurez-vous d'importer le service UserService
import { ActivatedRoute } from '@angular/router';  // Pour lire les paramètres de l'URL
@Component({
  selector: 'app-modifier-profil',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],  // Importation des modules nécessaires
  templateUrl: './modifier-profil.component.html',
  styleUrl: './modifier-profil.component.css'
})
export class ModifierProfilComponent {

}
