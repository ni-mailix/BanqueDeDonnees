import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfToImageComponent } from './pdf-to-image.component';



const routes: Routes = [
  { path: 'pdf-to-image', component: PdfToImageComponent }, // Ajoutez cette ligne
  // Vous pouvez ajouter d'autres routes ici si nécessaire
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pdfToImageRoutingModule { }
