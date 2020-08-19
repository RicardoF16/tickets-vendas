import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserResponse, UserTemp, User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ImagePickerService } from 'src/app/_services/image-picker.service';
import { UserStateService } from 'src/app/_services/user-state.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { EmailValidator } from 'src/app/_validators/email-validator';
import { PasswordValidator } from 'src/app/_validators/password-validator';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit, OnDestroy {

  form: FormGroup;
  private unsub = new Subject<any>();
  private user: UserResponse;
  msgLoading: string;
  @ViewChild(LoadingComponent) loading: LoadingComponent;
  private translations: {
    PAGE_SIGNUP_LOADING_IMG: string;
    PAGE_SIGNUP_LOADING_SAVE_USER: string;
    PAGE_SIGNUP_TOAST_FEEDBACK_SUCCESS: string;
    PAGE_SIGNUP_TOAST_FEEDBACK_ERROR: string;
    PAGE_SIGNUP_TOAST_FEEDBACK_ERROR_409: string;
  };

  constructor(
    private routeActive: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthService,
    private gAlert: GenericAlertService,
    private imgPicker: ImagePickerService,
    private translate: TranslateService,
    private userState: UserStateService) { }

  ngOnInit() {
    debugger;
    const user: UserTemp = JSON.parse(localStorage.getItem('userTemp')) ? JSON.parse(localStorage.getItem('userTemp')) : {};
    const terms: boolean = Boolean(this.routeActive.snapshot.data['terms']);

    this.form = this.fb.group({
      name: [user.nome, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      confirmEmail: [user.confirmPassword, [Validators.required, Validators.email, EmailValidator('email')]],
      password: [user.senha, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [user.confirmPassword, [Validators.required, Validators.minLength(6), PasswordValidator('password')]],
      profileImg: [user.imagemURL],
      terms: [false, Validators.requiredTrue]
    });

    this.userState.getUser$
      .pipe(takeUntil(this.unsub))
      .subscribe(userState => this.user = userState);

    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });
    this.getTranslations();
  }

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

  // getImage() {
  //   this.imgPicker.getImage()
  //     .then(img => {
  //       this.form.get('profileImg').setValue(img);
  //       // console.log(img);
  //     }, err => {
  //       console.error(err);
  //     });
  // }

  submit() {
    //const img = this.form.get('profileImg').value;
    const user: User = {
      nome: this.form.get('name').value,
      email: this.form.get('email').value,
      senha: this.form.get('password').value
      //imagemURL: img ? img.imgBase64 : null
    };
    this.saveUser(user);
  }

  /*private async uploadImage(idUser: string) {
    if (this.form.get('profileImg').value) {

      await this.loading.showLoading(this.translations.PAGE_SIGNUP_LOADING_IMG);
      const img = this.form.get('profileImg').value;
      this.imgPicker.uploadImage(img.imgBase64, img.typeImg, `${idUser}/profile`)
        .then(async data => {
          await this.loading.dismissLoading();
          // console.log('image ', data);
          this.user.imagemURL = data;
          this.editUser(this.user);
        }, async err => {
          await this.loading.dismissLoading();
          this.route.navigate(['/home']);
        });
    } else {
      this.route.navigate(['/home']);
    }
  }*/

  private async saveUser(user: User) {
    debugger;
    await this.loading.showLoading(this.translations.PAGE_SIGNUP_LOADING_SAVE_USER);
    this.userService.postUser(user)
      .subscribe(async userResponse => {
        await this.loading.dismissLoading();
        this.userState.setUser(userResponse);
        this.autenticate(user);
      }, async err => {
        //console.error(err);
        await this.loading.dismissLoading();
        if (err.code === 'auth/email-already-exists') {
          this.feedBackUser(false, this.translations.PAGE_SIGNUP_TOAST_FEEDBACK_ERROR_409);
        } else {
          this.feedBackUser(false);
        }
      });
  }

  private async autenticate(user: User) {
    // console.log('user.email ', user.email);
    // console.log('user.password ', user.password);
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

  private async editUser(user: UserResponse) {
    await this.loading.showLoading();
    this.userService.putUser(user)
      .subscribe(async userResponse => {
        this.userState.setUser(userResponse);
        this.feedBackUser(true);
        await this.loading.dismissLoading();
        this.route.navigate(['/home']);
        // console.log('usuário criado e pronto para ser redirecionado para home');
      }, async err => {
        await this.loading.dismissLoading();
        this.route.navigate(['/home']);
        // console.error('erro ao editar usuário');
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

  back() {
    this.route.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete();
  }
}
