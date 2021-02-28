import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from 'src/app/models/auth-response';
import { UserLogin } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: UserLogin = { username: '', password: ''};

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.authService.loginUser(this.loginUserData).subscribe(
      (res: AuthResponse) => {
        if (res.is2StepVerificationRequired) {
          this.router.navigate(['/auth/two-step-verification'], {queryParams: {
            provider: res.provider, email: this.loginUserData.username
          }});
        } else {
          console.log(res);
          localStorage.setItem('username', String(res.username)),
          localStorage.setItem('token', String(res.token));
          localStorage.setItem('refreshToken', String(res.refreshToken));
          localStorage.setItem('roles', String(res.roles));
          this.router.navigate(['/home']);
          this.toastr.success(`${res.username} Login Successfully`, 'User Login', {
            timeOut: 5000, closeButton: true
          });
        }
      },
      (err: any) => {
        console.log('login Error:', err);
        this.toastr.error('Login not success', 'User Login', {
          timeOut: 5000, closeButton: true
        });
      }
    );
  }
}
