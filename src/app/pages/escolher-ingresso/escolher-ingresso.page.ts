import { Component, OnInit } from '@angular/core';
import { Ingresso} from './../../_models/form-escolher-ingressos';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-escolher-ingresso',
  templateUrl: './escolher-ingresso.page.html',
  styleUrls: ['./escolher-ingresso.page.scss'],
})
export class EscolherIngressoPage implements OnInit {

  qtde = 0;
  ingresso : Array<Ingresso> = new Array<Ingresso>();

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.carregarListaIngresos();
  }

  codigoIngreso: string;
    descricaoIngresso: string;
    valor: string;
    tipo: number;    

  carregarListaIngresos(){
    this.ingresso = [
                     {
                      codigoIngreso:'001',
                      descricaoIngresso: '',
                      qtd: 0,
                      valor: 'R$15,00',
                      setor: 'Pista',    
                      lote: '1º Lote'
                     },
                     {
                      codigoIngreso:'002',
                      descricaoIngresso: '',
                      qtd: 0,
                      valor: 'R$25,00',
                      setor: 'Camarote',    
                      lote: '1º Lote'
                     }
                   ];
  }

  insereItem(codigoIngreso) {
    let index = 0;
    this.ingresso.forEach(item => {
      if (item.codigoIngreso == codigoIngreso)
      {
        this.ingresso[index].qtd += 1;
      }
      index += 1;
    });
  }

  retiraItem(codigoIngreso){
    let index = 0;
    this.ingresso.forEach(item => {
      if (item.codigoIngreso == codigoIngreso)
      {
        this.ingresso[index].qtd -= 1;
      }
      index += 1;
    });
  }

  meuCarrinho(){
    this.navCtrl.navigateRoot(['/meu-carrinho']);
  }

}
