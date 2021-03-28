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
    this.navCtrl.navigateRoot(['/evento/meu-carrinho']);
  }

  adcionarCarrinho() {
    this.navCtrl.navigateRoot(['/home']);
  }

  back() {
    window.history.back();
  }

}
