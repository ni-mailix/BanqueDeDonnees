import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from '../services/historique.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{

  constructor(private historiqueService: HistoriqueService) {
  }
  historiques:any[]=[];

  ngOnInit(): void {
    this.historiqueService.getHistoriques().subscribe(
      (val) => {
        // Traitez les résultats de recherche
        this.historiques=val;      
      });
  }
}
