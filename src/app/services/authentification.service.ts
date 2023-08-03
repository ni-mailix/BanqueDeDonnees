import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }

  // Méthode pour la vérification de l'authentification
  authenticate(username: string, password: string): boolean {
    // Remplacez cette logique par la vérification réelle des informations d'identification
    if (username === 'utilisateur' && password === 'motdepasse') {
      return true;
    } else {
      return false;
    }
  }
}
