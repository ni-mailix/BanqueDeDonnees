import { Component } from '@angular/core';
import { RechercheService } from '../services/recherche.service';
import { Recherche } from '../models/recherche.model';

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
    langue: ''
    // Initialisez d'autres champs selon vos besoins
  };

  resultatsDeRecherche: any[] = [];

  constructor(private rechercheService: RechercheService) { }

  onSubmit(): void {
    // Utilisez le service de recherche côté client pour obtenir les résultats
    this.rechercheService.searchItems(this.recherche).subscribe(
      (results) => {
        // Traitez les résultats de recherche
        this.resultatsDeRecherche = results;
      },
      (error) => {
        console.error('Erreur de recherche :', error);
      }
    );
  }
}
