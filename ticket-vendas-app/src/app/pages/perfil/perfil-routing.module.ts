
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { MenorIdadeComponent } from './menor-idade/menor-idade.component';

const routes: Routes = [
  { path: '',   component: MeuPerfilComponent },
  { path: 'menor-idade',   component: MenorIdadeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
