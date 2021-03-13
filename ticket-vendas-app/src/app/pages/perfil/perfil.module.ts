import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { TabMenuModule } from '../../modules/tab-menu/tab-menu.module';
import { LoadingModule } from '../../modules/loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  declarations: [
    MeuPerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    BrMaskerModule,
    LoadingModule,
    PerfilRoutingModule,
    TabMenuModule
  ]
})
export class PerfilModule { }
