import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';

@Component({
  selector: 'app-meu-ingresso',
  templateUrl: './meu-ingresso.component.html',
  styleUrls: ['./meu-ingresso.component.scss'],
})
export class MeuIngressoComponent implements OnInit {
  qrCode: String = '';
  dadosCompra: any;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.loading.showLoading('Carregando...');
      if (params && params.id) {
        this.dadosCompra = JSON.parse(localStorage.getItem('dadosCompraSelecionado'));
        this.qrCode = params.id;
      }
      this.loading.dismissAll();
    });
  }

  getDateFormated(date: string, format: string = 'DD/MM/YYYY'): string {
    if (date)
      return moment(date).locale('pt-br').format(format);
    else
      return '';
  }

  getTicketDateInfo() {
    const diaEvento = this.dadosCompra.evento.diasEvento[this.dadosCompra.ticket.idDataEvento];
    return this.getDateFormated(diaEvento.dataInicio, 'DD [de] MMMM dddd');
  }

  getTicketHourAbertura() {
    const diaEvento = this.dadosCompra.evento.diasEvento[this.dadosCompra.ticket.idDataEvento];
    return diaEvento.horaAbertura;
  }

  getTicketHourShow() {
    const diaEvento = this.dadosCompra.evento.diasEvento[this.dadosCompra.ticket.idDataEvento];
    return diaEvento.horaShow;
  }  

  back() {
    window.history.back();
  }
}
