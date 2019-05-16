import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserResolveGuard } from 'src/app/_guards/user-resolve.guard';
import { CriarContaPage } from './criar-conta.page';
import { LoadingModule } from '../../modules/loading/loading.module';

// const routes: Routes = [
//   {
//     path: '',
//     component: CriarContaPage
//   }
// ];

const routes: Routes = [
  // {
  //   path: 'termos-uso',
  //   loadChildren: './termos-uso/termos-uso.module#TermosUsoPageModule'
  // },
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
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoadingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriarContaPage]
})
export class CriarContaPageModule {}
