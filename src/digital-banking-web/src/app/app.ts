import { Component, signal, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { OnInit } from '@angular/core';
import { AuthentificationService } from './services/authentification-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('digital-banking-web');
  private platformId = inject(PLATFORM_ID);

  constructor(private auths: AuthentificationService) {}

  ngOnInit(): void {
    
    this.auths.loadToken();
  
  }
}