import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recherche } from '../models/recherche.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private http: HttpClient) { }
url:String="http://localhost:8080/";
  
  searchItems(recherche: Recherche): Observable<any> {
    const params = new HttpParams()
      .set('query', recherche.semantique)
      .set('check', recherche.check)
      .set('diplome', recherche.diplome)
      .set('universite', recherche.universite)
      .set('experience', recherche.experience)
      .set('langue', recherche.langue);
      
    const results = [
      { nom: 'CV 1', description: 'Rakotobe Sitraka etudiante ' },
      { nom: 'Résultat 2', description: 'Description du résultat 2' },
    ];
     let apiUrl = this.url+'data'; 
    // apiUrl+="?query=${recherche.semantique}&check=${recherche.check}";
    console.log(apiUrl,{params});
    return this.http.get(apiUrl,{params});
    return of(results);
  }

  suggestion(recherche:Recherche):Observable<any>
  {
    const params = new HttpParams()  
    .set('query', recherche.semantique)
    .set('check', recherche.check)
    .set('diplome', recherche.diplome)
    .set('universite', recherche.universite)
    .set('experience', recherche.experience)
    .set('langue', recherche.langue)    ; //parametre des requetes

      
    const suggestion = [
      { nom: 'CV 1', description: 'Rakotobe Sitraka etudiante ' },
      { nom: 'Résultat 2', description: 'Description du résultat 2' },
   
    ];
    // return of(suggestion); 
    let apiUrl = this.url+'data'; 
    // apiUrl+="?query=${recherche.semantique}&check=${recherche.check}";
    console.log(apiUrl,{params});
    return this.http.get(apiUrl,{params});
  }

  getSuggest(recherche:Recherche,arraySuggest:any[]):any[]{
    this.suggestion(recherche).subscribe(
      (val) => {
        // Traitez les résultats de recherche
        arraySuggest = val;
        
        // arraySuggest.splice(0, arraySuggest.length, ...val);

      },      
    );
return arraySuggest;

  }
}
