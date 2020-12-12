import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompraRoutingModule } from './compra-routing.module';
import { MinhaCompraComponent } from './minha-compra/minha-compra.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { MeuIngressoComponent } from './meu-ingresso/meu-ingresso.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    MinhaCompraComponent,
    ListComponent,
    MeuIngressoComponent
  ],
  imports: [
    CommonModule,
    CompraRoutingModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule
  ]
})
export class CompraModule { }