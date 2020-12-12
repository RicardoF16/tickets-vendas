import { Injectable } from '@angular/core';
import { Carrinho } from '../_models/carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  constructor() { }

  public setDadosCarrinho(objCarrinho: Carrinho) {
    objCarrinho.timestamp = new Date().getTime();
    localStorage.setItem('carrinho', JSON.stringify(objCarrinho));
  }

  public getDadosCarrinho(idEvento: string): Carrinho {
    let carrinhoStr = localStorage.getItem('carrinho');
    if (carrinhoStr) {
      const carrinho: Carrinho = JSON.parse(carrinhoStr);
      if (new Date().getTime() - carrinho.timestamp > 1054140000 || idEvento != carrinho.idEvento) {
        localStorage.removeItem('carrinho');
        return null;
      } else
        return carrinho;
    } else
      return null;
  }

  public clear() {
    localStorage.removeItem('carrinho');
  }


}
