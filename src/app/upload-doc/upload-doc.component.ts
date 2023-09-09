import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TesseractService } from '../tesseract-ocr/services/ng-tesseract/ng-tesseract.service';
import { OCRResultService } from '../services/ocr-result.service';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.css']
})
export class UploadDocComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private tesseractService: TesseractService,
    private router: Router,
    private ocrResultService: OCRResultService
  ) {}

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (this.fileInput.nativeElement.files && this.fileInput.nativeElement.files.length > 0) {
      const file: File = this.fileInput.nativeElement.files[0];

      // Convertir le fichier en une chaîne de caractères contenant le chemin local
      const filePath: string = URL.createObjectURL(file);

      try {
        // Initialiser l'objet worker
        const worker = await createWorker();

        // Charger le moteur OCR Tesseract
        await worker.load();
        await worker.loadLanguage('fra');
        await worker.initialize('fra');

        // Extraire le texte de l'image
        const { data: { text } } = await worker.recognize(filePath);

        // Stockez les données extraites dans le service OCRResultService
        this.ocrResultService.storeExtractedInformation(text);

        // Naviguer vers la page ocr-result
        this.router.navigate(['/ocr-result']);
      } catch (error) {
        console.error('Erreur lors de l\'extraction :', error);
        // Gérer l'erreur en conséquence, par exemple, afficher un message d'erreur à l'utilisateur.
      }
    }
  }
}
