import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainHeaderComponent } from './components/headers/main-header/main-header.component';
import { CandidatHeaderComponent } from './components/headers/candidat-header/candidat-header.component';
import { RecruteurHeaderComponent } from './components/headers/recruteur-header/recruteur-header.component';
import { OffresHeaderComponent } from './components/headers/offres-header/offres-header.component';
import { SeconnecterHeaderComponent } from './components/headers/seconnecter-header/seconnecter-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MainHeaderComponent,
    CandidatHeaderComponent,
    RecruteurHeaderComponent,
    OffresHeaderComponent,
    SeconnecterHeaderComponent
  ]
})
export class AppComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; 
      }
    });
  }
}
