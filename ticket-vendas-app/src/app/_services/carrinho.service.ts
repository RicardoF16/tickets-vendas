import { Injectable } from '@angular/core';
import { Carrinho } from '../_models/carrinho';
import { CartaoResponse } from '../_models/cartaoResponse';

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

  public getValorTotal(): number {
    const carrinho = this.getCarrinho();
    let valorTotal = 0;
    if (carrinho && carrinho.ingressos && carrinho.ingressos.length > 0) {
      for (const i of carrinho.ingressos) {
        valorTotal += Number(i.valor) * Number(i.qtdeSelecionada);
      }
    }
    return valorTotal;
  }

  public getValorTotalPorDia(idDia: string): number {
    const carrinho = this.getCarrinho();
    let valorTotal = 0;
    if (carrinho && carrinho.ingressos && carrinho.ingressos.length > 0) {
      for (const i of carrinho.ingressos) {
        if (i.idDataEvento === idDia) {
          valorTotal += Number(i.valor) * Number(i.qtdeSelecionada);
        }
      }
    }
    return valorTotal;
  }

  // Retorna carrinho salvo se for válido
  public getCarrinho(): Carrinho {
    let carrinhoStr = localStorage.getItem('carrinho');
    if (carrinhoStr) {
      const carrinho: Carrinho = JSON.parse(carrinhoStr);
      if (new Date().getTime() - carrinho.timestamp > 1054140000) {
        localStorage.removeItem('carrinho');
        return null;
      } else
        return carrinho;
    } else
      return null;
  }

  public setCreditCard(cart: CartaoResponse) {
    let carrinho = this.getCarrinho();
    carrinho.cardSelected = cart;
    this.setDadosCarrinho(carrinho);
  }

  public clear() {
    localStorage.removeItem('carrinho');
  }
}
