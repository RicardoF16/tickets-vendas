import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EscolherIngressoPage } from './escolher-ingresso.page';
import { AuthGuard } from 'src/app/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EscolherIngressoPage,
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
  declarations: [EscolherIngressoPage]
})
export class EscolherIngressoPageModule {}
