import { Component, OnInit } from '@angular/core';
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
  
  valorToal = "";
  meuCarrinho: Array<Carrinho> = new Array<Carrinho>();
  
  constructor(public navCtrl: NavController,
              private carrinhoService: CarrinhoService) { }


  ngOnInit() {
    this.meuCarrinho = this.carrinhoService.getDadosCarrinho();
    ///console.log('Meu Carrinho >> ', this.meuCarrinho);
    this.setValorTotal();
  }


  getValorItem(valorItem){
    return CustomValidators.getFormatPrice(parseFloat(valorItem));
  }
  
  getValorTotalItem(item){
    let somatoriaItemTotal = 0;
    somatoriaItemTotal = (parseFloat(item.valor) * item.qtd) ;
    return CustomValidators.getFormatPrice(somatoriaItemTotal);
  }
  
  setValorTotal(){
    let somatoriaValorTotal = 0;
    this.meuCarrinho.forEach(item => {
      somatoriaValorTotal += (parseFloat(item.valor) * item.qtd) ;
    });

    this.valorToal = CustomValidators.getFormatPrice(somatoriaValorTotal);
  }

  avancarPagamento(){
    this.navCtrl.navigateRoot(['pagamento-cartao']);
  }

}
