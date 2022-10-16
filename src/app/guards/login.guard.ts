import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !await this.auth.isLoggedIn() || this.router.parseUrl("/dashboard")
  }
  
}
