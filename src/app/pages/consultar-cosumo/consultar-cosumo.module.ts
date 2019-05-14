import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultarCosumoPage } from './consultar-cosumo.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarCosumoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultarCosumoPage]
})
export class ConsultarCosumoPageModule {}
