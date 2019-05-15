

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  form: FormGroup;
  //@ViewChild(LoadingComponent) loading: LoadingComponent;
  //private userFb: firebase.User;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
      this.form = this.fb.group({
      user: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  loginFacebook(){

  }

  login(){

  }

}
