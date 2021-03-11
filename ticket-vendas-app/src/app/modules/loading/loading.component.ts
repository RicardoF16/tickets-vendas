import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {

  private cont = 0;

  private loadingRef: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) { }

  /**
   * `msgLoading` optional, default value 'Carregando...'
   */
  showLoading(msgLoading?: string) {
    this.cont++;
    this.beforePresentLoading(msgLoading);
  }

  dismissLoading() {
    this.cont--;
    this.cont = this.cont < 0 ? 0 : this.cont;
    if (this.cont === 0 && this.loadingRef) {
      this.loadingRef.dismiss();
      this.loadingRef = undefined;
    }
  }

  dismissAll() {
    if (this.loadingRef) {
      this.loadingRef.dismiss();
      this.loadingRef = undefined;
    } else {
      setTimeout(() => {
        this.dismissAll();
      }, 1000);
    }
  }

  private beforePresentLoading(msgLoading: string) {
    if (this.loadingRef) {
      this.loadingRef.message = msgLoading;
    } else {
      this.presentLoadingWithOptions(msgLoading);
    }
  }

  private presentLoadingWithOptions(msgLoading?: string) {
    this.loadingController.create({
      message: msgLoading ? msgLoading : 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    }).then(result => {
      this.loadingRef = result;
      this.loadingRef.present();
    });
  }
}
