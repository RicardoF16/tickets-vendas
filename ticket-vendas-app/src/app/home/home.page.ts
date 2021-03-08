import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { GenericAlertService } from '../_services/generic-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { EventoService } from '../_services/evento.service'
import { EventoResponse } from '../_models/eventoModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  msgLoading: string;
  @ViewChild(LoadingComponent) loading: LoadingComponent;
  private translations: {
    PAGE_LOGIN_USER_PASSWORD_WRONG: string;
    PAGE_LOGIN_LOADING_CONFIG: string;
    PAGE_LOGIN_MAKING_LOGIN: string;
    PAGE_LOGIN_LOGIN_ERROR: string;
    PAGE_LOGIN_LOGIN_AUTH_ERROR: string;
    PAGE_LOGIN_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: string;
    ATTENTION: string;
  };
  eventos: EventoResponse;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400,
    pagination: true
  };

  constructor(public navCtrl: NavController,
              private eventoService: EventoService,
              private gAlert: GenericAlertService,
              private translate: TranslateService) { }

  async ngOnInit() {
  await this.loading.showLoading();
  this.eventoService.getEventos()
            .subscribe( async res => {
              this.eventos = res;
              //console.log('Eventos >> ', this.eventos);
              await this.loading.dismissLoading();
            }, async () => {
              await this.loading.dismissLoading();
            });
}

  visaoEvento(evento: EventoResponse){
    this.navCtrl.navigateRoot(['/detalhe-evento'], {queryParams: {id: evento.id}});
  }

}
