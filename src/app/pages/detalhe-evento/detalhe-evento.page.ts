import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.page.html',
  styleUrls: ['./detalhe-evento.page.scss'],
})
export class DetalheEventoPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  escolherIngresso(){
    this.navCtrl.navigateRoot(['/escolher-ingresso']);
  }

}
