import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { CompraService } from 'src/app/_services/compra.service';
import { SetorEnum } from 'src/app/_models/enums';

@Component({
  selector: 'app-minha-compra',
  templateUrl: './minha-compra.component.html',
  styleUrls: ['./minha-compra.component.scss'],
})
export class MinhaCompraComponent implements OnInit {
  idCompra: string = '';
  dadosCompra: any;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(public navCtrl: NavController,
    private gAlert: GenericAlertService,
    private compraService: CompraService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loading.showLoading('Carregando...');
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.id) {
        this.idCompra = params.id;
        this.getDados();
      }
    });
  }

  getDados() {
    this.compraService.getById(this.idCompra).toPromise().then(result => {
      this.dadosCompra = result;
      this.loading.dismissAll();
    }).catch(err => {
      if (err)
        this.gAlert.presentToastError('Falha ao carregar os dados');
      this.loading.dismissAll();
    });
  }

  getDateFormated(date: string, format: string = 'DD/MM/YYYY'): string {
    if (date)
      return moment(date).locale('pt-br').format(format).toLocaleUpperCase();
    else
      return '';
  }
  
  getSetor(setor) {
    return SetorEnum[setor];
  }

  back() {
    this.navCtrl.navigateRoot(['/minhas-compras']);
  }

  getTicketDate(idDiaEvento, format: string = 'DD/MM/YYYY') {
    const diaEvento = this.dadosCompra.evento.diasEvento[idDiaEvento];
    return this.getDateFormated(diaEvento.dataInicio, format);
  }

  visualizarIngresso(ticket) {
    let dadosCompraSelecionado = {
      evento: this.dadosCompra.evento,
      dataCompra: this.dadosCompra.dataCompra,
      id: this.dadosCompra.id,
      idEvento: this.dadosCompra.idEvento,
      idUsuario: this.dadosCompra.idUsuario,
      valorTotal: this.dadosCompra.valorTotal,
      ticket: ticket
    };

    localStorage.setItem('dadosCompraSelecionado', JSON.stringify(dadosCompraSelecionado));
    this.navCtrl.navigateRoot(['/minhas-compras/ingresso'], { queryParams: { id: ticket.id } });
  }

}
