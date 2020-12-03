import { Component, OnInit, ViewChild } from '@angular/core';
import { IngressoModel } from '../../_models/IngressoModel';
import { NavController } from '@ionic/angular';
import { EventoService } from 'src/app/_services/evento.service';
import { ActivatedRoute } from '@angular/router';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { Carrinho } from 'src/app/_models/carrinho';
import { CarrinhoService } from 'src/app/_services/carrinho.service';


@Component({
  selector: 'app-escolher-ingresso',
  templateUrl: './escolher-ingresso.page.html',
  styleUrls: ['./escolher-ingresso.page.scss'],
})
export class EscolherIngressoPage implements OnInit {
  idEvento: string = '';
  idDataEvento: string = '';
  lotes: Array<IngressoModel>;

  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private eventoService: EventoService,
    private carrinhoService: CarrinhoService,
    private gAlert: GenericAlertService) { }

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

  getDadosCarrinho() {
    const carrinho = this.carrinhoService.getDadosCarrinho(this.idEvento);
    if (carrinho) {
      this.lotes.forEach(l => {
        const ingresso = carrinho.ingressos.find(i => i.id == l.id && i.idDataEvento == l.idDataEvento);
        if (ingresso) {
          l.qtdeSelecionada = ingresso.qtdeSelecionada;
        }
      })
    }
  }

  async getLotes() {
    this.eventoService.getLotes(this.idEvento, this.idDataEvento).toPromise().then(result => {
      this.lotes = result;
      this.lotes.forEach(l => {
        l.qtdeSelecionada = 0;
        l.idDataEvento = this.idDataEvento;
      });
      this.getDadosCarrinho();
    }).catch(err => {
      this.gAlert.presentToastInfo("Não foi possível carregar as informações.");
    });
  }

  addItem(item) {
    if (item.qtdeSelecionada > 0) {
      item.qtdeSelecionada--;
    }
  }

  removeItem(item) {
    if (item.qtdeSelecionada < (item.qtdeTotalTickets - item.qtdeTicketsVendidos)) {
      item.qtdeSelecionada++;
    } else {
      this.gAlert.presentToastInfo("Não é possível adicionar mais itens.");
    }
  }

  concluirCompra(continuarComprando: false) {
    let lotesSelecionados = this.lotes.filter(l => l.qtdeSelecionada > 0);
    if (lotesSelecionados && lotesSelecionados.length > 0) {
      let carrinho = new Carrinho()
      carrinho.idEvento = this.idEvento;
      carrinho.ingressos = lotesSelecionados;
      this.carrinhoService.setDadosCarrinho(carrinho);

      if (continuarComprando) {
        this.gAlert.presentToastInfo("Você pode continuar comprando apenas ingressos do mesmo evento.")
        this.navCtrl.navigateRoot(['/detalhe-evento'], { queryParams: { id: this.idEvento } });
      } else {
        this.navCtrl.navigateRoot(['/meu-carrinho'], { queryParams: { id: this.idEvento } });
      }
    } else {
      this.gAlert.presentToastInfo("Selecione pelo menos 1 item para avançar!")
    }
  }
}
