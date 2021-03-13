import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EsqueciSenhaPage } from './esqueci-senha.page';
import { LoadingModule } from 'src/app/modules/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: EsqueciSenhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EsqueciSenhaPage]
})
export class EsqueciSenhaPageModule {}
