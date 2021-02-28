import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.refreshToken().subscribe(
      (res: any) => { console.log(res); }
    );
  }

}
