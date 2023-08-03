import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file: File): void {
    // Ici, vous implémenterez la logique pour envoyer le fichier au serveur
    // Vous pouvez utiliser des bibliothèques ou des API pour gérer l'upload
    // Par exemple, utilisez HttpClient pour effectuer une requête POST
    // pour envoyer le fichier au serveur
  }
}
