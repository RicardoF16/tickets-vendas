import { MeusTicketsService } from './../../_services/meusTickets.service';
import { Carrinho } from './../../_models/carrinho';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserResponse, User } from 'src/app/_models/user';
import { MeusTikets } from 'src/app/_models/meusTickets';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { UsersService } from 'src/app/_services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from 'src/app/_services/carrinho.service';
import { UserStateService } from 'src/app/_services/user-state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NavController } from '@ionic/angular';
import { CompraService } from 'src/app/_services/compra.service';


@Component({
  selector: 'app-pagamento-cartao',
  templateUrl: './pagamento-cartao.page.html',
  styleUrls: ['./pagamento-cartao.page.scss'],
})
export class PagamentoCartaoPage implements OnInit {

  idEvento: string = "";
  meuCarrinho: Carrinho;

  private user: UserResponse;
  private uns = new Subject<any>();

  msgLoading: string;
  @ViewChild(LoadingComponent) loading: LoadingComponent;
  private translations: {
    PAGE_INFO_SAVING: string;
    PAGE_INFO_SAVING_SUCCESS: string;
    PAGE_INFO_SAVING_ERROR: string;
  };

  descricaoBandeira = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private meusTicketsService: MeusTicketsService,
    private translate: TranslateService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private compraService: CompraService,
    private gAlert: GenericAlertService,
    private carrinhoService: CarrinhoService,
    private userState: UserStateService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.id) {
        this.idEvento = params.id;
        this.meuCarrinho = this.carrinhoService.getDadosCarrinho(this.idEvento) as Carrinho;
      } else {
        this.navCtrl.navigateRoot(['/']);
      }
    });

    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });

    this.getTranslations();

    this.userState.getUser$
      .pipe(takeUntil(this.uns))
      .subscribe(user => this.user = user);

    this.carrinhoService.getDadosCarrinho(this.idEvento);
    console.log('Carrinho >> ', this.meuCarrinho);
  }

  private getTranslations() {

    this.translate.get(
      [
        'PAGE_INFO_SAVING',
        'PAGE_INFO_SAVING_SUCCESS',
        'PAGE_INFO_SAVING_ERROR',
      ])
      .subscribe(translations => {
        this.translations = {
          ...translations
        };
      });
  }

  classDisplay() {
    let css = 'visivel'
    if (this.descricaoBandeira == '') {
      css = 'invisivel'
    }
    return css;
  }

  finalizarCompras() {
    this.compraService.post(this.meuCarrinho).toPromise().then(result => {
      this.carrinhoService.clear();
      // this.navCtrl.navigateRoot([`/compras/compra?id=${(result as any).id}`]);
      this.navCtrl.navigateRoot(['compras/compra'], { queryParams: { id: '5f8b10068e0acc1cf86ca396' } });
    }).catch(err => {
      this.carrinhoService.clear();
      this.gAlert.presentToastError('Não foi possível registrar a compra, tente novamente mais tarde!');
      this.navCtrl.navigateRoot(['/']);
    });
  }

}
