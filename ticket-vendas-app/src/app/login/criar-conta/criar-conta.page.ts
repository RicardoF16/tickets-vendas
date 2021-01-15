import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserResponse, User } from 'src/app/_models/user';
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
import { CustomValidators } from 'src/app/util/customValidators';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit, OnDestroy {

  form: FormGroup;
  termCheck: Boolean = false;
  maxDate: string = '2004-01-01';

  private user: UserResponse;

  private unsub = new Subject<any>();
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
    private route: Router,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private userState: UserStateService) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      cpf: ['', [Validators.required, CustomValidators.validarCPF]],
      email: ['', [Validators.required, Validators.email]],
      email1: ['', [Validators.required, Validators.email, EmailValidator('email')]]
    });
  }

  ngOnInit() {
    this.setMaxDate();
    const user: User = JSON.parse(localStorage.getItem('userTemp')) ? JSON.parse(localStorage.getItem('userTemp')) : {};
    if (user) {
      this.form = this.formBuilder.group({
        nome: [user.nome, Validators.required],
        dataNascimento: [user.dataNascimento, Validators.required],
        genero: [user.genero, Validators.required],
        cpf: [user.cpf, [Validators.required, CustomValidators.validarCPF]],
        email: [user.email, [Validators.required, Validators.email]],
        email1: ['', [Validators.required, Validators.email, EmailValidator('email')]]
      });
    }

    this.userState.getUser$
      .pipe(takeUntil(this.unsub))
      .subscribe(userState => this.user = userState);

    this.translate.onLangChange.subscribe(() => {
      this.getTranslations();
    });
    this.getTranslations();
  }

  setMaxDate() {
    var today = new Date()
    var priorDate = new Date(new Date().setDate(today.getDate() - 5844));
    this.maxDate = this.formatDate(priorDate);
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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

  submit() {
    const user: User = {
      nome: this.form.get('nome').value,
      dataNascimento: this.form.get('dataNascimento').value,
      email: this.form.get('email').value,
      cpf: this.form.get('cpf').value,
      genero: this.form.get('genero').value
    };
    this.saveUser(user);
  }

  private saveUser(user: User) {
    localStorage.setItem('userTemp', JSON.stringify(user));
    this.route.navigate(['/login/criar-senha']);
  }

  back() {
    this.route.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete();
  }
}
