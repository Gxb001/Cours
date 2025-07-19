import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const registerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    router.navigate(['/courses']);
    alert("Veuillez vous deconnecter pour acceder à la page d'inscription");
    return false;
  }
  return true;
};
