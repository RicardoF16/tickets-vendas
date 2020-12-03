import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Carrinho } from 'src/app/_models/carrinho';
import { CarrinhoService } from 'src/app/_services/carrinho.service';
import { CustomValidators } from '../../util/customValidators';

@Component({
  selector: 'app-meu-carrinho',
  templateUrl: './meu-carrinho.page.html',
  styleUrls: ['./meu-carrinho.page.scss'],
})
export class MeuCarrinhoPage implements OnInit {

  idEvento: string = "";
  meuCarrinho: Carrinho;
  valorTotal: number;

  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private carrinhoService: CarrinhoService) {
  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.id) {
        this.idEvento = params.id;
        this.meuCarrinho = this.carrinhoService.getDadosCarrinho(this.idEvento) as Carrinho;
        debugger;
        this.valorTotal = this.meuCarrinho.valorTotal();
      } else {
        this.navCtrl.navigateRoot(['/']);
      }
    });
  }

  valorTotal(): number {
    if (this.meuCarrinho.ingressos && this.meuCarrinho.ingressos.length > 0) {
      let total = 0;
      this.meuCarrinho.ingressos.forEach(i => {
        if (i.qtdeSelecionada > 0 && i.valor) {
          total += Number(i.valor) * Number(i.qtdeSelecionada);
        }
      });
      return total;
    } else {
      return 0;
    }
  }


  getValorItem(valorItem) {
    return CustomValidators.getFormatPrice(parseFloat(valorItem));
  }

  avancarPagamento() {
    this.navCtrl.navigateRoot(['pagamento-cartao']);
  }

}
