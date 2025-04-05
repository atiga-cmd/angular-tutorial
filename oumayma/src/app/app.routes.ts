import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EspaceCandidatComponent } from './pages/espace-candidat/espace-candidat.component';
import { EspaceRecruteurComponent } from './pages/espace-recruteur/espace-recruteur.component';
import { ErrorComponent } from './error/error.component';

import { SeConnecterComponent } from './components/auth/se-connecter/se-connecter.component';
import { DeconnexionComponent } from './components/auth/deconnexion/deconnexion.component';
import { InfoProComponent } from './components/profil/info-pro/info-pro.component';
import { InfoPerComponent } from './components/profil/info-per/info-per.component';
import { InscriRecComponent } from './components/auth/inscri-rec/inscri-rec.component';
import { InscriCandidatComponent } from './components/auth/inscri-candidat/inscri-candidat.component';
import { OffresComponent } from './components/offres/offres.component';
import { InscriptionComponent } from './components/auth/inscription/inscription.component';
export const routes: Routes = [

  { path: '', component: HomeComponent },
   { path: 'espace-candidat', component: EspaceCandidatComponent },
  { path: 'espace-recruteur', component: EspaceRecruteurComponent },
  
  { path: 'inscription', component: InscriptionComponent },
  { path: 'seconnecter', component: SeConnecterComponent },
  { path: 'deconnexion', component: DeconnexionComponent },
  { path: 'info-pro', component: InfoProComponent },
  { path: 'info-per', component: InfoPerComponent },
  { path: 'inscri-rec', component: InscriRecComponent },
  { path: 'inscri-candidat', component: InscriCandidatComponent },
  { path: 'offres', component: OffresComponent },
  { path: '**', component: ErrorComponent }  // Wildcard route for a 404 page or default route
];



