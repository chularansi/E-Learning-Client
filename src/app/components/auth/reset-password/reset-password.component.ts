import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorService } from 'src/app/validators/validator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPwdForm: FormGroup = new FormGroup({});

  newPwd = new FormControl('', [Validators.required]);
  confirmPwd = new FormControl('', [Validators.required, this.validatorService.MustMatch(this.newPwd)]);

  private token = '';
  private email = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorService: ValidatorService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetPwdForm = this.fb.group({
      newPwd: this.newPwd,
      confirmPwd: this.confirmPwd
    });

    this.route.queryParams.subscribe(params => {
      this.email = params.Email;
      this.token = params.Token;
    });
  }

  onSubmit(): void {
    if (this.resetPwdForm.valid) {
      const resetPasswordData: ResetPassword = {
        password: this.resetPwdForm.value.newPwd,
        email: this.email,
        token: this.token
      };

      this.authService.resetPassword(resetPasswordData).subscribe(
        (res: any) => {
          if (res.isSuccess) {
            this.toastr.success(res.message, 'User Reset Password', {
              timeOut: 5000, closeButton: true
            });
          }
        },
        (err: any) => {
          if (!err.error.isSuccess) {
            this.toastr.error(err.error.message, 'User Reset Password', {
              timeOut: 5000, closeButton: true
            });
          }
        }
      );
    }
  }
}
