import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { AdquirirIngressosComponent } from './adquirir-ingressos/adquirir-ingressos.component';


const routes: Routes = [
  { path: '', component: DetalheEventoComponent},
  { path: 'adquirir-ingressos', component: AdquirirIngressosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
