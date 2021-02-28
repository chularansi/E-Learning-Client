import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPwdForm: FormGroup = new FormGroup({});
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.forgotPwdForm = this.fb.group({
      email: this.email
    });
  }

  onSubmit(): void {
    const userEmail: any = this.forgotPwdForm.value.email;

    this.authService.forgotPassword(userEmail).subscribe(
      (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(res.message, 'User Forgot Password', {
            timeOut: 5000, closeButton: true
          });
        }
      },
      (err: any) => {
        if (!err.error.isSuccess) {
          this.toastr.error(err.error.message, 'User Forgot Password', {
            timeOut: 5000, closeButton: true
          });
        }
      }
    );
  }
}
