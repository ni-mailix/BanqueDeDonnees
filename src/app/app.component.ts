import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'BanqueDeDonnees';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    console.log("ngoninit " + this.isAuthenticated);
  }

  onLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/authentification']);
  }
}
