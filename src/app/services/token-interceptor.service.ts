import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken()) {
      request = this.addToken(request, this.authService.getToken());
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Success');
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('Token expired. Attempting refresh ...');
          // if there are tokens then send refresh token request
          if (this.authService.getToken() && this.authService.getRefreshToken()) {
            console.log('come inside ...');
            return this.handle401Error(request, next);
          }
          // otherwise logout and redirect to login page
          return this.logoutAndRedirect(error);
        }

        // in case of 403 http error (refresh token failed)
        if (error instanceof HttpErrorResponse && error.status === 403) {
          // logout and redirect to login page
          return this.logoutAndRedirect(error);
        }

        // if error has status neither 401 nor 403 then just return this error
        return throwError(error);
    }));
  }

  private addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      // console.log('add token', token);
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: AuthResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.token);
          // repeat failed request with new token
          return next.handle(this.addToken(request, response.token));
        }));

    } else {
      // wait while getting new token
      return this.refreshTokenSubject.pipe(
        // filter holds other requests until the value in the tokenSubject is different than null
        filter(token => token != null),
        take(1), // take one event from that tokenSubject
        switchMap(jwtToken => {
          // repeat failed request with new token
          return next.handle(this.addToken(request, jwtToken));
        })
      );
    }
  }

  private logoutAndRedirect(err: any): Observable<HttpEvent<any>> {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
    return throwError(err);
  }
}
