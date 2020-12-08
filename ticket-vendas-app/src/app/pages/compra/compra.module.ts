import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompraRoutingModule } from './compra-routing.module';
import { MinhaCompraComponent } from './minha-compra/minha-compra.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MinhaCompraComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CompraRoutingModule,
    FormsModule,
    IonicModule
  ]
})
export class CompraModule { }