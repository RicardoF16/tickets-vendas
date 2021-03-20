import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

  onClick(id) {
    this.navCtrl.navigateRoot(['minhas-compras/detalhe'], { queryParams: { id: id } });
  }

}
