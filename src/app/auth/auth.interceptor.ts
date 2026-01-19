import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Obtenemos el token del localStorage
  const token = localStorage.getItem('access_token');

  // 2. Si el token existe, clonamos la petición y le añadimos el header
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Enviamos la petición clonada con el token
    return next(cloned);
  }

  // 3. Si no hay token, la petición sigue su curso original
  return next(req);
};