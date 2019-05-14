import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BloquearCartaoPage } from './bloquear-cartao.page';

const routes: Routes = [
  {
    path: '',
    component: BloquearCartaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BloquearCartaoPage]
})
export class BloquearCartaoPageModule {}
