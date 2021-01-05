import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';
import { UserLogin } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: UserLogin = { username: '', password: ''};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.authService.loginUser(this.loginUserData).subscribe(
      (res: Token) => {
        localStorage.setItem('username', String(res.username)),
        localStorage.setItem('token', String(res.token));
        localStorage.setItem('refreshToken', String(res.refreshToken));
        localStorage.setItem('roles', String(res.roles));
        this.router.navigate(['/home']);
      },
      (err: any) => {
        console.log('login Error:', err);
      }
    );
  }
}
