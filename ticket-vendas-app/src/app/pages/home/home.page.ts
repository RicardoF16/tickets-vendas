import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { GenericAlertService } from '../../_services/generic-alert.service';
import { EventoService } from '../../_services/evento.service'
import { EventoResponse } from '../../_models/eventoModel';
import { DestaqueResponse } from '../../_models/destaqueModel';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(LoadingComponent) loading: LoadingComponent;
  eventos: Array<EventoResponse>;
  destaques: Array<DestaqueResponse> = [];

  slideOpts: any = {
    slidesPerView: 1,
    speed: 300,
    autoplay:true,
    pagination: true
  };

  constructor(
    public navCtrl: NavController,
    private eventoService: EventoService,
    private gAlert: GenericAlertService
  ) { }

  ngOnInit() {
    this.loading.showLoading("Carregando os dados, aguarde...");
    this.getDestaques();
  }

  getDestaques() {
    this.eventoService.getDestaques().toPromise().then(res => {
      this.destaques = res;
      this.getEventos();
    }).catch(err => {
      this.loading.dismissAll();
      this.gAlert.presentToastError('Não foi possível carregar os destaques.');
    });
  }

  getEventos() {
    this.eventoService.getEventos().toPromise().then(res => {
      this.eventos = res;
      this.loading.dismissAll();
    }).catch(err => {
      this.loading.dismissAll();
      this.gAlert.presentToastError('Não foi possível carregar os eventos.');
    });
  }

  getDateFormated(date: string, format: string = 'DD/MM/YYYY'): string {
    if (date)
      return moment(date).locale('pt-br').format(format).toLocaleUpperCase();
    else
      return '';
  }

  openLink(destaque: DestaqueResponse) {
    if (destaque.idEvento && destaque.idEvento != '') {
      this.visaoEvento(destaque.idEvento);
    } else {
      window.open(destaque.link, '_blank');
    }
  }

  visaoEvento(id: string) {
    // this.navCtrl.navigateRoot(['/detalhe-evento'], { queryParams: { id: id } });
    this.navCtrl.navigateRoot(['/evento'], { queryParams: { id: id } });
  }

}
