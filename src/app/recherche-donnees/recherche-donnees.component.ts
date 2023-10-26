import { Component } from '@angular/core';
import { RechercheService } from '../services/recherche.service';
import { Recherche } from '../models/recherche.model';
import { Observable, of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { HistoriqueService } from '../services/historique.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-recherche-donnees',
  templateUrl: './recherche-donnees.component.html',
  styleUrls: ['./recherche-donnees.component.css']
})
export class RechercheDonneesComponent {

  recherche: Recherche = {
    semantique: '',
    diplome: '',
    universite: '',
    experience: '',
    langue: '',
    check:false,
    page:0,
    size:2,
  };
  myObservable: Observable<Recherche>=of(this.recherche);

  showOptions:boolean=false;

  resultatsDeRecherche: any[] = [];
  showProgressBar=false;
  selectValue = '';
  suggestion:any[]=[];
  constructor(private rechercheService: RechercheService,private historiqueRecherche:HistoriqueService) { }
  // time = new Observable<string>(observer => {
  //   setInterval(() => observer.next(new Date().getSeconds().toString()), 1000);
  // });
  
  onSubmit(): void {
    this.historiqueRecherche.addHistorique(this.recherche.semantique);
    this.resultatsDeRecherche.length = 0;
    this.recherche.page=0;
    this.showProgressBar=true;
    // Utilisez le service de recherche côté client pour obtenir les résultats
    this.rechercheService.searchItems(this.recherche).subscribe(
      (val) => {
        this.resultatsDeRecherche = val;
      },
      (error) => {
        console.error('Erreur de recherche :', error);
      },
      () => {
        setTimeout(() => {
          this.showProgressBar=false;}
          ,1000);
      }
    );
  }
  
  onChangePage(event:PageEvent) :void{
    const curPage=event.pageIndex;
    const prev=event.previousPageIndex?event.previousPageIndex:0;
    if(curPage>prev){
    this.recherche.page++;
    }
    else if(curPage<prev){
    this.recherche.page--;
    }  
    else
    {
      this.recherche.size=event.pageSize;
    }  
    this.myObservable.subscribe(
      (data)=>{
        this.rechercheService.searchItems(this.recherche).subscribe(
          (val) => {
             this.resultatsDeRecherche = val;
          },
          (error) => {
            console.error('Erreur de recherche :', error);
            this.showProgressBar=false;
          },
          () => {
           setTimeout(() => {
              this.showProgressBar=false;}
              ,1000);
          }
        );
      },
    );
  }
  
  selectChangeHandler (event: any) {
    // this.selectedDay = event.target.value;
    this.myObservable.subscribe(
      (data)=>{
     this.rechercheService.getSuggest(this.recherche,this.suggestion);
      },
    );
  }
  clearSuggest (event: any) {
    this.suggestion=[];
  }
  selectSuggestion(suggestion: string) {
    this.recherche.semantique = suggestion; // Complete the input with the selected suggestion
  }
  
}
