import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { AfficherDonneesComponent } from './afficher-donnees/afficher-donnees.component';
import { RechercheDonneesComponent } from './recherche-donnees/recherche-donnees.component';
import { AnalyseStatComponent } from './analyse-stat/analyse-stat.component';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';
import { FormsModule } from '@angular/forms';

import { AuthentificationService } from './services/authentification.service'; // Assurez-vous d'importer correctement le chemin
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    UploadDocComponent,
    AfficherDonneesComponent,
    RechercheDonneesComponent,
    AnalyseStatComponent,
    PagePrincipaleComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  providers: [AuthentificationService], // Ajoutez AuthentificationService ici
  bootstrap: [AppComponent]
})
export class AppModule { }
