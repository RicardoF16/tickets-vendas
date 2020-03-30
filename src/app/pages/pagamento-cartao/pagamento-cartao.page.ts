import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamento-cartao',
  templateUrl: './pagamento-cartao.page.html',
  styleUrls: ['./pagamento-cartao.page.scss'],
})
export class PagamentoCartaoPage implements OnInit {

  descricaoBandeira = '';
  constructor() { }

  ngOnInit() {
  }


  
  classDisplay(){
    let css = 'visivel'
    if (this.descricaoBandeira == '')
    {
      css = 'invisivel'
    }
    return css;
  }

  cadastrar(){}

}
