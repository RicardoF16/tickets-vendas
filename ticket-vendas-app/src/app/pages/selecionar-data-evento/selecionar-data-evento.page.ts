import { Informacoes } from './../../_models/selecionar-data-evento';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DiasEventoResponse} from 'src/app/_models/eventoModel';
import { EventoService } from 'src/app/_services/evento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selecionar-data-evento',
  templateUrl: './selecionar-data-evento.page.html',
  styleUrls: ['./selecionar-data-evento.page.scss'],
})
export class SelecionarDataEventoPage implements OnInit {

  idEvento: string = '';
  datas: Array<DiasEventoResponse>;

  constructor(public navCtrl: NavController,
    private eventoService: EventoService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.id) {
        this.idEvento = params.id;
        this.getDatas();
      }
    });
  }

  getDatas() {
    this.eventoService.getDatas(this.idEvento).toPromise().then(result => {
      this.datas = result;
    }).catch(err => {
      console.log("erro", err);
    });
  }

  selecionarSetor(data) {
    this.navCtrl.navigateRoot(['/escolher-ingresso'], {queryParams: {id: data.id}});
  }

}
