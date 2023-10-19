import { CanActivateFn ,Router } from '@angular/router';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (localStorage.getItem("data") === null) {
    router.navigate(['login']);
   return false
  }
  return true
};


 