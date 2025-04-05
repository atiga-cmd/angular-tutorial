import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],  // Assurez-vous d'importer RouterModule ici

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ✅ Correction ici (styleUrl -> styleUrls)
})
export class HomeComponent {}

