
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DetalheEventoService } from '../../_services/detalhe-evento.service'
import { SelecionarDataEventoService } from '../../_services/selecionar-data-evento.service'
import { EventosResponse } from './../../_models/home';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.page.html',
  styleUrls: ['./detalhe-evento.page.scss'],
})
export class DetalheEventoPage implements OnInit {

  dadosEvento: EventosResponse

  constructor(public navCtrl: NavController,
              private detalheEventoService : DetalheEventoService,
              private selecionarDataEventoService : SelecionarDataEventoService
              ) { }

  ngOnInit() {
    this.dadosEvento =  this.detalheEventoService.getDadosEvento();
  }
  
  escolherIngresso(){
      this.navCtrl.navigateRoot(['/selecionar-data-evento']);
  }

}
