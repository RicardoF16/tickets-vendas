import { Informacoes } from './../../_models/selecionar-data-evento';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EventosResponse } from 'src/app/_models/home';
import { DetalheEventoService } from 'src/app/_services/detalhe-evento.service';
import { SelecionarDataEventoService } from 'src/app/_services/selecionar-data-evento.service';

@Component({
  selector: 'app-selecionar-data-evento',
  templateUrl: './selecionar-data-evento.page.html',
  styleUrls: ['./selecionar-data-evento.page.scss'],
})
export class SelecionarDataEventoPage implements OnInit {
  
   selDataEventoService :Array<Informacoes>;
   dadosEvento: EventosResponse;

  constructor(public navCtrl: NavController,
              private detalheEventoService : DetalheEventoService,
              private selecionarDataEventoService: SelecionarDataEventoService) { }

  ngOnInit(){

    this.dadosEvento =  this.detalheEventoService.getDadosEvento();
    /*O objeto de "informacoes" é transformado em uma lista de objetos do tipo <Informacacoes>,
      desta forma conseguimos trabalhar com comandos de loop.
    */ 
    this.selDataEventoService = new Array<Informacoes>();
    if (this.dadosEvento.informacoes != null) {
      Object.keys(this.dadosEvento.informacoes)
        .forEach(key => {
          this.selDataEventoService.push(this.dadosEvento.informacoes[key]);
        });   
     }
    // 
  }

  selecionarSetor(objDataSelecinada)
  {
    this.selecionarDataEventoService.setDataSelecinada(objDataSelecinada);
    this.navCtrl.navigateRoot(['/escolher-ingresso']);
  }

}
