import { Routes } from '@angular/router';
/*/*/
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
/** */
import { HomeComponent } from './home/home.component';
import { OffresComponent } from './offres/offres.component';
import { EntreprisesComponent } from './entreprises/entreprises.component';
import { CandidatComponent } from './candidat/candidat.component';
import { Compo2Component } from './compo2/compo2.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { InscriRecComponent } from './inscri-rec/inscri-rec.component';
//11import { InscriCandidatComponent } from './inscri-candidat/inscri-candidat.component';
import { InscriptionCandidatComponent } from './inscri-candidat/inscri-candidat.component';

import { InfoPerComponent } from "./info-per/info-per.component";
import { InfoProComponent } from "./info-pro/info-pro.component";



import { ProfilComponent } from './components/profil/profil.component';
import { MessagescandComponent } from './messagescand/messagescand.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';

import { ProfilRecComponent } from './components/profil/profil-rec/profil-rec.component';


import { ErrorComponent } from './error/error.component';
export const routes: Routes = [
 
   { path: 'home', component: HomeComponent }, // Route pour "Accueil"
    { path: '', redirectTo: '/home', pathMatch: 'full' },  //   Route par défaut


    { path: 'profil', component: ProfilComponent },
    { path: 'messages', component: MessagescandComponent },
    { path: 'candidatures', component: CandidatureComponent },
    { path: 'modifier-profil', component: ModifierProfilComponent },

    { path: 'profil-recruteur/:id', component: ProfilRecComponent },
    { path: 'profil/:id', component: ProfilComponent },

    { path: 'info-per', component: InfoPerComponent },  // Route pour "Offres d'emploi"
    { path: 'info-pro', component: InfoProComponent },  // Route pour "Offres d'emploi"

    { path: 'info-per/:id', component: InfoPerComponent },
    { path: 'info-pro/:id', component: InfoProComponent },



    { path: 'offres', component: OffresComponent },  // Route pour "Offres d'emploi"
    { path: 'entreprises', component: EntreprisesComponent },  // Route pour "Entreprises"
    { path: 'candidat', component: CandidatComponent },  // Route pour "Candidat"
    { path: 'se-connecter', component: Compo2Component },  // Route pour "Se connecter"
    { path: 'inscription', component: InscriptionComponent },
    { path: 'inscri-rec', component: InscriRecComponent },
    //{ path: 'inscri-candidat', component: InscriCandidatComponent },
        { path: 'inscri-candidat', component: InscriptionCandidatComponent },
    { path: '**', component: ErrorComponent }  // Wildcard route for a 404 page or default route

 //  { path: '', component: HomeComponent }, // Route par défaut
   // { path: 'home', redirectTo: '', pathMatch: 'full' },  // Route pour "Accueil"
  //  { path: '**', redirectTo: '' }  // Wildcard route for a 404 page or default route

];
export const appRouter = provideRouter(routes);
