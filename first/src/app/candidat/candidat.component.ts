import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-candidat',
  standalone: true,
  imports: [RouterLink],  // Assurez-vous d'importer RouterModule ici
  templateUrl: './candidat.component.html',
  styleUrl: './candidat.component.css'
})
export class CandidatComponent {

}
