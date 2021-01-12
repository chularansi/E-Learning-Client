import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPwdForm: FormGroup = new FormGroup({});
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.forgotPwdForm = this.fb.group({
      email: this.email
    });
  }

  onSubmit(): void {
    const userEmail: any = this.forgotPwdForm.value.email;

    this.authService.forgotPassword(userEmail).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
