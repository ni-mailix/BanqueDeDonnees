import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   title = 'BanqueDeDonnees';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthentificationService, private router: Router) { }

  // Méthode pour vérifier l'état d'authentification lors du chargement de l'application
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  // Méthode pour déconnecter l'utilisateur
  onLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/authentification']);
  }
}
