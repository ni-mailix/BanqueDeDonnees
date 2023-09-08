import { Component, OnInit, ViewChild } from '@angular/core';
import { OCRResultService } from '../services/ocr-result.service';
import { Subscription } from 'rxjs'; // Importer Subscription

@Component({
  selector: 'app-ocr-result',
  templateUrl: './ocr-result.component.html',
  styleUrls: ['./ocr-result.component.css']
})
export class OcrResultComponent implements OnInit {
  extractedTextValue: string = ''; // Définir une variable pour stocker le texte extrait
  private extractedTextSubscription: Subscription | undefined; // Définir un abonnement

  constructor(private ocrResultService: OCRResultService) {}

  ngOnInit() {
    this.extractedTextSubscription = this.ocrResultService.getExtractedInformationObservable().subscribe(
      (extractedText: string | null) => {
        if (extractedText) {
          console.log('Texte extrait :', extractedText);
          this.extractedTextValue = extractedText; // Assurez-vous que votre variable extractedTextValue est correctement définie
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du texte extrait :', error);
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
