import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';

const routes: Routes = [
  { path: '', component: DetalheEventoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
