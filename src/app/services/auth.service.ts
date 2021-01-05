import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:44325/api/users';

  constructor(private http: HttpClient) { }

  testUser(): any {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  registerUser(user: UserRegister): any {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  loginUser(user: UserLogin): any {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  refreshUser(): any {
    const token = String(localStorage.getItem('token'));
    const refreshToken = String(localStorage.getItem('refreshToken'));

    const userRefreshToken: Token = { token, refreshToken };

    return this.http.post<any>(`${this.baseUrl}/refreshToken`, userRefreshToken);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): any {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // return this.http.post<any>(`${this.baseUrl}/logout`, user);
    // localStorage.removeItem('userId');
  }
}
