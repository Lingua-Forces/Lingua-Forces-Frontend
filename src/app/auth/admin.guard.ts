import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const auth = authService.auth();
  // Verificar si el usuario está autenticado y es admin
  if(auth && auth.user?.role === 'ADMIN'){
      return true;
  }

  // Usuario no es admin o no está autenticado, redirigir al login (o a otra ruta si lo prefieres)
  router.navigate(['login']);
  return false;
};