import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
//import { AnyAaaaRecord } from 'dns';



import { LoadingComponent } from 'src/app/modules/loading/loading.component';
import { EmailValidator } from 'src/app/_validators/email-validator';
import { PasswordValidator } from 'src/app/_validators/password-validator';


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
              private routeActive: ActivatedRoute,
              private route: Router,
              private navCtrl: NavController,) { }

  ngOnInit() {

    const user: any = JSON.parse(localStorage.getItem('userTemp')) ? JSON.parse(localStorage.getItem('userTemp')) : {};
    const terms: boolean = Boolean(this.routeActive.snapshot.data['terms']);


    this.form = this.fb.group({
      name: [user.nome, Validators.required],
      email: [user.email , [Validators.required, Validators.email]],
      confirmEmail: [user.confirmPassword , [Validators.required, Validators.email, EmailValidator('email')]],
      password: [user.senha, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [user.confirmPassword, [Validators.required, Validators.minLength(6), PasswordValidator('password')]],
      profileImg: [user.imagemURL],
      terms: [terms, Validators.requiredTrue],
      dataNascimento: [user.dataNascimento, Validators.required],
    });
  }

}
