import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OCRResultService {
  private extractedInformation: string | null = null;

  constructor() {}

  // Méthode pour stocker les données extraites
  storeExtractedInformation(extractedText: string) {
    this.extractedInformation = extractedText;
  }

  // Méthode pour récupérer les données extraites
  getExtractedInformation(): string | null {
    return this.extractedInformation;
  }
}
