import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  testUser(): void {
    // this.authService.testUser().subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (err: any) => {
    //     console.log(err);
    //   }
    // );
  }
}
