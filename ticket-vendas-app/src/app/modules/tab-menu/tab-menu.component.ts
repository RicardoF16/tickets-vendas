import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit {
  menuSelected: string = ''

  constructor(private router: Router) { }

  ngOnInit() {
    const url = window.location.href;
    if (url.indexOf('home') != -1) {
      this.menuSelected = 'home';
    } else if (url.indexOf('perfil') != -1) {
      this.menuSelected = 'perfil';
    } else if (url.indexOf('meus-tickets') != -1) {
      this.menuSelected = 'tickets';
    } else {
      this.menuSelected = '';
    }
  }

  navigate(url) {
    this.router.navigate([url]);
  }
}