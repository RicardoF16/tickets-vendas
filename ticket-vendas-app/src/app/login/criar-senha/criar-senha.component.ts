import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { UserStateService } from 'src/app/_services/user-state.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-criar-senha',
  templateUrl: './criar-senha.component.html',
  styleUrls: ['./criar-senha.component.scss'],
})
export class CriarSenhaComponent implements OnInit {

  public showPassword: Boolean = false;
  public type: string = "password";
  public colorProgress: string = "";
  public textProgress: string = "";

  public user: User;

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  public isPasswordValid: Boolean = false;

  constructor(private userService: UsersService,
    private userState: UserStateService,
    private authService: AuthService,
    private translate: TranslateService,
    private gAlert: GenericAlertService,
    private route: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userTemp')) ? JSON.parse(localStorage.getItem('userTemp')) : null;

    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });
    this.getTranslations();
  }

  ShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword)
      this.type = 'text';
    else
      this.type = 'password';
  }

  checkpassword(password) {
    var divProgress: any = document.getElementById('divProgress');
    var strength = 0;

    if (password == null || password == undefined || password.length == 0) {
      divProgress.style.width = '0%';
      this.textProgress = '';
      this.colorProgress = 'danger';
      return;
    }


    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;

    }

    switch (strength) {
      case 0:
        divProgress.style.width = "20%";
        this.textProgress = 'Fraca';
        this.colorProgress = 'danger';
        this.isPasswordValid = false;
        break;
      case 1:
        divProgress.style.width = "35%";
        this.textProgress = 'Fraca';
        this.colorProgress = 'danger';
        this.isPasswordValid = false;
        break;
      case 2:
        divProgress.style.width = "50%";
        this.textProgress = 'Media';
        this.colorProgress = 'warning';
        this.isPasswordValid = true;
        break;
      case 3:
        divProgress.style.width = "75%";
        this.textProgress = 'Boa';
        this.colorProgress = 'success';
        this.isPasswordValid = true;
        break;
      case 4:
        divProgress.style.width = "100%";
        this.textProgress = 'Ótima';
        this.colorProgress = 'success';
        this.isPasswordValid = true;
        break;
    }

  }

  private translations: {
    PAGE_SIGNUP_LOADING_IMG: string;
    PAGE_SIGNUP_LOADING_SAVE_USER: string;
    PAGE_SIGNUP_TOAST_FEEDBACK_SUCCESS: string;
    PAGE_SIGNUP_TOAST_FEEDBACK_ERROR: string;
    PAGE_SIGNUP_TOAST_FEEDBACK_ERROR_409: string;
  };

  private getTranslations() {

    this.translate.get(
      [
        'PAGE_SIGNUP_LOADING_IMG',
        'PAGE_SIGNUP_LOADING_SAVE_USER',
        'PAGE_SIGNUP_TOAST_FEEDBACK_SUCCESS',
        'PAGE_SIGNUP_TOAST_FEEDBACK_ERROR',
        'PAGE_SIGNUP_TOAST_FEEDBACK_ERROR_409'
      ])
      .subscribe(translations => {
        this.translations = {
          ...translations
        };
      });
  }

  private saveUser(password: string) {
    if (!this.user) {
      this.gAlert.presentToastError('Erro ao carregar os dados.');
      return;
    } else
      this.user.senha = password;

    this.loading.showLoading(this.translations.PAGE_SIGNUP_LOADING_SAVE_USER);
    this.userService.postUser(this.user)
      .subscribe(async userResponse => {
        this.loading.dismissLoading();
        this.userState.setUser(userResponse);
        this.autenticate(this.user);
      }, async err => {
        //console.error(err);
        this.loading.dismissLoading();
        if (err.code === 'auth/email-already-exists') {
          this.feedBackUser(false, this.translations.PAGE_SIGNUP_TOAST_FEEDBACK_ERROR_409);
        } else {
          this.feedBackUser(false);
        }
      });
  }

  private async autenticate(user: User) {
    await this.loading.showLoading();
    this.authService.login(user.email, user.senha)
      .then(async userAutenicated => {
        await this.loading.dismissLoading();
        this.userState.setFbUser(userAutenicated.user);
        this.route.navigate(['/home']);
        //this.uploadImage(userAutenicated.user.uid);
      }, async err => {
        // console.log(err);
        this.userState.setUser(null);
        await this.loading.dismissLoading();
      });
  }

  private async feedBackUser(success: boolean, msg?: string) {
    if (success) {
      await this.gAlert.presentToastSuccess(this.translations.PAGE_SIGNUP_TOAST_FEEDBACK_SUCCESS);
    } else {
      await this.gAlert
        .presentToastError
        (msg ? this.translations.PAGE_SIGNUP_TOAST_FEEDBACK_ERROR : this.translations.PAGE_SIGNUP_TOAST_FEEDBACK_ERROR_409);
    }
  }
}
