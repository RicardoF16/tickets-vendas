import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';

const routes: Routes = [
  { path: '', 
  component: MeuPerfilComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }