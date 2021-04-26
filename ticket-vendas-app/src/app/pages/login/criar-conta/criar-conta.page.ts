import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserResponse, User } from 'src/app/_models/user';
import { UserStateService } from 'src/app/_services/user-state.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { EmailValidator } from 'src/app/_validators/email-validator';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'src/app/util/customValidators';
import { UsersService } from 'src/app/_services/users.service';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';

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

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private gAlert: GenericAlertService,
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
    const user: User = JSON.parse(localStorage.getItem('userTemp')) ? JSON.parse(localStorage.getItem('userTemp')) : null;
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

  submit() {
    if (!this.termCheck) {
      this.gAlert.presentToastInfo('Para continuar você precisa aceitar os termos de uso');
      return;
    }

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
