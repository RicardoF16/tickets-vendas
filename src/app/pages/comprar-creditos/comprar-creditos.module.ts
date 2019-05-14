import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComprarCreditosPage } from './comprar-creditos.page';

const routes: Routes = [
  {
    path: '',
    component: ComprarCreditosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComprarCreditosPage]
})
export class ComprarCreditosPageModule {}
