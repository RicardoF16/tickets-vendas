import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  cartSelected: any = null;

  constructor(private router: Router) { }

  ngOnInit() { }

  back() {
    window.history.back();
  }

  navigate() {
    this.router.navigate(['/cartao/action']);
  }

}
