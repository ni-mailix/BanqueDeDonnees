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
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { OCRResultService } from './services/ocr-result.service';
import { TesseractOcrModule } from './tesseract-ocr/tesseract-ocr.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import 'bootstrap';

import { PdfToImageComponent } from './pdf-to-image/pdf-to-image.component'; // Assurez-vous d'importer correctement le chemin


import { AuthentificationService } from './services/authentification.service'; // Assurez-vous d'importer correctement le chemin
import { HistoriqueComponent } from './historique/historique.component';
import { PdfToImageAppModule } from './pdf-to-image/pdf-to-image.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    UploadDocComponent,
    AfficherDonneesComponent,
    RechercheDonneesComponent,
    AnalyseStatComponent,
    PagePrincipaleComponent,
    //  PdfToImageComponent,
    // PdfViewerModule,
    HistoriqueComponent
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
    MatProgressBarModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    TesseractOcrModule,
    PdfViewerModule,
    HttpClientModule,
    PdfToImageAppModule

  ],
  providers: [AuthentificationService, OCRResultService,], // Ajoutez AuthentificationService ici
  bootstrap: [AppComponent,PdfToImageComponent]
})
export class AppModule { }
