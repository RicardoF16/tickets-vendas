import { Component, OnInit } from '@angular/core';

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

  public isPasswordValid: Boolean = false;

  constructor() { }

  ngOnInit() {
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
}
