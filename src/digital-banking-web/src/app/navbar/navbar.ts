import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  constructor(private router: Router,public authService: AuthentificationService) {}
  ngOnInit(): void {
  }

  handelelogout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }


}
