import { Injectable } from '@angular/core';
import { Carrinho } from '../_models/carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  constructor() { }

  public setDadosCarrinho(objCarrinho) {
    localStorage.setItem('carrinho', JSON.stringify(objCarrinho));
  }

  public getDadosCarrinho(): Carrinho {
    let carrinhoStr = localStorage.getItem('carrinho');
    if (carrinhoStr) {
      const carrinho: Carrinho = JSON.parse(carrinhoStr);
      if (carrinho.timestamp > 31624200000) {
        localStorage.removeItem('carrinho');
        return null;
      } else
        return carrinho;
    } else
      return null;
  }


}
