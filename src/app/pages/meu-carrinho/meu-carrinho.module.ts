import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeuCarrinhoPage } from './meu-carrinho.page';

const routes: Routes = [
  {
    path: '',
    component: MeuCarrinhoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeuCarrinhoPage]
})
export class MeuCarrinhoPageModule {}
