import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GenericAlertService } from 'src/app/_services/generic-alert.service';
import { CustomValidators } from 'src/app/util/customValidators';

@Component({
  selector: 'app-autorizacao-menor-idade',
  templateUrl: './autorizacao-menor-idade.component.html',
  styleUrls: ['./autorizacao-menor-idade.component.scss'],
})
export class AutorizacaoMenorIdadeComponent implements OnInit {

  termCheck: Boolean = false;  
  form: FormGroup;
  
  constructor(
    private navCtrl: NavController,
    private gAlert: GenericAlertService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
    }

  ngOnInit() {}

  
  menorDeDezsseisAnos(){

  }

  maiorDeDezsseisAnos(){
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, CustomValidators.validarCPF]]
      });
  }

  submit() {
    this.navCtrl.navigateRoot(['./cartao/meu-carrinho']);
  }

  back() {
    window.history.back();
  }

}
