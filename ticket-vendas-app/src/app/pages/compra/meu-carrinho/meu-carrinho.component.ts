import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-carrinho',
  templateUrl: './meu-carrinho.component.html',
  styleUrls: ['./meu-carrinho.component.scss'],
})
export class MeuCarrinhoComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  avancar(){}

  back() {
    window.history.back();
  }

}
