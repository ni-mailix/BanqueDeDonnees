import { Component, ElementRef, ViewChild } from '@angular/core';
import { OCRResultService } from '../services/ocr-result.service'; // Importez votre service ocrResult

@Component({
selector: 'app-ocr-result',
templateUrl: './ocr-result.component.html',
styleUrls: ['./ocr-result.component.css']
})
export class OcrResultComponent {

  extractedText!: string | null;

constructor(private ocrResultService: OCRResultService) { }

  async ngOnInit(): Promise<void> {
this.extractedText = '';
// Récupérer les données extraites à partir du service OCRResultService
this.extractedText = await this.ocrResultService.getExtractedInformation();
}

async onSubmit(event: Event): Promise<void> {
event.preventDefault();

// ... Votre code de gestion de soumission ici ...

}
}