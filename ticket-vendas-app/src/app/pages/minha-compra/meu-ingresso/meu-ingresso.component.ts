import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-ingresso',
  templateUrl: './meu-ingresso.component.html',
  styleUrls: ['./meu-ingresso.component.scss'],
})
export class MeuIngressoComponent implements OnInit {
  qrCode: String = "bla";
  
  constructor() { }

  ngOnInit() {}

}
