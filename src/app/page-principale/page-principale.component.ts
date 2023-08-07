import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.css']
})
export class PagePrincipaleComponent {

  isAuthenticated: boolean = false;

  constructor(private authService: AuthentificationService, private router: Router) { 
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    console.log("page-principale", this.isAuthenticated);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/authentification']);
  }
}
