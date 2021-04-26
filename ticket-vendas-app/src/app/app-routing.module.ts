import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'esqueci-senha',
    loadChildren: './pages/login/esqueci-senha/esqueci-senha.module#EsqueciSenhaPageModule'
  },
  {
    path: 'criar-conta',
    loadChildren: './pages/login/criar-conta/criar-conta.module#CriarContaPageModule'
  },
  {
    path: 'perfil',
    loadChildren: './pages/perfil/perfil.module#PerfilModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'cartao',
    loadChildren: './pages/cartao/cartao.module#CartaoModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'minhas-compras',
    loadChildren: './pages/minha-compra/minha-compra.module#MinhaCompraModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'evento',
    loadChildren: './pages/compra/compra.module#CompraModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
