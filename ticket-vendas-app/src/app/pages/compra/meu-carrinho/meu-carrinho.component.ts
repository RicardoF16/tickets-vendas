import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventoResponse } from 'src/app/_models/eventoModel';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import * as moment from 'moment';
import { Carrinho } from 'src/app/_models/carrinho';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { CarrinhoService } from 'src/app/_services/carrinho.service';
import { EventoService } from 'src/app/_services/evento.service';
import { IngressoModel } from 'src/app/_models/IngressoModel';
import { SetorEnum } from 'src/app/_models/enums';


@Component({
  selector: 'app-meu-carrinho',
  templateUrl: './meu-carrinho.component.html',
  styleUrls: ['./meu-carrinho.component.scss'],
})
export class MeuCarrinhoComponent implements OnInit {
  dadosEvento: EventoResponse;
  carrinho: Carrinho;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(
    private navCtrl: NavController,
    private gAlert: GenericAlertService,
    private eventoService: EventoService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.loading.showLoading('Carregando informações...');
    this.carrinho = this.carrinhoService.getCarrinho();
    if (this.carrinho)
      this.getDados(this.carrinho.idEvento);
    else {
      this.gAlert.presentToastError('Não existe nenhum item no carrinho.');
      setTimeout(() => {
        this.navCtrl.navigateRoot(['/home']);
      }, 1000);
    }
  }

  getDados(idEvento: string) {
    this.eventoService.getEventoById(idEvento).toPromise().then(result => {
      this.dadosEvento = result;
      this.loading.dismissAll();
    }).catch(err => {
      this.loading.dismissAll();
      this.gAlert.presentToastError('Erro ao carregar os dados, tente novamente.');
    });
  }

  getValorTotal(): string {
    let total = 0;
    if (this.carrinho && this.carrinho.ingressos && this.carrinho.ingressos.length > 0) {
      this.carrinho.ingressos.forEach(i => {
        if (i.qtdeSelecionada > 0 && i.valor) {
          total += Number(i.valor) * Number(i.qtdeSelecionada);
        }
      });
      return this.formatMoneyToString(total);
    } else {
      return 'R$ 0,00';
    }
  }

  getDateFormated(date: string, format: string = 'DD/MM/YYYY'): string {
    if (date)
      return moment(date).locale('pt-br').format(format);
    else
      return '';
  }

  formatMoneyToString(valor: number): string {
    try {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    } catch (e) {
      return '';
    }
  }

  getDescricaoIngresso(ingresso: IngressoModel): string {
    try {
      return `${ingresso.descricao} - ${SetorEnum[ingresso.setor]} - ${this.formatMoneyToString(ingresso.valor)}`;
    } catch (ex) {
      return '';
    }
  }

  avancar() {
    this.navCtrl.navigateRoot(['/cartao']);
  }

  back() {
    window.history.back();
  }

}
