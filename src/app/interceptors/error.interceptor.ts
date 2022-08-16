import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logout();
        this.router.navigate(["login"]);
        console.log("not authorized")
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
