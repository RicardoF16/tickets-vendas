import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CompraRoutingModule } from './compra-routing.module';
import { LoadingModule } from 'src/app/modules/loading/loading.module';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { AdquirirIngressosComponent } from './adquirir-ingressos/adquirir-ingressos.component';

@NgModule({
  declarations: [
    DetalheEventoComponent,
    AdquirirIngressosComponent
  ],
  imports: [
    CommonModule,
    CompraRoutingModule,
    LoadingModule, 
    FormsModule,
    IonicModule
  ]
})
export class CompraModule { }
