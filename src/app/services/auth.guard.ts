import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthentificationService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated$.pipe(
      map((isAuthenticated: any) => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/authentification']);
        }
      })
    );
  }
}
