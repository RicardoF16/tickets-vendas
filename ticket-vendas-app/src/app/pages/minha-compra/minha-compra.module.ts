import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhaCompraRoutingModule } from './minha-compra-routing.module';
import { MinhaCompraComponent } from './minha-compra/minha-compra.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { MeuIngressoComponent } from './meu-ingresso/meu-ingresso.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { LoadingModule } from 'src/app/modules/loading/loading.module';
import { TabMenuModule } from 'src/app/modules/tab-menu/tab-menu.module';

@NgModule({
  declarations: [
    MinhaCompraComponent,
    ListComponent,
    MeuIngressoComponent
  ],
  imports: [
    CommonModule,
    MinhaCompraRoutingModule,
    FormsModule,
    IonicModule,
    LoadingModule,
    TabMenuModule,
    NgxQRCodeModule
  ]
})
export class MinhaCompraModule { }