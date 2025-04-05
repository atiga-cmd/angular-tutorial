/*import { Component } from '@angular/core';

@Component({
  selector: 'app-offres',
  imports: [],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css'
})
export class OffresComponent {

}*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule], // Import du CommonModule pour ngFor
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent {
  offres = [
    { id: 1, title: 'Développeur Angular', company: 'TechCorp', location: 'Paris', description: 'Poste en CDI', salary: '50k€/an', postedDate: new Date() },
    { id: 2, title: 'Développeur Full-Stack', company: 'InnovIT', location: 'Lyon', description: 'Poste en Freelance', salary: '55k€/an', postedDate: new Date() }
  ];
}
