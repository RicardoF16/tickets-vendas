import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalheEventoComponent } from './detalhe-evento/detalhe-evento.component';
import { AdquirirIngressosComponent } from './adquirir-ingressos/adquirir-ingressos.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { MeuCarrinhoComponent } from './meu-carrinho/meu-carrinho.component';


const routes: Routes = [
  { path: '', component: DetalheEventoComponent},
  { path: 'adquirir-ingressos', component: AdquirirIngressosComponent, canActivate: [AuthGuard]},
  { path: 'meu-carrinho', component: MeuCarrinhoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraRoutingModule { }
