import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/auth-response';
import { Injectable } from '@angular/core';
import { ForgotPassword, ResetPassword, TwoFactor, UserLogin, UserRegister } from '../models/user';
import { map, tap } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:44325/api/users';

  constructor(private http: HttpClient) { }

  registerUser(user: UserRegister): any {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  loginUser(user: UserLogin): any {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  refreshToken(): Observable<any> {
    const token = String(localStorage.getItem('token'));
    const refreshToken = String(localStorage.getItem('refreshToken'));

    const userRefreshToken = { token, refreshToken };
    console.log(userRefreshToken);

    return this.http.post<any>(`${this.baseUrl}/refreshToken`, userRefreshToken).pipe(
      map((res: AuthResponse) => {
        console.log(res);
        if (res && res.token) {
          localStorage.setItem('username', String(res.username)),
          localStorage.setItem('token', String(res.token));
          localStorage.setItem('refreshToken', String(res.refreshToken));
          localStorage.setItem('roles', String(res.roles));
        }
        return res;
      })
    );
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getRole(): string | null {
    return localStorage.getItem('roles');
  }

  logout(): any {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('roles');
    return this.http.get(`${this.baseUrl}/logout`);
  }

  forgotPassword(username: any): any {
    const forgotPassword: ForgotPassword = {
      email: username,
      clientURI: `${window.location.origin}/auth/reset-pwd`
    };

    console.log(forgotPassword);
    return this.http.post<any>(`${this.baseUrl}/forgotPassword`, forgotPassword);
  }

  resetPassword(resetPassword: ResetPassword): any {
    console.log(resetPassword);
    return this.http.post<any>(`${this.baseUrl}/resetPassword`, resetPassword);
  }

  changePassword(userDetails: any): any {
    const resetPwdData = {
      oldPassword: userDetails.oldPwd,
      newPassword: userDetails.newPwd,
      email: localStorage.getItem('username')
    };
    console.log(resetPwdData);
    return this.http.post<any>(`${this.baseUrl}/changePassword`, resetPwdData);
  }

  twoStepLogin(twoFactorData: TwoFactor): any {
    console.log(twoFactorData);
    return this.http.post<any>(`${this.baseUrl}/twoStepVerification`, twoFactorData);
  }
}
