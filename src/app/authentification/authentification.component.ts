import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthentificationService) { }

  onLogin(): void {
    const isAuthenticated = this.authService.authenticate(this.username, this.password);
    if (isAuthenticated) {
      console.log('Authentification réussie');
    } else {
      console.log('Échec d\'authentification');
    }
  }
}
