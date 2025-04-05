/*import { HttpRequest, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

// Crée un intercepteur avec HttpInterceptorFn
export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: any): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned); // Passe la requête clonée avec l'en-tête Authorization
  }

  return next(req); // Passe la requête telle quelle si aucun token
};*/
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définir l'intercepteur en tant que fonction
export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned); // Passer la requête clonée
  }

  return next(req); // Passer la requête originale si pas de token
};
