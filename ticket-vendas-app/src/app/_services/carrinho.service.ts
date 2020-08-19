import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  carrinho: any; 
  constructor() { }
  
  public setDadosCarrinho(objCarrinho){
    this.carrinho = objCarrinho;
  }

  public getDadosCarrinho(){
    return this.carrinho;
  }


}
