import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalheEventoService {

  dadosEvento: any; 
  constructor() { }
  
  public setDadosEvento(objEvento){
    this.dadosEvento = objEvento;
  }

  public getDadosEvento(){
    return this.dadosEvento;
  }


}
