import { forEach } from '@angular/router/src/utils/collection';
import { Carrinho } from './../../_models/carrinho';
import { Informacoes } from 'src/app/_models/selecionar-data-evento';
import { Component, OnInit } from '@angular/core';
import { Ingresso} from './../../_models/form-escolher-ingressos';
import { NavController } from '@ionic/angular';
import { EventoResponse } from 'src/app/_models/eventoModel';
import { CarrinhoService } from 'src/app/_services/carrinho.service';


@Component({
  selector: 'app-escolher-ingresso',
  templateUrl: './escolher-ingresso.page.html',
  styleUrls: ['./escolher-ingresso.page.scss'],
})
export class EscolherIngressoPage implements OnInit {

  selSetor :Array<Ingresso>;
  dadosEvento: EventoResponse;
  Informacoes: Informacoes;
  carrinho: Array<Ingresso>;
  

  qtde = 0;
  //ingresso : Array<Ingresso> = new Array<Ingresso>();
  constructor(public navCtrl: NavController,
              private carrinhoService:CarrinhoService) { }

  ngOnInit() {
    this.carregarListaIngresos();
  }

  descricaoIngresso: string;
  valor: string;
  tipo: number;    

  carregarListaIngresos(){
    
    // this.Informacoes = this.selecionarDataEventoService.getDataSelecinada();
    // this.dadosEvento =  this.detalheEventoService.getDadosEvento();
    /*O objeto de "Ingresso" é transformado em uma lista de objetos do tipo <Ingresso>,
      desta forma conseguimos trabalhar com comandos de loop.
    */ 
    this.selSetor = new Array<Ingresso>();
    if (this.Informacoes != null) {
      Object.keys(this.Informacoes.setor)
        .forEach(key => {
          this.selSetor.push(this.Informacoes.setor[key]);
        });   
    }

    this.selSetor.forEach(ingresso => {
      ingresso.qtd = 0;
    });
   
  }

  insereItem(id) {
    
    let index = 0;
    this.selSetor.forEach(item => {
      if (item.id == id)
      {
        item.qtd += 1;
      }
      index += 1;
    });
  }

  retiraItem(id){
    
    let index = 0;
    this.selSetor.forEach(item => {
      if (item.id == id)
      {
        item.qtd -= 1;
      }
      index += 1;
    });
  }

  meuCarrinho(){
    
    this.carrinho = new Array<Ingresso>();
    this.selSetor.forEach( item =>{
      if(item.qtd > 0){
         this.carrinho.push({...item});  
      }
    });
    
    this.carrinhoService.setDadosCarrinho(this.carrinho);
    this.navCtrl.navigateRoot(['/meu-carrinho']);
  }

}
