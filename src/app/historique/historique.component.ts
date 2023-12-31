import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from '../services/historique.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{

  constructor( public historiqueService: HistoriqueService) {
  }
  historiques:any[]=[];

  ngOnInit(): void {
    this.historiqueService.getHistoriques().subscribe(
      (val) => {
        this.historiques=val;   
      });
  }
}
