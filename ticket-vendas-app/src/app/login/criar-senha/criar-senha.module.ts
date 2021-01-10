import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoadingModule } from 'src/app/modules/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { CriarSenhaComponent } from './criar-senha.component';

const routes: Routes = [
  {
    path: '',
    component: CriarSenhaComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LoadingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriarSenhaComponent]
})
export class CriarSenhaModule { }
