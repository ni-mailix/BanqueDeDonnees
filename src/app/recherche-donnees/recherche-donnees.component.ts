import { Component } from '@angular/core';
import { RechercheService } from '../services/recherche.service';
import { Recherche } from '../models/recherche.model';
import { Observable, of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { HistoriqueService } from '../services/historique.service';

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
    check:false
    // Initialisez d'autres champs selon vos besoins
  };
  // recherche$ = this.recherche.asObservable();
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
    this.showProgressBar=true;
    // Utilisez le service de recherche côté client pour obtenir les résultats
    this.rechercheService.searchItems(this.recherche).subscribe(
      (val) => {
        // Traitez les résultats de recherche
        this.resultatsDeRecherche = val;
      },
      (error) => {
        console.error('Erreur de recherche :', error);
      },
      () => {
        // Fonction de rappel une fois l'observable terminé (complete)
        setTimeout(() => {
          this.showProgressBar=false;}
          ,1000);
      }
      
    );
  }
  onChangePage(event:PageEvent) :void{
    this.myObservable.subscribe(
      (data)=>{
        this.rechercheService.searchItems(this.recherche).subscribe(
          (val) => {
            // Traitez les résultats de recherche
            // this.resultatsDeRecherche = val;
          },
          (error) => {
            console.error('Erreur de recherche :', error);
            this.showProgressBar=false;
          },
          () => {
            // Fonction de rappel une fois l'observable terminé (complete)
            setTimeout(() => {
              this.showProgressBar=false;}
              ,1000);
          }
          
        );
      },
    );
    // alert(event.previousPageIndex) ;
  }
  

  selectChangeHandler (event: any) {
    // this.selectedDay = event.target.value;
    this.myObservable.subscribe(
      (data)=>{
     this.rechercheService.getSuggest(this.recherche,this.suggestion);
      },
    );
  }
  
}
