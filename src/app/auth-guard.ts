import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(currentUser);
  if (user.role !== 'admin') {
    router.navigate(['/courses']);
    return false;
  }

  return true;
};
