import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from '../services/authentification-service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-formulaire-login',
  imports: [ ReactiveFormsModule],
  templateUrl: './formulaire-login.html',
  styleUrl: './formulaire-login.css',
})
export class FormulaireLogin implements OnInit{

  LoginForm!: FormGroup;

  constructor(private fb:FormBuilder,private authservice:AuthentificationService,private router:Router) {}
  
  ngOnInit(): void{
    this.LoginForm=this.fb.group({
      username: this.fb.control("",[Validators.required,Validators.minLength(3)]),
      password: this.fb.control("",[Validators.required,Validators.minLength(5)])
    })
  }





  login(){
    let username=this.LoginForm?.value.username;
    let password=this.LoginForm?.value.password;

    this.authservice.login(username,password).subscribe({
      next: (data)=>{
    
        this.authservice.stockInfo(data);
        this.router.navigateByUrl("/admin");
  
      },
      error: (err)=>{
        alert(err.message);
      }
    })
  }

}
