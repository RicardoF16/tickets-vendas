
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { MenorIdadeComponent } from './menor-idade/menor-idade.component';
import { AutorizacaoMenorIdadeComponent } from './autorizacao-menor-idade/autorizacao-menor-idade.component';

const routes: Routes = [
  { path: '',   component: MeuPerfilComponent },
  { path: 'menor-idade',   component: MenorIdadeComponent },
  { path: 'autorizacao-menor-idade',   component: AutorizacaoMenorIdadeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
