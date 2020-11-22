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

  async getLotes() {
    this.eventoService.getLotes(this.idEvento, this.idDataEvento).toPromise().then(result => {
      this.lotes = result;
      this.lotes.forEach(l => { 
        l.qtdeSelecionada = 0; 
        l.idDataEvento = this.idDataEvento;
      });

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

      // TODO: VERIFICAR SE CONTINUA COMPRANDO E REDIRECIONAR PRA DEVIDA TELA 
    } else {
      this.gAlert.presentToastInfo("Selecione pelo menos 1 item para avançar!")
    }
  }
}
