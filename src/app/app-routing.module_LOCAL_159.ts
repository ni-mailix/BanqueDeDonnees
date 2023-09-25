import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { AfficherDonneesComponent } from './afficher-donnees/afficher-donnees.component';
import { RechercheDonneesComponent } from './recherche-donnees/recherche-donnees.component';
import { AnalyseStatComponent } from './analyse-stat/analyse-stat.component';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';
import { OcrResultComponent } from './ocr-result/ocr-result.component';
import { PdfToImageComponent } from './pdf-to-image/pdf-to-image.component';

// Créez une garde de route
class AuthGuard implements CanActivate {
  canActivate(): boolean {
    // Vérifiez ici si l'utilisateur est authentifié
    // Renvoyez true si authentifié, false sinon
    return true;
  }
}

const routes: Routes = [
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'upload-doc', component: UploadDocComponent },
  { path: 'pdf-to-image', component: PdfToImageComponent },
  { path: 'recherche-donnees', component: RechercheDonneesComponent },
  { path: 'analyse-stat', component: AnalyseStatComponent },
  { path: 'page-principale', component: PagePrincipaleComponent, canActivateChild: [AuthGuard] },
  { path: 'ocr-result', component: OcrResultComponent },
  { path: '', redirectTo: '/authentification', pathMatch: 'full' }, // Redirection par défaut
  // Ajoutez d'autres routes ici
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
