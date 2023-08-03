import { Component } from '@angular/core';
import { AnalyseService } from '../services/analyse.service';

@Component({
  selector: 'app-analyse-stat',
  templateUrl: './analyse-stat.component.html',
  styleUrls: ['./analyse-stat.component.css']
})
export class AnalyseStatComponent {

  constructor(private analyseService: AnalyseService) { }

  // Utilisez la méthode de traitement d'analyse
  //performAnalysis(data: any): void {
   // const analysisResults = this.analyseService.processAnalysis(data); // a modifier après
    // Traitez les résultats de l'analyse
  }

