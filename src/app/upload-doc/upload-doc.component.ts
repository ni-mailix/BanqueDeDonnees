import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCRResultService } from '../services/ocr-result.service';
import { createWorker } from 'tesseract.js';
import PDFJS from 'pdfjs-dist/build/pdf';
// import * as PDFJS from 'pdfjs-dist/build/pdf';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.css']
})
export class UploadDocComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private ocrResultService: OCRResultService
  ) { }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (this.fileInput.nativeElement.files && this.fileInput.nativeElement.files.length > 0) {
      const file: File = this.fileInput.nativeElement.files[0];
      
      const fileUrl = URL.createObjectURL(file);
      const fileAbsolutePath = file.webkitRelativePath;
      console.log('fileurl ='+fileUrl);
      console.log('fileAbsolutePath ='+fileAbsolutePath);

      try {
        // Vérifier le type de fichier
        if (file.type === 'application/pdf') {

          try {
            // Obtenir le nom du fichier

            // Obtenir le document PDF
            // const pdfDocument = await PDFJS.getDocument(fileName);

            // Convertir le PDF en images
            const pdfImages = await this.convertPDFToImages(fileAbsolutePath);

            // Scanner chaque image avec Tesseract.js
            const scannedTexts = await this.scanImagesWithTesseract(pdfImages, 'fra');

            // Concaténer les résultats de chaque image
            const combinedText = scannedTexts.join(' ');

            // Stockez les données extraites dans le service OCRResultService
            this.ocrResultService.storeExtractedInformation(combinedText);

            // Naviguer vers la page ocr-result
            this.router.navigate(['/ocr-result']);

            URL.revokeObjectURL(fileUrl);

          } catch (error) {
            console.error('Erreur extraction pdf', error);
          }

        } else if (file.type.startsWith('image/')) {
          // Extraire le texte de l'image en utilisant Tesseract.js
          const imageText = await this.extractTextFromImage(file, 'fra'); // Remplacez 'fra' par la langue souhaitée

          // Stockez les données extraites dans le service OCRResultService
          this.ocrResultService.storeExtractedInformation(imageText);

          // Naviguer vers la page ocr-result
          this.router.navigate(['/ocr-result']);
        } else {
          // Gérer d'autres types de fichiers si nécessaire
          console.error('Type de fichier non pris en charge :', file.type);
          return;
        }
      } catch (error) {
        console.error('Erreur lors de l\'extraction :', error);
        // Gérer l'erreur en conséquence, par exemple, afficher un message d'erreur à l'utilisateur.
      }
    }
  }

  async convertPDFToImages(file: string) {
    const pdfDoc = await PDFJS.getDocument(file).promise;
    const numPages = pdfDoc.numPages;
    const images: Uint8Array[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const image = await page.render({ format: 'jpeg' }).then((data: { data: Uint8Array }) => data.data);
      images.push(image);
    }

    return images;
  }

  async scanImagesWithTesseract(images: Uint8Array[], lang: string): Promise<string[]> {
    const scannedTexts: string[] = [];

    for (const image of images) {
      const worker = await createWorker();
      await worker.load();
      await worker.loadLanguage(lang);
      await worker.initialize(lang);

      // Utiliser Buffer pour créer une instance de Buffer à partir de Uint8Array
      const bufferImage = Buffer.from(image);

      const { data: { text } } = await worker.recognize(bufferImage);
      scannedTexts.push(text);

      await worker.terminate();
    }

    return scannedTexts;
  }

  async extractTextFromImage(file: File, lang: string): Promise<string> {
    const worker = await createWorker();

    await worker.loadLanguage(lang);
    await worker.initialize(lang);

    // Extraire le texte de l'image
    const { data: { text } } = await worker.recognize(URL.createObjectURL(file));

    await worker.terminate();

    return text;
  }
}
