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


@Component({
  selector: 'app-pagamento-cartao',
  templateUrl: './pagamento-cartao.page.html',
  styleUrls: ['./pagamento-cartao.page.scss'],
})
export class PagamentoCartaoPage implements OnInit {

  tickets:Array<MeusTikets>
  
  meuCarrinho: Array<Carrinho> = new Array<Carrinho>();

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
  constructor(private userService: UsersService,
              private meusTicketsService: MeusTicketsService,
              private translate: TranslateService,
              private routeActive: ActivatedRoute,
              private route: Router,
              private gAlert: GenericAlertService,
              private carrinhoService: CarrinhoService,
              private userState: UserStateService,
              public navCtrl: NavController
             ) { }

  ngOnInit() {

    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });

    this.getTranslations();

    this.userState.getUser$
      .pipe(takeUntil(this.uns))
      .subscribe(user => this.user = user);
    
    this.meuCarrinho = this.carrinhoService.getDadosCarrinho();
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
  
  classDisplay(){
    let css = 'visivel'
    if (this.descricaoBandeira == '')
    {
      css = 'invisivel'
    }
    return css;
  }

  finalizarCompras(){
    this.cadastrar();
    //A pagina meus tickets tem que ser chamada após a garantia de ter retorno de ter salvo todos os tickets.
    //this.navCtrl.navigateRoot('/meus-tickets'); 
  }

  async cadastrar(){
    this.tickets = new Array<MeusTikets>();
    let ticket : MeusTikets;
    await this.loading.showLoading(this.translations.PAGE_INFO_SAVING);
    try {
          this.meuCarrinho.forEach( item =>{
            if(item.qtd > 0){
              for(let cont = 0; cont < item.qtd; cont++) {
                ticket = { descricaoEvento: 'Pós Forrozao',
                           valor :item.valor,
                           lote : '1',
                           qrcode : 'img',
                           setor : item.setor,
                           dataCriacao : '15-08-2020',
                           idUser : this.user.id,
                           descricaoDiaSemana : 'Sabado',
                           descricaoMes : 'Julho',
                           diaNoMes: '24',
                           ano:'2020',
                           dataEvento: '23-07-2020',
                           dataValidacao: '24-07-2020',
                           horaValidacao: '00:05'
                      };
              this.saveTickets(this.user.id,ticket);
             }
            }
          });

    } catch (error) {
      this.loading.dismissLoading();
    }

  }


  private async saveTickets(idUser: string, tickets: MeusTikets) {

    this.meusTicketsService.post(idUser, tickets)
      .subscribe(async data => {
        await this.loading.dismissLoading();
        this.gAlert.presentToastSuccess(this.translations.PAGE_INFO_SAVING_SUCCESS);
      }, async erro => {
        console.log(erro);
        this.gAlert.presentToastError(this.translations.PAGE_INFO_SAVING_ERROR);
        await this.loading.dismissLoading();
      });

  }



}