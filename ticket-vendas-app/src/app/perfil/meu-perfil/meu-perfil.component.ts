import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/_validators/email-validator';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/util/customValidators';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss'],
})
export class MeuPerfilComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', [Validators.required, CustomValidators.validarData]],
      genero: ['', Validators.required],
      cpf: ['', [Validators.required, CustomValidators.validarCPF]],
      email: ['', [Validators.required, Validators.email]],
      email1: ['', [Validators.required, Validators.email, EmailValidator('email')]]
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
