import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultarCreditosPage } from './consultar-creditos.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarCreditosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultarCreditosPage]
})
export class ConsultarCreditosPageModule {}
