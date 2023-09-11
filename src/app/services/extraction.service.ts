import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OCRResult } from '../ocr-result';
import { createWorker, createScheduler } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class ExtractionService {

  constructor() { }

  extractInformation(file: File): Observable<OCRResult> {
    return from(createWorker({
      //workerPath: 'chemin/vers/worker.js', // Spécifiez le chemin d'accès au fichier du worker
      logger: (m) => console.log(m),
    })).pipe(
      switchMap(worker => {
        return worker.load()
          .then(() => worker.loadLanguage('fra'))
          .then(() => worker.initialize('fra'))
          .then(() => worker.recognize(file))
          .then(({ data: { text } }) => {
            if (text) {
              worker.terminate();
              return { extractedText: text };
            } else {
              throw new Error('Aucun texte extrait.');
            }
          })
          .catch(error => {
            worker.terminate();
            throw error;
          });
      })
    );
  }
}
