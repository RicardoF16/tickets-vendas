import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CompraRoutingModule } from './compra-routing.module';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { LoadingModule } from 'src/app/modules/loading/loading.module';

@NgModule({
  declarations: [
    DetalheEventoComponent
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
