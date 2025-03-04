// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router =  inject(Router);
  
  if (authService.isAuthenticated()) {
    return true; // Allow access
  } else {
    console.log('Access Denied');
     router.navigate(["/"]);
    return false; // Deny access
  }
};
