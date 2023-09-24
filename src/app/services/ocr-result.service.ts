import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OCRResultService {
  private extractedInformation: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {}

  // Méthode pour stocker les données extraites
  storeExtractedInformation(extractedText: string | null) {
    if (typeof extractedText === 'string' || extractedText === null) {
      this.extractedInformation.next(extractedText);
      console.log('Données extraites stockées :', extractedText);
    } else {
      console.error('Tentative de stockage de données non valides.');
    }
  }
  
  // Méthode pour récupérer les données extraites sous forme d'observable
  getExtractedInformationObservable(): Observable<string | null> {
    return this.extractedInformation.asObservable();
  }
}
