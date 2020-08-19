

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { GenericAlertService } from '../_services/generic-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from '../_services/home.service'
import { DetalheEventoService } from '../_services/detalhe-evento.service'
import { EventosResponse } from '../_models/home';

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
  eventos: EventosResponse;

  constructor(public navCtrl: NavController,
              private homeService: HomeService,
              private detalheEventoService: DetalheEventoService,
              private gAlert: GenericAlertService,
              private translate: TranslateService) { }

  async ngOnInit() {
  await this.loading.showLoading();
  this.homeService.getEventos()
            .subscribe( async res => {
              this.eventos = res.list;
              //console.log('Eventos >> ', this.eventos);
              await this.loading.dismissLoading();
            }, async () => {
              await this.loading.dismissLoading();
            });
}

  visaoEvento(evento){
    this.detalheEventoService.setDadosEvento(evento);
    this.navCtrl.navigateRoot(['/detalhe-evento']);
  }


  segmentChanged(ev: any) {
    //this.resetAll();
  }

}
