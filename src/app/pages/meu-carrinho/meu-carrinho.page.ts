import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-meu-carrinho',
  templateUrl: './meu-carrinho.page.html',
  styleUrls: ['./meu-carrinho.page.scss'],
})
export class MeuCarrinhoPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  avancarPagamento(){
    this.navCtrl.navigateRoot(['pagamento-cartao']);
  }

}
