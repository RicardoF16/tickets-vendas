import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeusTicketsPage } from './meus-tickets.page';
import { LoadingModule } from '../../modules/loading/loading.module';

const routes: Routes = [
  {
    path: '',
    component: MeusTicketsPage
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
  declarations: [MeusTicketsPage]
})
export class MeusTicketsPageModule {}