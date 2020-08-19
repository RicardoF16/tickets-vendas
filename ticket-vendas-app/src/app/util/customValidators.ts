import {
    FormArray,
    FormControl,
    FormGroup,
    ValidationErrors
  } from '@angular/forms';
  
  export class CustomValidators {
    static birthYear(c: FormControl): ValidationErrors {
      const numValue = Number(c.value);
      const currentYear = new Date().getFullYear();
      const minYear = currentYear - 85;
      const maxYear = currentYear - 18;
      const isValid =
        !isNaN(numValue) && numValue >= minYear && numValue <= maxYear;
      const message = {
        years: {
          message:
            'The year must be a valid number between ' +
            minYear +
            ' and ' +
            maxYear
        }
      };
      return isValid ? null : message;
    }
  
    static comparaSenhas(form: FormGroup): ValidationErrors {
      const senhaCtrl1 = form.get('senha');
      const senhaCtrl2 = form.get('repetirSenha');
  
      if (senhaCtrl1 != null && senhaCtrl2 != null) {
        const item1 = senhaCtrl1.value;
        const item2 = senhaCtrl2.value;
        let error = null;
  
        if (item1 !== item2) {
          error = 'as senhas devem ser iguais';
        }
  
        const message = {
          senhasIguais: {
            message: error
          }
        };
  
        return error ? message : null;
      }
      return null;
    }
  
    static comparaEmail(form: FormGroup): ValidationErrors {
      const emailCtrl1 = form.get('email');
      const emailCtrl2 = form.get('repetirEmail');
  
      if (emailCtrl1 != null && emailCtrl2 != null) {
        const item1 = emailCtrl1.value;
        const item2 = emailCtrl2.value;
        let error = null;
        if (emailCtrl1.valid) {
          if (item1 !== item2) {
            error = 'Os email devem ser iguais';
          }
        }
  
        const message = {
          emailsIguais: {
            message: error
          }
        };
  
        return error ? message : null;
      }
      return null;
    }
    static countryCity(form: FormGroup): ValidationErrors {
      const countryControl = form.get('location.country');
      const cityControl = form.get('location.city');
  
      if (countryControl != null && cityControl != null) {
        const country = countryControl.value;
        const city = cityControl.value;
        let error = null;
  
        if (country === 'France' && city !== 'Paris') {
          error = 'If the country is France, the city must be Paris';
        }
  
        const message = {
          countryCity: {
            message: error
          }
        };
  
        return error ? message : null;
      }
    }
  
    static uniqueName(c: FormControl): Promise<ValidationErrors> {
      const message = {
        uniqueName: {
          message: 'The name is not unique'
        }
      };
  
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(c.value === 'Existing' ? message : null);
        }, 1000);
      });
    }
  
    static telephoneNumber(c: FormControl): ValidationErrors {
      const isValidPhoneNumber = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);
      const message = {
        telephoneNumber: {
          message:
            'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
        }
      };
      return isValidPhoneNumber ? null : message;
    }
  
    static telephoneNumbers(form: FormGroup): ValidationErrors {
      const message = {
        telephoneNumbers: {
          message: 'At least one telephone number must be entered'
        }
      };
  
      const phoneNumbers = <FormArray>form.get('phoneNumbers');
      const hasPhoneNumbers =
        phoneNumbers && Object.keys(phoneNumbers.controls).length > 0;
  
      return hasPhoneNumbers ? null : message;
    }
  
    static getFormatPrice(price: number) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price);
    }
  
    // static validarCpfCnpj(form: FormGroup): ValidationErrors {
  
    //   let error = null;
    //   let cpfCnpj = form.get('cpfCnpj');
  
    //   if (cpfCnpj.value) {
    //     cpfCnpj = cpfCnpj.value;
    //   }
  
  
    //   if (cpfCnpj.length > 14) {
  
    //     if (!(this.validarCPF(cpfCnpj))) {
    //       error = 'O campo "Cpf" informado é invalido.';
    //     }
    //     const message = {
    //       cpfCnpj: {
    //         message: error
    //       }
    //     };
    //     return error ? message : null;
    //   }
    //   else {
  
    //     if (!(this.validarCnpj(cpfCnpj))) {
    //       error = 'O campo "CNPJ" informado é invalido.';
    //     }
    //     const message = {
    //       cpfCnpj: {
    //         message: error
    //       }
    //     };
    //     return error ? message : null;
    //   }
  
    // }
  
  
  
    static validarCPF(cpf) {
  
      if (cpf === '') {
        
        return false;
      }
      else
      {
        let strCPF = cpf;
        strCPF = strCPF.replace(/[^\d]+/g, '');
  
        // Elimina CPFs invalidos conhecidos
        if (
          strCPF.length !== 11 ||
          strCPF === '00000000000' ||
          strCPF === '11111111111' ||
          strCPF === '22222222222' ||
          strCPF === '33333333333' ||
          strCPF === '44444444444' ||
          strCPF === '55555555555' ||
          strCPF === '66666666666' ||
          strCPF === '77777777777' ||
          strCPF === '88888888888' ||
          strCPF === '99999999999'
        ) {
          return false;
        }
        // Valida 1o digito
        let add = 0;
        // tslint:disable-next-line:curly
        for (let i = 0; i < 9; i++)
          // tslint:disable-next-line:radix
          add += parseInt(strCPF.charAt(i)) * (10 - i);
        let rev = 11 - add % 11;
        // tslint:disable-next-line:curly
        if (rev === 10 || rev === 11) rev = 0;
        // tslint:disable-next-line:radix
        if (rev !== parseInt(strCPF.charAt(9))) {
          return false;
        }
        add = 0;
        // tslint:disable-next-line:curly
        for (let i = 0; i < 10; i++)
          // tslint:disable-next-line:radix
          add += parseInt(strCPF.charAt(i)) * (11 - i);
        rev = 11 - add % 11;
        // tslint:disable-next-line:curly
        if (rev === 10 || rev === 11) rev = 0;
        // tslint:disable-next-line:radix
        if (rev !== parseInt(strCPF.charAt(10))) {
          return false;
        }
        return true;
      }
    }
  
  
    //INICIO VALIDAÇÃO CNPJ 
    static validarCnpj(pCnpj) {
      let ret = false;
      // Garante que o valor é uma string
      let valor = pCnpj;
  
      // Remove caracteres inválidos do valor
      valor = valor.replace(/[^0-9]/g, '');
  
      // O valor original
      const cnpj_original = valor;
  
      // Captura os primeiros 12 números do CNPJ
      const primeiros_numeros_cnpj = valor.substr(0, 12);
  
      // Faz o primeiro cálculo
      const primeiro_calculo = this.calc_digitos_posicoes(primeiros_numeros_cnpj, 5);
  
      // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
      const segundo_calculo = this.calc_digitos_posicoes(primeiro_calculo, 6);
  
      // Concatena o segundo dígito ao CNPJ
      const cnpj = segundo_calculo;
  
      // Verifica se o CNPJ gerado é idêntico ao enviado
      if (cnpj === cnpj_original) {
        //this.classInput = '';
        ret = true;
      } else {
        //this.classInput = 'has-danger';
      }
  
      //this.cnpjIsValid = ret;
  
      // Retorna falso por padrão
      return ret;
    }
  
    static calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {
      // Garante que o valor é uma string
      digitos = digitos.toString();
  
      // Faz a soma dos dígitos com a posição
      // Ex. para 10 posições:
      //   0    2    5    4    6    2    8    8   4
      // x10   x9   x8   x7   x6   x5   x4   x3  x2
      //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
      for (let i = 0; i < digitos.length; i++) {
        // Preenche a soma com o dígito vezes a posição
        soma_digitos = soma_digitos + (digitos[i] * posicoes);
  
        // Subtrai 1 da posição
        posicoes--;
  
        // Parte específica para CNPJ
        // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
        if (posicoes < 2) {
          // Retorno a posição para 9
          posicoes = 9;
        }
      }
  
      // Captura o resto da divisão entre soma_digitos dividido por 11
      // Ex.: 196 % 11 = 9
      soma_digitos = soma_digitos % 11;
  
      // Verifica se soma_digitos é menor que 2
      if (soma_digitos < 2) {
        // soma_digitos agora será zero
        soma_digitos = 0;
      } else {
        // Se for maior que 2, o resultado é 11 menos soma_digitos
        // Ex.: 11 - 9 = 2
        // Nosso dígito procurado é 2
        soma_digitos = 11 - soma_digitos;
      }
  
      // Concatena mais um dígito aos primeiro nove dígitos
      // Ex.: 025462884 + 2 = 0254628842
      const cnpj = digitos + soma_digitos;
      // Retorna
      return cnpj;
    }
  
    //FINAL VALIDAÇÃO CNPJ
  
  
  
  }//FIM
  