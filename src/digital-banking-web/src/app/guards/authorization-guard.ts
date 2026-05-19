import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification-service';

export const authorizationGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const auth=inject(AuthentificationService)

  if(auth.roles.includes(route.data['ROLES'])){
    return true;
  }else{
    router.navigateByUrl("/admin/noteAuthz");
    return false;
  }

};
