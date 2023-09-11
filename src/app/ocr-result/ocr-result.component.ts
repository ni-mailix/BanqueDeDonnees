import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OCRResultService } from '../services/ocr-result.service';

@Component({
  selector: 'app-ocr-result',
  templateUrl: './ocr-result.component.html',
  styleUrls: ['./ocr-result.component.css']
})
export class OcrResultComponent implements OnInit, OnDestroy {
  extractedTextValue: string = ''; // Variable pour stocker le texte extrait
  private extractedTextSubscription: Subscription | undefined; // Abonnement à l'observable

  constructor(private ocrResultService: OCRResultService) { }

  ngOnInit() {
    this.extractedTextSubscription = this.ocrResultService.getExtractedInformationObservable().subscribe(
      (extractedText: string | null) => {
        if (extractedText) {
          // Vérifier si la valeur est une chaîne de caractères
          if (typeof extractedText === 'string') {
            this.extractedTextValue = extractedText;
          } else {
            console.error('La valeur renvoyée par la fonction de rappel n\'est pas une chaîne de caractères.');
            this.extractedTextValue = 'Données non valides';
          }
        } else {
          console.error('Aucun texte extrait.');
          this.extractedTextValue = 'Aucun texte extrait';
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du texte extrait :', error);
        this.extractedTextValue = 'Erreur lors de la récupération';
      },
      () => {
        console.log('La fonction de rappel a été appelée.'); // Vérifier si la fonction de rappel est appelée
      }
    );
  }

  ngOnDestroy() {
    // Nettoyer l'abonnement lorsqu'il n'est plus nécessaire
    if (this.extractedTextSubscription) {
      this.extractedTextSubscription.unsubscribe();
    }
  }
}
