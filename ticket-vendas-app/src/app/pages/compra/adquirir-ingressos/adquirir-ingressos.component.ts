import { Carrinho } from './../../../_models/carrinho';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { IngressoModel } from 'src/app/_models/IngressoModel';
import { EventoService } from 'src/app/_services/evento.service';
import { SetorEnum } from 'src/app/_models/enums';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { CarrinhoService } from 'src/app/_services/carrinho.service';

@Component({
  selector: 'app-adquirir-ingressos',
  templateUrl: './adquirir-ingressos.component.html',
  styleUrls: ['./adquirir-ingressos.component.scss'],
})
export class AdquirirIngressosComponent implements OnInit {
  idEvento: string = '';
  idDataEvento: string = '';
  listaLotes: Array<IngressoModel> = new Array();

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(
    private navCtrl: NavController,
    private gAlert: GenericAlertService,
    private eventoService: EventoService,
    private carrinhoService: CarrinhoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.id && params.idDataEvento) {
        this.idEvento = params.id;
        this.idDataEvento = params.idDataEvento;
        this.getLotes();
      } else {
        this.navCtrl.navigateRoot(['/']);
      }
    });
  }

  getLotes() {
    this.loading.showLoading();
    this.eventoService.getLotes(this.idEvento, this.idDataEvento).toPromise().then(result => {
      this.listaLotes = result;
      this.listaLotes.forEach(l => {
        l.qtdeSelecionada = 0;
        l.idDataEvento = this.idDataEvento;
      });
      this.getDadosCarrinho();
      this.loading.dismissAll();
    }).catch(err => {
      this.loading.dismissAll();
      if (err != null)
        this.gAlert.presentToastInfo('Não foi possível carregar as informações.');
    });
  }

  getSetorName(setor: number): string {
    return SetorEnum[setor];
  }

  getValorTotal(): string {
    let total = 0;
    const carrinho = this.carrinhoService.getDadosCarrinho(this.idEvento);
    if (carrinho && carrinho.ingressos && carrinho.ingressos.length > 0) {
      carrinho.ingressos.forEach(i => {
        if (i.idDataEvento == this.idDataEvento && i.qtdeSelecionada > 0 && i.valor) {
          total += Number(i.valor) * Number(i.qtdeSelecionada);
        }
      });
      return this.formatMoneyToString(total);
    } else {
      return 'R$ 0,00';
    }
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

  getDadosCarrinho() {
    const carrinho = this.carrinhoService.getDadosCarrinho(this.idEvento);
    if (carrinho && carrinho.idEvento == this.idEvento) {
      this.listaLotes.forEach(l => {
        const ingressos = carrinho.ingressos.find(i => i.id == l.id && i.idDataEvento == l.idDataEvento);
        if (ingressos) {
          l.qtdeSelecionada = ingressos.qtdeSelecionada;
        }
      })
    } else {
      this.carrinhoService.clear();
    }
  }

  removeItem(item) {
    if (item.qtdeSelecionada > 0) {
      item.qtdeSelecionada--;
    }
    this.atualizaCarrinho();
  }

  addItem(item) {
    if (item.qtdeSelecionada < (item.qtdeTotalTickets - item.qtdeTicketsVendidos)) {
      item.qtdeSelecionada++;
    } else {
      this.gAlert.presentToastInfo('Não é possível adicionar mais itens.');
    }
    this.atualizaCarrinho();
  }

  private atualizaCarrinho() {
    let carrinho: Carrinho = this.carrinhoService.getDadosCarrinho(this.idEvento);

    if (!carrinho)
      carrinho = new Carrinho();

    carrinho.idEvento = this.idEvento;
    if (carrinho.ingressos && carrinho.ingressos.length > 0) {
      this.listaLotes.forEach(lt => {
        const indexInCarrinho =
          carrinho.ingressos.findIndex(i => i.idDataEvento == lt.idDataEvento && i.id == lt.id);
        if (indexInCarrinho != -1) {
          if (lt.qtdeSelecionada > 0) {
            carrinho.ingressos[indexInCarrinho] = lt;
          } else {
            carrinho.ingressos = carrinho.ingressos.splice(indexInCarrinho, 1);
          }
        } else {
          if (lt.qtdeSelecionada > 0) {
            carrinho.ingressos.push(lt);
          }
        }
      });
    } else {
      carrinho.ingressos = [];

      this.listaLotes.forEach(lt => {
        if (lt.qtdeSelecionada > 0) {
          carrinho.ingressos.push(lt);
        }
      });
    }
    this.carrinhoService.setDadosCarrinho(carrinho);
  }

  concluirCompra(continuarComprando = false) {
    /*Vamos smepre passar pela a tela que faz a pergunta se é menor de idade, antes de chamar
    a tela meu-Carrinho*/

    let lotesSelecionados = this.listaLotes.filter(l => l.qtdeSelecionada > 0);
    if (lotesSelecionados && lotesSelecionados.length > 0) {
      if (continuarComprando) {
        this.gAlert.presentToastInfo('Você pode continuar comprando apenas ingressos do mesmo evento.')
        this.navCtrl.navigateRoot(['/evento'], { queryParams: { id: this.idEvento } });
      } else {
        this.navCtrl.navigateRoot(['./perfil/menor-idade']);
      }
    } else {
      this.gAlert.presentToastInfo('Selecione pelo menos 1 item para avançar!')
    }
  }

  adcionarCarrinho() {
    this.concluirCompra(true);
  }

  back() {
    window.history.back();
  }

}
