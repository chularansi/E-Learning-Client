import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  roleAdmin = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getRole() === 'Admin') {
      this.roleAdmin = true;
    }
  }
}
