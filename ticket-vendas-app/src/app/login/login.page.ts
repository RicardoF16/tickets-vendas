import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { LoadingComponent } from '../modules/loading/loading.component';
import { GenericAlertService } from '../_services/generic-alert.service';
import { UserStateService } from '../_services/user-state.service';
import { UsersService } from '../_services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { PushService } from '../_services/push.service';
import { TypeUser } from '../_models/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;
  @ViewChild(LoadingComponent) loading: LoadingComponent;
  private userFb: firebase.User;
  private translations: {
    PAGE_LOGIN_USER_PASSWORD_WRONG: string;
    PAGE_LOGIN_LOADING_CONFIG: string;
    PAGE_LOGIN_MAKING_LOGIN: string;
    PAGE_LOGIN_LOGIN_ERROR: string;
    PAGE_LOGIN_LOGIN_AUTH_ERROR: string;
    PAGE_LOGIN_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: string;
    ATTENTION: string;
  };

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private gAlert: GenericAlertService,
    private auth: AuthService,
    private pushService: PushService,
    private userState: UserStateService,
    private userService: UsersService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      user: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });
    this.getTranslations();
  }

  private getTranslations() {

    this.translate.get(
      [
        'PAGE_LOGIN_USER_PASSWORD_WRONG',
        'PAGE_LOGIN_LOADING_CONFIG',
        'PAGE_LOGIN_MAKING_LOGIN',
        'PAGE_LOGIN_LOGIN_ERROR',
        'PAGE_LOGIN_LOGIN_AUTH_ERROR',
        'PAGE_LOGIN_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL',
        'ATTENTION',
      ])
      .subscribe(translations => {
        this.translations = {
          ...translations
        };
      });
  }

  async loginFacebook() {
    
    await this.loading.showLoading(this.translations.PAGE_LOGIN_MAKING_LOGIN);
    this.auth
      .facebookLogin()
      .then(async data => {
        this.navCtrl.navigateRoot(['/home']);
        //this.pushService.getToken();
        await this.loading.dismissLoading();
      }, async err => {
        await this.loading.dismissLoading();
        if (err.code === 'auth/account-exists-with-different-credential') {
          await this.gAlert.presentToastError(this.translations.PAGE_LOGIN_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL);
        } else {
          await this.gAlert.presentToastError(this.translations.PAGE_LOGIN_LOGIN_ERROR);
        }
      })
      .catch(async err => {
        await this.loading.dismissLoading();
        await this.gAlert.presentToastError(this.translations.PAGE_LOGIN_LOGIN_ERROR);

      });
  }

  async login() {
    
    await this.loading.showLoading(this.translations.PAGE_LOGIN_MAKING_LOGIN);
    this.auth
      .login(this.aux('user'), this.aux('password'))
      .then(async user => {
        await this.loading.showLoading(this.translations.PAGE_LOGIN_LOADING_CONFIG);
        this.getUserInfo(user.user.uid);
      },
        async e => {
          this.loading.dismissLoading();
          await this.gAlert.presentToastError(this.translations.PAGE_LOGIN_USER_PASSWORD_WRONG);
        }
      )
      .catch(async err => {
        this.loading.dismissLoading();
        await this.gAlert.presentToastError(this.translations.PAGE_LOGIN_USER_PASSWORD_WRONG);
      })
      .finally(() => {
        this.loading.dismissLoading();
        // console.log('finally');
      });
  }

  async loginWithGoogle() {
    await this.loading.showLoading(this.translations.PAGE_LOGIN_MAKING_LOGIN);
    this.auth.doGoogleLogin()
      .then(async res => {
        this.navCtrl.navigateRoot(['/home']);
        this.pushService.getToken();
        await this.loading.dismissLoading();
      }, async () => {
        await this.loading.dismissLoading();
        await this.gAlert.presentToastError(this.translations.PAGE_LOGIN_LOGIN_ERROR);
      })
      .catch(async err => {
        await this.loading.dismissLoading();
        await this.gAlert.presentToastError(this.translations.PAGE_LOGIN_LOGIN_ERROR);
      });
  }

  private getUserInfo(userId: string) {
    this.userService.getUserInfo(userId)
      .subscribe(async userInfo => {
        //if (userInfo.papel === TypeUser.user) {
          this.userState.setUser(userInfo);
          this.navCtrl.navigateRoot(['/home']);
          //this.pushService.getToken();
        // /} else {
        //   this.auth.logoff();
        //   await this.gAlert.presentToastError(this.translations.PAGE_LOGIN_LOGIN_AUTH_ERROR);
        // }
        await this.loading.dismissLoading();
      }, async () => await this.loading.dismissLoading());
  }

  private aux(field: string) {
    return this.form.get(field).value;
  }
}
