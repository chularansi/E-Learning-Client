import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: UserRegister = { firstname: '', lastname: '', username: '', password: '' };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.authService.registerUser(this.registerUserData).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
    // console.log(this.registerUserData);
  }
}
