import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExtractionService } from '../services/extraction.service';
import { OCRResult } from '../ocr-result';
import { OCRResultService } from '../services/ocr-result.service';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.css']
})
export class UploadDocComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private extractionService: ExtractionService,
    private router: Router,
    private ocrResultService: OCRResultService
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.fileInput.nativeElement.files && this.fileInput.nativeElement.files.length > 0) {
      const file: File = this.fileInput.nativeElement.files[0];

      this.extractionService.extractInformation(file).subscribe(
        (ocrResult: OCRResult) => {
          console.log('Informations extraites :', ocrResult);

          // Stockez les données extraites dans le service OCRResultService
          this.ocrResultService.storeExtractedInformation(ocrResult.extractedText);

          // Naviguer vers la page ocr-result
          this.router.navigate(['/ocr-result']);
        },
        (error: any) => {
          console.error('Erreur lors de l\'extraction :', error);
        }
      );

      // Réinitialiser le champ de sélection de fichier après l'upload
      this.fileInput.nativeElement.value = '';
    }
  }
}
