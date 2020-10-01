import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeuCarrinhoPage } from './meu-carrinho.page';
import { AuthGuard } from 'src/app/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MeuCarrinhoPage,
    canActivate: [AuthGuard]
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
