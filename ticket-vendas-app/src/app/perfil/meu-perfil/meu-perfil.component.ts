import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/_validators/email-validator';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/util/customValidators';
import { UsersService } from 'src/app/_services/users.service';
import { User } from 'src/app/_models/user';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss'],
})
export class MeuPerfilComponent implements OnInit {
  form: FormGroup;
  user: User;
  maxDate: string = '2004-01-01';

  @ViewChild(LoadingComponent) loading: LoadingComponent;

  constructor(
    private router: Router,
    private userService: UsersService,
    private gAlert: GenericAlertService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.setMaxDate();
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: [''],
      cpf: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.getUser();
  }

  setForm() {
    this.form = this.formBuilder.group({
      nome: [this.user ? this.user.nome : '', Validators.required],
      dataNascimento: [this.user ? this.user.dataNascimento : '', Validators.required],
      genero: [this.user ? this.user.genero : ''],
      cpf: [this.user ? this.formatCPF(this.user.cpf) : '', Validators.required],
      email: [this.user ? this.user.email : '', Validators.required]
    });
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

  formatCPF(value: string): string {
    try {
      return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(9, 2)}`;
    } catch (ex) {
      return '';
    }
  }

  getUser() {
    // this.loading.showLoading('Carregando as informações...');
    this.userService.getMe().toPromise().then(result => {
      this.user = result;
      this.setForm();
    }).catch(ex => {
      this.gAlert.presentToastError('Ocorreu uma falha, tente novamente!');
    }).finally(() => {
      this.loading.dismissLoading();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
