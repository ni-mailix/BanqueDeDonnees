import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { pdfToImageRoutingModule } from './pdf-to-image-routing.module';
import { PdfToImageComponent } from './pdf-to-image.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    PdfToImageComponent
  ],
  imports: [
    BrowserModule,
    pdfToImageRoutingModule,
    PdfViewerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PdfToImageAppModule { }
platformBrowserDynamic().bootstrapModule(PdfToImageAppModule);