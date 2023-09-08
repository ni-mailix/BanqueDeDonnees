import { Component, OnInit, ViewChild } from '@angular/core';
import { OCRResultService } from '../services/ocr-result.service';

@Component({
  selector: 'app-ocr-result',
  templateUrl: './ocr-result.component.html',
  styleUrls: ['./ocr-result.component.css']
})
export class OcrResultComponent implements OnInit {

  @ViewChild('extractedText') extractedText!: HTMLInputElement;

  constructor(private ocrResultService: OCRResultService) {}

  ngOnInit() {
    const extractedInformation = this.ocrResultService.getExtractedInformation();
    this.extractedText.value = extractedInformation ?? '';
  }
}