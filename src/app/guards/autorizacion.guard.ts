import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces/authenticacion';
import { UserService } from '../services/user.service';

export const autorizacionGuard: CanActivateFn = (route, state) => {
  const loginService = inject( UserService );
  const router = inject( Router );

  const token = JSON.parse(localStorage.getItem('sesion') || '{}').token;

  if (token) {
      /* SI EL USUARIO ESTA AUTENTICADO RETORNARA 'true' */
      loginService._authStatus.set( AuthStatus.authenticated );
      return true;
  };

  // SI NO ESTA AUTENTICADO, RETORNARA FALSE Y LO MANDARA
  // AL LOGIN
  router.navigateByUrl('/login');
  return false;
};