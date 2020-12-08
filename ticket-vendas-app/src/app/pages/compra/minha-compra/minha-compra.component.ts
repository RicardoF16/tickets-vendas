import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventoResponse } from 'src/app/_models/eventoModel';
import { CarrinhoService } from 'src/app/_services/carrinho.service';
import { EventoService } from 'src/app/_services/evento.service';

@Component({
  selector: 'app-minha-compra',
  templateUrl: './minha-compra.component.html',
  styleUrls: ['./minha-compra.component.scss'],
})
export class MinhaCompraComponent implements OnInit {
  idEvento: string = "";
  dadosEvento: EventoResponse;

  constructor(public navCtrl: NavController,
    private eventoService: EventoService,
    public activatedRoute: ActivatedRoute) {
      
    }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.id) {
        this.idEvento = params.id;
        this.getDados();
      }
    });
  }

  getDados() {
    this.eventoService.getEventoById(this.idEvento).toPromise().then(result => {
      this.dadosEvento = result;
    }).catch(err => {
      console.log("erro", err);
    });
  }

}
