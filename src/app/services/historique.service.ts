import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  url:string="http://localhost:8080/hist";

  constructor(private http: HttpClient) { }
   hist=[
    {historique:"Sitraka",heure:"12:45:00"},
    {historique:"Licence",heure:"12:00:00"},
    {historique:"Kera",heure:"06:35:00"},
    {historique:"UCM Ambatoroka",heure:"04:15:00"},
  ];
  getHistoriques(): Observable<any>
  {
    // alert('ok');
    // alert(this.http.get(this.url));
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

formatDate(inputDate:Date):string
{
  const date = new Date(inputDate);

// Format the date and time
const formattedDate = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formattedTime = date.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

return `${formattedDate} ${formattedTime}`;
 

}
}