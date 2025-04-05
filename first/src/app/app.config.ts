/*
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Active HttpClient pour les requêtes HTTP
    provideRouter(routes), // Active le Router
    provideClientHydration(withEventReplay()), // Optimisation pour SSR et Hydratation
    provideZoneChangeDetection({ eventCoalescing: true }) // Optimisation Angular
  ]
};
*/
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core'; 


export const appConfig: ApplicationConfig = {
  providers: [
  provideRouter(routes), // Active le Router
    provideRouter([]),
    provideHttpClient(),
    provideClientHydration(withEventReplay()), // Optimisation pour SSR et Hydratation
    provideZoneChangeDetection({ eventCoalescing: true }) // Optimisation Angular
  ]
};
