
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EventoService } from '../../_services/evento.service'
import { EventoResponse } from '../../_models/eventoModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.page.html',
  styleUrls: ['./detalhe-evento.page.scss'],
})
export class DetalheEventoPage implements OnInit {

  idEvento: string = '';
  dadosEvento: EventoResponse;

  constructor(public navCtrl: NavController,
    private eventoService: EventoService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.id) {
        this.idEvento = params.id;
        this.getDados();
      }
    });
  }

  getDados() {
    this.eventoService.getEventoById(this.idEvento).toPromise().then(result => {
      this.dadosEvento = result;
    }).catch(err => {
      console.log("erro", err);
    });
  }

  escolherIngresso() {
    this.navCtrl.navigateRoot(['/selecionar-data-evento'], {queryParams: {id: this.idEvento}});
  }

}
