import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from 'src/app/models/auth-response';
import { TwoFactor } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.css']
})
export class TwoStepVerificationComponent implements OnInit {

  twoFactorForm: FormGroup = new FormGroup({});

  twoFactorCode = new FormControl('', [Validators.required]);

  private provider = '';
  private email = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.twoFactorForm = this.fb.group({
      twoFactorCode: this.twoFactorCode,
    });

    this.route.queryParams.subscribe(params => {
      this.email = params.email;
      this.provider = params.provider;
    });
  }

  onSubmit(): void {
    if (this.twoFactorForm.valid) {
      const twoFactorData: TwoFactor = {
        email: this.email,
        provider: this.provider,
        token: this.twoFactorForm.value.twoFactorCode
      };

      this.authService.twoStepLogin(twoFactorData).subscribe(
        (res: AuthResponse) => {
          console.log(res);
          localStorage.setItem('username', String(res.username)),
          localStorage.setItem('token', String(res.token));
          localStorage.setItem('refreshToken', String(res.refreshToken));
          localStorage.setItem('roles', String(res.roles));
          this.router.navigate(['/home']);
          this.toastr.success(`${res.username} Login Successfully`, 'User Login', {
            timeOut: 5000, closeButton: true
          });
        },
        (err: any) => {
          console.log('login Error:', err);
          this.toastr.success('Login not success', 'User Login', {
            timeOut: 5000, closeButton: true
          });
        }
      );
    }
  }

}
