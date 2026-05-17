import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {

  isAuthentecated: boolean = false;
  token!: any;
  username: any;
  roles: any;


  constructor(private http:HttpClient,private router:Router) {}


  public login(username:string,password:string){
    const body=new HttpParams().set("username",username).set("password",password);
    return this.http.post("http://localhost:8085/auth/login",body);
  }

  public stockInfo(data:any){
    this.isAuthentecated = true;
    this.token=data["access-token"];
    let decodedJwt:any=jwtDecode(this.token);
    this.username=decodedJwt.sub;
    this.roles=decodedJwt.scope;
    window.localStorage.setItem("token",this.token);
  }

  public logout(){
    this.isAuthentecated=false;
    this.token=undefined;
    this.username=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("token");
  }
  public loadToken(){
    let token=window.localStorage.getItem("token");
    if(token){
      this.isAuthentecated = true;
      this.token=token;
      let decodedJwt:any=jwtDecode(this.token);
      this.username=decodedJwt.sub;
      this.roles=decodedJwt.scope;
      this.router.navigateByUrl("/admin/customers");
    }
  }


}