import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    router.navigate(['/']);
    return false;
  }
  return true;
};

export const canActivateAdmin: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }
  const user = JSON.parse(currentUser);
  if (user.role !== 'admin') {
    alert("Vous n\'avez pas les droits d'accès à cette page.");
    router.navigate(['/courses']);
    return false;
  }
  return true;
};
