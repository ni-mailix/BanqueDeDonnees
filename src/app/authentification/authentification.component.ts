import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthentificationService, private router: Router) { }

  onLogin(): void {
    const isAuthenticated = this.authService.authenticate(this.username, this.password);
    if (isAuthenticated) {
      this.router.navigate(['/page-principale']);
    } else {
      alert('Échec d\'authentification')
      console.log('Échec d\'authentification');
    }
  }
}
