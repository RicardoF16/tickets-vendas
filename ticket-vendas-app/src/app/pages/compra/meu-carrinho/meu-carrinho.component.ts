import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { EventoResponse } from 'src/app/_models/eventoModel';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import * as moment from 'moment';
import { Carrinho } from 'src/app/_models/carrinho';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { CarrinhoService } from 'src/app/_services/carrinho.service';
import { EventoService } from 'src/app/_services/evento.service';
import { IngressoModel } from 'src/app/_models/IngressoModel';
import { SetorEnum } from 'src/app/_models/enums';
import { CompraService } from 'src/app/_services/compra.service';
import { ThrowStmt } from '@angular/compiler';


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
    private compraService: CompraService,
    public alertController: AlertController,
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
      if (err != null)
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

  getDateIngresso(id: string): string {
    if (this.dadosEvento && this.dadosEvento.diasEvento) {
      const diaEvento = this.dadosEvento.diasEvento.find(dE => dE.id == id);
      if (diaEvento)
        return this.getDateFormated(diaEvento.dataInicio);
      else return '';
    } else return '';
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

  async presentAlertConfirm(index) {
    const alert = await this.alertController.create({
      header: 'Excluir Ingresso(s)',
      message: 'Deseja excluír esse(s) ingresso(s) do seu pedido?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluirDoCarrinho(index);
          }
        }
      ]
    });

    await alert.present();
  }

  excluirDoCarrinho(index: number) {
    this.loading.showLoading('Processando...');
    this.carrinho.ingressos.splice(index, 1);
    this.carrinhoService.setDadosCarrinho(this.carrinho);
    setTimeout(() => {
      this.loading.dismissAll();
    }, 500);
  }

  avancar() {
    if (this.carrinho.cardSelected) {
      if (this.carrinho.ingressos.length > 0)
        this.concluirCompra();
      else
        this.gAlert.presentToastInfo('Não exite nenhum item no seu carrinho!');
    } else {
      this.selecionarPagamento();
    }
  }

  concluirCompra() {
    this.compraService.post(this.carrinho).toPromise().then(result => {
      this.carrinhoService.clear();
      this.navCtrl.navigateRoot(['/minhas-compras/detalhe'], { queryParams: { id: (result as any).id } });
      this.gAlert.presentToastSuccess('Sua compra foi realizada com sucesso!');
    }).catch(err => {
      this.carrinhoService.clear();
      this.gAlert.presentToastError('Não foi possível registrar a compra, tente novamente mais tarde!');
      this.navCtrl.navigateRoot(['/']);
    });
  }

  selecionarPagamento() {
    this.navCtrl.navigateRoot(['/cartao/selection']);
  }

  back() {
    this.navCtrl.navigateRoot(['/evento'], {
      queryParams:
        { id: this.carrinho.idEvento }
    });
  }
}
