import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification-service';

export const authenticationGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const auth=inject(AuthentificationService);

  if(auth.isAuthentecated){
    return true;
  }else{
    router.navigateByUrl("/login");
    return false;
  }
};
