import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { UserResponse } from 'src/app/_models/user';
import { UserStateService } from 'src/app/_services/user-state.service';
import { MeusTicketsService } from './../../_services/meusTickets.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MeusTikets } from 'src/app/_models/meusTickets';

@Component({
  selector: 'app-meus-tickets',
  templateUrl: './meus-tickets.page.html',
  styleUrls: ['./meus-tickets.page.scss'],
})
export class MeusTicketsPage implements OnInit {

  private user: UserResponse;
  private uns = new Subject<any>();
  meustickets: Array<MeusTikets>
  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(private meusTicketsService: MeusTicketsService,
    private userState: UserStateService) { }

  ngOnInit() {
    this.userState.getUser$
      .pipe(takeUntil(this.uns))
      .subscribe(user => this.user = user);

    this.getMeusTickets();
  }

  async getMeusTickets() {

    await this.loading.showLoading();
    this.meusTicketsService.getMeusTickets().subscribe(
      async meusTickets => {
        if (meusTickets) {
          this.meustickets = meusTickets.list;
          console.log('meusTickets >>', this.meustickets);
        }
        await this.loading.dismissLoading();
      },
      async () => await this.loading.dismissLoading()
    );


  }

}
