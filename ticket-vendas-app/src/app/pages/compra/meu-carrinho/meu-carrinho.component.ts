import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';


@Component({
  selector: 'app-meu-carrinho',
  templateUrl: './meu-carrinho.component.html',
  styleUrls: ['./meu-carrinho.component.scss'],
})
export class MeuCarrinhoComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private gAlert: GenericAlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {}

  avancar(){
    this.navCtrl.navigateRoot(['/cartao']);
  }

  back() {
    window.history.back();
  }

}
