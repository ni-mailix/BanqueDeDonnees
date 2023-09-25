import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  url:string="http://localhost:8080/historique";

  constructor(private http: HttpClient) { }
   hist=[
    {historique:"Rasitraka",heure:"12:45:00"},
    {historique:"Licence",heure:"12:00:00"},
    {historique:"Antanimena",heure:"06:35:00"},
    {historique:"UCM Ambatoroka",heure:"04:15:00"},
  ];
  getHistoriques(): Observable<any>
  {
    return this.http.get(this.url);
    // return of(this.hist);
  }
addHistorique(histo:any):void
{

  const newhist= {
    historique:histo,
    heure:new Date().toLocaleDateString('en-GB', {
      hour12: false,
    })
  };
  this.hist.push(newhist);
}
}