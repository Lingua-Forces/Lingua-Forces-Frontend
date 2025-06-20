import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  const auth = authService.auth();
  // Verificar si el usuario está autenticado y es admin
  if(auth && auth.user?.role === 'USER'){
      return true;
  }

  // Usuario no autenticado, redirigir al componente de inicio de sesión
  router.navigate(['login']);
  return false;
};
