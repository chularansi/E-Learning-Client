import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  menuItems = [
    {id: 1, item: 'home'},
    {id: 2, item: 'category'},
    {id: 3, item: 'subject'},
    {id: 4, item: 'lectures'},
    {id: 5, item: 'notes'},
    {id: 6, item: 'events'},
    {id: 7, item: 'info'}
  ];

  activeLink = 1;
  categories: any;

  constructor() { }

  ngOnInit(): void {
  }

  onClickLink(id: number): void {
    this.activeLink = id;
  }
}
