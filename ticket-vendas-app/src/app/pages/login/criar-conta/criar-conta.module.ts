import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CriarContaPage } from './criar-conta.page';
import { UserResolveGuard } from 'src/app/_guards/user-resolve.guard';
import { LoadingModule } from 'src/app/modules/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: 'termos-uso',
    loadChildren: './termos-uso/termos-uso.module#TermosUsoPageModule'
  },
  {
    path: ':terms',
    component: CriarContaPage,
    resolve: {
      terms: UserResolveGuard
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    BrMaskerModule,
    LoadingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriarContaPage]
})
export class CriarContaPageModule { }
