import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageLike, createWorker } from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class TesseractService {

  worker: any;

  constructor() {
    this.worker = createWorker();
  }

  public imageToText(img: string, lang: string): any {
    const ocr$ = new Observable(observer => {
      (async () => {
        await this.worker.load();
        await this.worker.loadLanguage(lang);
        await this.worker.initialize(lang);
        const { data: { text } } = await this.worker.recognize(img);
        observer.next(text);
        observer.complete();
      })();
    });

    return ocr$;
  }

  public imageRectToText(img: string, lang: string, rectangle: any): any {
    const ocr$ = new Observable(observer => {
      (async () => {
        await this.worker.load();
        await this.worker.loadLanguage(lang);
        await this.worker.initialize(lang);
        const { data: { text } } = await this.worker.recognize(img, { rectangle });
        observer.next(text);
        observer.complete();
      })();
    });

    return ocr$;
  }

  public imageRectsToText(img: string, lang: string, rectangles: any): any {
    const ocr$ = new Observable(observer => {
      (async () => {
        await this.worker.load();
        await this.worker.loadLanguage(lang);
        await this.worker.initialize(lang);
        const values = [];
        for (let i = 0; i < rectangles.length; i++) {
          const { data: { text } } = await this.worker.recognize(img, { rectangle: rectangles[i] });
          values.push(text);
        }
        observer.next(values);
        observer.complete();
      })();
    });

    return ocr$;
  }

  public extractTextFromImage(file: File | string, lang: string): Observable<string> {
    return new Observable<string>((observer) => {
      (async () => {
        try {
          await this.worker.load();
          await this.worker.loadLanguage(lang);
          await this.worker.initialize(lang);
          const { data: { text } } = await this.worker.recognize(file);
  
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
          await this.worker.load();
          await this.worker.loadLanguage(lang);
          await this.worker.initialize(lang);

          const reader = new FileReader();

          reader.onload = async (event: any) => {
            const pdfImage: ImageLike = {
              data: new Uint8ClampedArray(event.target.result),
              width: file.size / (8 * event.target.result.byteLength),
              height: 1,
              colorSpace: 'srgb'
            };
            const { data: { text } } = await this.worker.recognize(pdfImage);

            observer.next(text);
            observer.complete();
          };

          reader.onerror = (error) => {
            observer.error(error);
          };

          reader.readAsArrayBuffer(file);
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }

  public terminateWorker(): void {
    this.worker.terminate();
  }
}
