import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-afficher-donnees',
  templateUrl: './afficher-donnees.component.html',
  styleUrls: ['./afficher-donnees.component.css']
})
export class AfficherDonneesComponent {

  constructor(private databaseService: DatabaseService) { }

  // Utilisez le service de base de données ici
}
