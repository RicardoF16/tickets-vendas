import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adquirir-ingressos',
  templateUrl: './adquirir-ingressos.component.html',
  styleUrls: ['./adquirir-ingressos.component.scss'],
})
export class AdquirirIngressosComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  back() {
    window.history.back();
  }
}
