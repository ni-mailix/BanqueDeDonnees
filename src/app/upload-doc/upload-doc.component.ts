import { Component, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { ExtractionService } from '../services/extraction.service'; // Importez le service d'extraction

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.css']
})
export class UploadDocComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private uploadService: UploadService, private extractionService: ExtractionService) { }

  onSubmit(event: Event): void {
    event.preventDefault(); // Empêche le rechargement de la page

    const fileInput = this.fileInput.nativeElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];

      // Utilisez le service d'extraction ici
      this.extractionService.extractInformation(file).subscribe(
        (result) => {
          console.log('Informations extraites :', result);
        },
        (error) => {
          console.error('Erreur lors de l\'extraction :', error);
        }
      );

      // Réinitialiser le champ de sélection de fichier après l'upload
      fileInput.value = '';
    }
  }
}
