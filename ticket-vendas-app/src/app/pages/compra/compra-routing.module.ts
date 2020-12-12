import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MeuIngressoComponent } from './meu-ingresso/meu-ingresso.component';
import { MinhaCompraComponent } from './minha-compra/minha-compra.component';

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'compra', component: MinhaCompraComponent},
  { path: 'ingresso', component: MeuIngressoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }