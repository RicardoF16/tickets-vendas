import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagamentoCartaoPage } from './pagamento-cartao.page';

import { LoadingModule } from '../../modules/loading/loading.module';
import { AuthGuard } from 'src/app/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagamentoCartaoPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagamentoCartaoPage]
})
export class PagamentoCartaoPageModule {}
