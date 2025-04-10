import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [RouterLink],  // Assurez-vous d'importer RouterModule ici
  templateUrl: './entreprises.component.html',
  styleUrl: './entreprises.component.css'
})
export class EntreprisesComponent {

}
