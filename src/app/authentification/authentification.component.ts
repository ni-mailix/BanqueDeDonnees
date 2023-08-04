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
     console.log("authentification"+isAuthenticated)
     if (isAuthenticated) {
       // Authentification réussie, redirigez vers la page principale (qui contient le sidenav)
      
       this.router.navigate(['/page-principale']);
       //this.router.navigate(['/']);
     } else {
       // Authentification échouée, affichez un message d'erreur ou effectuez une autre action
       console.log('Échec d\'authentification');
     }
   }
 }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthentificationService } from '../services/authentification.service';

// @Component({
//   selector: 'app-authentification',
//   templateUrl: './authentification.component.html',
//   styleUrls: ['./authentification.component.css']
// })
// export class AuthentificationComponent {

//   username: string = '';
//   password: string = '';

//   constructor(private authService: AuthentificationService, private router: Router) { }

//   onLogin(): void {
//     const isAuthenticated = this.authService.authenticate(this.username, this.password);
//     if (isAuthenticated) {
//       // Authentification réussie, redirigez vers la page principale (qui contient le sidenav)
//       this.router.navigate(['/page-principale']);
//     } else {
//       // Authentification échouée, affichez un message d'erreur ou effectuez une autre action
//       console.log('Échec d\'authentification');
//     }
//   }
// }
