import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthentificationService } from '../services/authentification-service';


export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {

  const authservice=inject(AuthentificationService);

  if(authservice.isAuthentecated){
    const newRep=req.clone({
      headers:req.headers.set("Authorization","Bearer "+authservice.token)
    })
    return next(newRep);
  }
  return next(req);
};
