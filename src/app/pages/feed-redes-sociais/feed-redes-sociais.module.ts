import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedRedesSociaisPage } from './feed-redes-sociais.page';

const routes: Routes = [
  {
    path: '',
    component: FeedRedesSociaisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeedRedesSociaisPage]
})
export class FeedRedesSociaisPageModule {}
