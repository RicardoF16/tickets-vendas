import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuComponent } from './tab-menu.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    TabMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    TabMenuComponent
  ]
})
export class TabMenuModule { }
