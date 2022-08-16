import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { from, lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return from(this.handle(request, next))
  }

  async handle(request: HttpRequest<unknown>, next: HttpHandler) {
    if(request.url.startsWith("auth/"))
      return lastValueFrom(next.handle(request))

    let loggedIn = await this.authService.isLoggedIn();
    if(loggedIn) {
      let token = await this.authService.getAccessToken()
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return lastValueFrom(next.handle(request))
  }
}
