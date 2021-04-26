import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { CompraService } from 'src/app/_services/compra.service';
import * as moment from 'moment';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  minhasCompras: Array<any> = new Array<any>();

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(
    public navCtrl: NavController,
    private gAlert: GenericAlertService,
    private compraService: CompraService) { }

  ngOnInit() {
    this.getDados();
  }

  getDados() {
    this.loading.showLoading("Carregando os dados...");
    this.compraService.getMe().toPromise().then(result => {
      this.minhasCompras = result;
      this.loading.dismissAll();
    }).catch(err => {
      this.loading.dismissAll();
      if (err != null)
        this.gAlert.presentToastInfo('Não foi possível carregar as informações.');
    });
  }

  getDateFormated(date: string, format: string = 'DD/MM/YYYY'): string {
    if (date)
      return moment(date).locale('pt-br').format(format).toLocaleUpperCase();
    else
      return '';
  }

  navigate(id) {
    this.navCtrl.navigateRoot(['minhas-compras/detalhe'], { queryParams: { id: id } });
  }

}
