import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRegister } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup = new FormGroup({});

  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password
    });
  }

  registerUser(): void {
    const registerUserData: UserRegister = {
      firstname: this.userRegisterForm.value.firstname,
      lastname: this.userRegisterForm.value.lastname,
      username: this.userRegisterForm.value.username,
      password: this.userRegisterForm.value.password,
    };

    this.authService.registerUser(registerUserData).subscribe(
      (res: any) => {
        if (res.isSuccess) {
          this.toastr.success(res.message, 'User Registration', {
            timeOut: 8000, closeButton: true
          });
        }
      },
      (err: any) => {
        if (!err.error.isSuccess) {
          this.toastr.error(err.error.message, 'User Registration', {
            timeOut: 5000, closeButton: true
          });
        }
      }
    );
  }
}
