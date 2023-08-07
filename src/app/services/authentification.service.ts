import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  authenticate(username: string, password: string): boolean {
    if (username === 'utilisateur' && password === 'motdepasse') {
      this.isAuthenticatedSubject.next(true);
      return true;
    } else {
      this.isAuthenticatedSubject.next(false);
      return false;
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}
