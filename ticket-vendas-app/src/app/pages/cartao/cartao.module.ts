import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartaoRoutingModule } from './cartao-routing.module';
import { ActionComponent } from './action/action.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { LoadingModule } from 'src/app/modules/loading/loading.module';

@NgModule({
  declarations: [
    ActionComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CartaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrMaskerModule,
    LoadingModule,
  ]
})
export class CartaoModule { }
