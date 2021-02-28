import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorService } from 'src/app/validators/validator.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  changePwdForm: FormGroup = new FormGroup({});

  oldPwd = new FormControl('', [Validators.required]);
  newPwd = new FormControl('', [Validators.required]);
  confirmPwd = new FormControl('', [Validators.required, this.validatorService.MustMatch(this.newPwd)]);

  constructor(private fb: FormBuilder, private authService: AuthService, private validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.changePwdForm = this.fb.group({
      oldPwd: this.oldPwd,
      newPwd: this.newPwd,
      confirmPwd: this.confirmPwd
    });
  }

  onSubmit(): void {
    if (this.changePwdForm.valid) {
      const userData = {
        oldPwd: this.changePwdForm.value.oldPwd,
        newPwd: this.changePwdForm.value.newPwd
      };

      this.authService.changePassword(userData).subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
}
