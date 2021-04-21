import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaoResponse } from 'src/app/_models/cartaoResponse';
import { CarrinhoService } from 'src/app/_services/carrinho.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  cartoes: Array<CartaoResponse> = Array<CartaoResponse>();
  cartSelected: any = null;
  isSelection: boolean = false;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    const url = window.location.href;
    if (url.indexOf('selection') != -1)
      this.isSelection = true;

    this.mockCartoes();
  }

  mockCartoes() {
    for (let i = 0; i < 3; i++) {
      let cartao: CartaoResponse = new CartaoResponse();
      cartao.id = i.toString();
      cartao.cart_number = `**** **** **** 000${i}`;
      cartao.cvv = ''
      cartao.month_expiration = '07';
      cartao.year_expiration = '20';
      cartao.name = 'Teste Mock';

      this.cartoes.push(cartao);
    }
  }

  back() {
    window.history.back();
  }

  selectCard() {
    this.carrinhoService.setCreditCard(this.cartSelected);
    window.history.back();
  }

  navigate() {
    this.router.navigate(['/cartao/action']);
  }

}
