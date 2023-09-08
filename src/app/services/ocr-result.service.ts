// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class OCRResultService {
//   private extractedInformation: string | null = null;

//   constructor() {}

//   // Méthode pour stocker les données extraites
//   storeExtractedInformation(extractedText: string) {
//     this.extractedInformation = extractedText;
//     console.log('Données extraites stockées :', this.extractedInformation);
//   }

//   // Méthode pour récupérer les données extraites
//   getExtractedInformation(): string | null {
//     console.log('Récupération des données extraites :', this.extractedInformation);
//     return this.extractedInformation;
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OCRResultService {
  private extractedInformation: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {}

  // Méthode pour stocker les données extraites
  storeExtractedInformation(extractedText: string) {
    this.extractedInformation.next(extractedText);
    console.log('Données extraites stockées :', extractedText);
  }

  // Méthode pour récupérer les données extraites sous forme d'observable
  getExtractedInformationObservable(): Observable<string | null> {
    return this.extractedInformation.asObservable();
  }
}
