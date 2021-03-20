import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { EventoResponse } from 'src/app/_models/eventoModel';
import { EventoService } from 'src/app/_services/evento.service';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.component.html',
  styleUrls: ['./detalhe-evento.component.scss'],
})
export class DetalheEventoComponent implements OnInit {

  idEvento: string = '';
  dadosEvento: EventoResponse;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(
    private navCtrl: NavController,
    private eventoService: EventoService,
    private gAlert: GenericAlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loading.showLoading('Carregando informações...');
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
      this.loading.dismissAll();
    }).catch(err => {
      this.loading.dismissAll();
      this.gAlert.presentToastError('Erro ao carregar os dados, tente novamente.');
    });
  }

  escolherIngresso() {
    this.navCtrl.navigateRoot(['/selecionar-data-evento'], { queryParams: { id: this.idEvento } });
  }
}
