import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComprarBilhetePage } from './comprar-bilhete.page';

const routes: Routes = [
  {
    path: '',
    component: ComprarBilhetePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComprarBilhetePage]
})
export class ComprarBilhetePageModule {}
