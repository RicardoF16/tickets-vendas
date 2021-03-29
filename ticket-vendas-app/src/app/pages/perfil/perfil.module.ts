

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from '../../modules/tab-menu/tab-menu.module';
import { LoadingModule } from '../../modules/loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BrMaskerModule } from 'br-mask';
import { PerfilRoutingModule } from './perfil-routing.module';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { MenorIdadeComponent } from './menor-idade/menor-idade.component';
import { AutorizacaoMenorIdadeComponent } from './autorizacao-menor-idade/autorizacao-menor-idade.component';


@NgModule({
  declarations: [
    MeuPerfilComponent,
    MenorIdadeComponent,
    AutorizacaoMenorIdadeComponent
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
