import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators';
import { Token } from '../models/token';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private isTokenRefreshing = false;

  tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if user logged in then clone the request and add the token for Authorization
    // here we can ignore intercepting when we call meathod of user register and login
    if (this.authService.loggedIn()) {
      this.attachTokenToRequest(request);
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Success');
        }
      }),
      catchError((err): Observable<any> => {
        if (err instanceof HttpErrorResponse) {
          switch ((err as HttpErrorResponse).status) {
            case 401:
              if (err.error.message === 'Email is not confirmed') {
                // We sent you an Confirmation Email. Please Confirm Your Registration to Log in
                console.log(err.error);
              } else {
                console.log('Token expired. Attempting refresh ...');
                return this.handleHttpErrorResponse(request, next);
              }
          }
        }

        return throwError(err);
      })
    );
  }

  private handleHttpErrorResponse(request: HttpRequest<any>, next: HttpHandler): any {
    // first thing to check if the token is in process of refreshing
    if (!this.isTokenRefreshing) { // if the tokenRefreshing is not true
      this.isTokenRefreshing = true;

      // is there any existing value then set to empty
      // reset here so that the following request wait until the token comes from the refresh token API call
      this.tokenSubject.next(null);

      // call the API to refresh the token
      return this.authService.refreshUser().pipe(
        switchMap((tokenResponse: Token) => {
          // console.log(tokenResponse);

          if (tokenResponse) {
            this.tokenSubject.next(tokenResponse.token);

            localStorage.setItem('username', String(tokenResponse.username)),
            localStorage.setItem('token', String(tokenResponse.token));
            localStorage.setItem('refreshToken', String(tokenResponse.refreshToken));
            localStorage.setItem('roles', String(tokenResponse.roles));
            console.log('Token refreshed...');

            // continue with the request that initialized the whole method
            return next.handle(this.attachTokenToRequest(request));
          } else {
            // if refresh token request not response that is mean the user should log manually
            // therefore we have to logged out first
            return this.authService.logout();
          }
        }),
        catchError(err => { // handle other errors ex: network errors
          this.authService.logout();
          return throwError(err);
        }),
        finalize(() => {
          this.isTokenRefreshing = false;
        })
      );
    } else { // this part execute only when the refresh token is received back
      // this.isTokenRefreshing = false;
      return this.tokenSubject.pipe(
        // filter holds other requests until the value in the tokenSubject
        // is different than null
        filter(token => token != null),
        take(1), // take one event from that tokenSubject
        switchMap(token => { // and release the request that initialized
          return next.handle(this.attachTokenToRequest(request));
        })
      );
    }
  }

  private attachTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
