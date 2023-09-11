import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TesseractService } from '../tesseract-ocr/services/ng-tesseract/ng-tesseract.service';
import { OCRResultService } from '../services/ocr-result.service';
import { ImageLike, createWorker } from 'tesseract.js';
import { Observable } from 'rxjs';

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

  // Autres méthodes

  public extractTextFromImage(img: string, lang: string): Observable<string> {
    return new Observable<string>((observer) => {
      (async () => {
        try {
          const worker = await createWorker();

          await worker.loadLanguage(lang);
          await worker.initialize(lang);

          const { data: { text } } = await worker.recognize(img);

          observer.next(text);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }

  public extractTextFromPDF(file: File, lang: string): Observable<string> {
    return new Observable<string>((observer) => {
      (async () => {
        try {
          const worker = await createWorker();

          await worker.loadLanguage(lang);
          await worker.initialize(lang);

          const reader = new FileReader();

          reader.onload = async (event: any) => {
            const pdfImage: ImageLike = {
              data: new Uint8ClampedArray(event.target.result),
              width: file.size / (8 * event.target.result.byteLength),
              height: 1,
              colorSpace: 'srgb'
            };
            const { data: { text } } = await worker.recognize(pdfImage);

            observer.next(text);
            observer.complete();
          };

          reader.onerror = (error) => {
            observer.error(error);
          };

          reader.readAsArrayBuffer(file);
        } catch (error) {
          console.error('Erreur lors de l\'extraction :', error);
          // Gérer l'erreur en conséquence, par exemple, afficher un message d'erreur à l'utilisateur.
        }
      }
    )}
  )}
}
