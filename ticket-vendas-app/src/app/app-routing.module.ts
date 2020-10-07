import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { 
    path: 'comprar-creditos', 
    loadChildren: './pages/comprar-creditos/comprar-creditos.module#ComprarCreditosPageModule' 
  },
  { 
    path: 'consultar-creditos', 
    loadChildren: './pages/consultar-creditos/consultar-creditos.module#ConsultarCreditosPageModule' 
  },
  { 
    path: 'consultar-cosumo', 
    loadChildren: './pages/consultar-cosumo/consultar-cosumo.module#ConsultarCosumoPageModule' },
  { 
    path: 'bloquear-cartao', 
    loadChildren: './pages/bloquear-cartao/bloquear-cartao.module#BloquearCartaoPageModule' 
  },
  { 
    path: 'lista-amiga', 
    loadChildren: './pages/lista-amiga/lista-amiga.module#ListaAmigaPageModule' 
  },
  { 
    path: 'feed-redes-sociais', 
    loadChildren: './pages/feed-redes-sociais/feed-redes-sociais.module#FeedRedesSociaisPageModule'
  },
  
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'esqueci-senha', loadChildren: './login/esqueci-senha/esqueci-senha.module#EsqueciSenhaPageModule' },
  { path: 'criar-conta', loadChildren: './login/criar-conta/criar-conta.module#CriarContaPageModule' },
  { path: 'cadastrar-evento', loadChildren: './pages/cadastrar-evento/cadastrar-evento.module#CadastrarEventoPageModule' },
  { path: 'comprar-bilhete', loadChildren: './pages/comprar-bilhete/comprar-bilhete.module#ComprarBilhetePageModule' },
  { path: 'detalhe-evento', loadChildren: './pages/detalhe-evento/detalhe-evento.module#DetalheEventoPageModule' },
  { path: 'escolher-ingresso', loadChildren: './pages/escolher-ingresso/escolher-ingresso.module#EscolherIngressoPageModule' },
  { path: 'meu-carrinho', loadChildren: './pages/meu-carrinho/meu-carrinho.module#MeuCarrinhoPageModule' },
  { path: 'pagamento-cartao', loadChildren: './pages/pagamento-cartao/pagamento-cartao.module#PagamentoCartaoPageModule' },
  { path: 'selecionar-data-evento', loadChildren: './pages/selecionar-data-evento/selecionar-data-evento.module#SelecionarDataEventoPageModule' },
  { path: 'meus-tickets', loadChildren: './pages/meus-tickets/meus-tickets.module#MeusTicketsPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}