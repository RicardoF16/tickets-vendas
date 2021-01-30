import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';

const routes: Routes = [
  { path: '', 
  component: MeuPerfilComponent,
  canActivate: [AuthGuard],  
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
