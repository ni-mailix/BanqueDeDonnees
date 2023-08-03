import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recherche } from '../models/recherche.model';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor() { }

  // Implémentez la méthode de recherche côté client ici
  searchItems(recherche: Recherche): Observable<any> {
    // Simulez une recherche côté client en renvoyant un Observable avec des données factices
    const results = [
      { nom: 'Résultat 1', description: 'Description du résultat 1' },
      { nom: 'Résultat 2', description: 'Description du résultat 2' },
      // Ajoutez d'autres résultats de recherche factices
    ];

    return of(results);
  }
}
