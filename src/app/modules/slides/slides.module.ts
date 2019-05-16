import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlidesComponent } from './slides.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    SlidesComponent
  ],
  exports: [
    SlidesComponent
  ]
})
export class SlidesModule {}
