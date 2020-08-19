import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GenericAlertService {
  translations: {
    CANCEL: string;
    YES: string;
    NO: string;
  };

  constructor(
    private alertController: AlertController,
    private translate: TranslateService,
    private toastController: ToastController
  ) {
    this.translate.onLangChange.subscribe(() => this.getTranslations());
    this.getTranslations();
  }

  private getTranslations() {
    this.translate.get(['CANCEL', 'YES', 'NO']).subscribe(translations => {
      this.translations = {
        ...translations
      };
    });
  }

  async presentAlertConfirm(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    return await alert.present();
  }

  presentAlertYesNo(header: string, message: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: this.translations.NO,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => resolve(false)
          },
          {
            text: this.translations.YES,
            cssClass: 'secondary',
            handler: () => resolve(true)
          }
        ]
      });
      await alert.present();
    });
  }

  async presentToastSuccess(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }

  async presentToastError(
    msg: string,
    withButton?: boolean,
    msgButton?: string
  ) {
    const options: ToastOptions = {
      message: msg,
      duration: 3000,
      color: 'danger'
    };
    if (withButton) {
      options.showCloseButton = true;
      options.closeButtonText = msgButton;
      options.duration = 0;
    }
    const toast = await this.toastController.create(options);
    toast.present();
    return toast;
  }
}
