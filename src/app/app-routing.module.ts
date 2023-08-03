import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';


  const routes: Routes = [
    { path: '', redirectTo: '/authentification', pathMatch: 'full' }, // Redirige la racine vers la page d'authentification
    { path: 'authentification', component: AuthentificationComponent },
    // ... autres routes de votre application ...
  ];
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
