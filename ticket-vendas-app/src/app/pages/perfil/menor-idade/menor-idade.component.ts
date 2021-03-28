import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';

@Component({
  selector: 'app-menor-idade',
  templateUrl: './menor-idade.component.html',
  styleUrls: ['./menor-idade.component.scss'],
})
export class MenorIdadeComponent implements OnInit {

  termCheck: Boolean = false;  
  constructor(
    private navCtrl: NavController,
    private gAlert: GenericAlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {}
  
  back() {
    window.history.back();
  }

  menorIdade(){
    this.navCtrl.navigateRoot(['/evento/meu-carrinho']);
  }
  maiorIdade(){}
}
