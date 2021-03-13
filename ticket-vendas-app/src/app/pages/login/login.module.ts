import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { LoadingModule } from '../../modules/loading/loading.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'criar-conta',
    loadChildren: './criar-conta/criar-conta.module#CriarContaPageModule'
  },
  {
    path: 'criar-senha',
    loadChildren: './criar-senha/criar-senha.module#CriarSenhaModule'
  },
  {
    path: 'esqueci-senha',
    loadChildren: './esqueci-senha/esqueci-senha.module#EsqueciSenhaPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoadingModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
