import { Carrinho } from './../../../_models/carrinho';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';

@Component({
  selector: 'app-adquirir-ingressos',
  templateUrl: './adquirir-ingressos.component.html',
  styleUrls: ['./adquirir-ingressos.component.scss'],
})
export class AdquirirIngressosComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private gAlert: GenericAlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  concluirCompra() {
    /*Vamos smepre passar pela a tela que faz a pergunta se é menor de idade, antes de chamar
    a tela meu-Carrinho*/
    this.navCtrl.navigateRoot(['./perfil/menor-idade']);
  }

  adcionarCarrinho() {
    //this.navCtrl.navigateRoot(['/evento/']);
  }

  back() {
    window.history.back();
  }

}
