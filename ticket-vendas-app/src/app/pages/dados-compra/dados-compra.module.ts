import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DadosCompraComponent } from './dados-compra.component';

const routes: Routes = [
  {
    path: '',
    component: DadosCompraComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DadosCompraComponent]
})
export class DetalheEventoPageModule {}
