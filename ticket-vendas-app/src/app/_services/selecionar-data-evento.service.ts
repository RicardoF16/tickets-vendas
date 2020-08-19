import { Informacoes } from './../_models/selecionar-data-evento';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelecionarDataEventoService {

  dataSelecionada: any; 
  constructor() { }
  
  public setDataSelecinada(objDataSelecionada){
    this.dataSelecionada = objDataSelecionada;
  }

  public getDataSelecinada(){
    return this.dataSelecionada;
  }

}
