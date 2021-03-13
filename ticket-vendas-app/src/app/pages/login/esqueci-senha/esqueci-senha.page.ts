import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
})
export class EsqueciSenhaPage implements OnInit {

  form: FormGroup;
  
  @ViewChild(LoadingComponent) loading: LoadingComponent;
  private translations: {
    PAGE_FORGOT_PASSWORD_EMAIL_SENDED: string;
    PAGE_FORGOT_PASSWORD_EMAIL_ERROR: string
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private translate: TranslateService,
    private gAlert: GenericAlertService) { }

  ngOnInit() {
    // this.form = new FormGroup({
    //    email: new FormControl(null, [Validators.required, Validators.email])
    // });

    this.form = this.fb.group({
      user: [null, [Validators.required, Validators.email]]
    });

    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });
    this.getTranslations();
  }

  private getTranslations() {

    this.translate.get(
      [
        'PAGE_FORGOT_PASSWORD_EMAIL_SENDED',
        'PAGE_FORGOT_PASSWORD_EMAIL_ERROR',
      ])
      .subscribe(translations => {
        this.translations = {
          ...translations
        };
      });
  }

  async sendEmailReset() {
    await this.loading.showLoading();
    this.authService.forgotPassword(this.form.get('user').value)
      .then(async () => {
        await this.gAlert.presentToastSuccess(this.translations.PAGE_FORGOT_PASSWORD_EMAIL_SENDED);
        await this.loading.dismissLoading();
        this.form.reset();
        this.navController.navigateRoot(['/login']);
      }, async () => {
        await this.gAlert.presentToastError(this.translations.PAGE_FORGOT_PASSWORD_EMAIL_ERROR);
        await this.loading.dismissLoading();
      });
  }

}
