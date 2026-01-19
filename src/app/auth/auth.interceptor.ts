import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  let clonedRequest = req;

  // 1. Inyectar el token si existe
  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 2. Manejar la respuesta y capturar errores 401 (Expirado/Inválido)
  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Token expirado o inválido. Redirigiendo al login...');
        
        // Limpiamos todo para que el Guard no nos deje entrar de nuevo
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};