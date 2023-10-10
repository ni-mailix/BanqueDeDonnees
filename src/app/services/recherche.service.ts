import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recherche } from '../models/recherche.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private http: HttpClient) { }
url:String="http://127.0.0.1:8080/";
  
 formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  searchItems(recherche: Recherche): Observable<any> {
    const params = new HttpParams()
      .set('query', recherche.semantique)
      .set('check', recherche.check)
      .set('diplome', recherche.diplome)
      .set('universite', recherche.universite)
      .set('experience', recherche.experience)
      .set('langue', recherche.langue)
      .set('page', recherche.page)
      .set('size', recherche.size)
      .set('heure',this.formatDate(new Date()));
      console.log(params.get('heure'));
    const results = [
      { nom: 'CV 1', description: 'Rakotobe Sitraka etudiante ' },
      { nom: 'Résultat 2', description: 'Description du résultat 2' },
    ];
     let apiUrl = this.url+'data'; 
    console.log(apiUrl,{params});
    return this.http.get(apiUrl,{params});
    // return of(results);
  }

  suggestion(recherche:Recherche):Observable<any>
  {
    const params = new HttpParams()  
    .set('query', recherche.semantique)
    .set('check', recherche.check)
    .set('diplome', recherche.diplome)
    .set('universite', recherche.universite)
    .set('experience', recherche.experience)
    .set('langue', recherche.langue)
    .set('page', recherche.page)
    .set('size', recherche.size);//parametre des requetes

      
    const suggestion = [
      { nom: 'CV 1', description: 'Rakotobe Sitraka etudiante ' },
      { nom: 'Résultat 2', description: 'Description du résultat 2' },
   
    ];
    // return of(suggestion); 
    let apiUrl = this.url+'complete'; 
    // console.log(apiUrl,{params});
    return this.http.get(apiUrl,{params});
  }

  getSuggest(recherche:Recherche,arraySuggest:any[]):void{
    this.suggestion(recherche).subscribe(
      (val) => {
        // arraySuggest = val;
        arraySuggest.splice(0, arraySuggest.length, ...val);
      },      
    );
  }
}
