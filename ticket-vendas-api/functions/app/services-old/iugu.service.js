const request =  require('request');
const TransacaoModel = require('../models/transacao.model');
const dateFormat = require('dateformat');

// const API_KEY = '0a31a84a23b69ec7d4b7bf2e3f5d9e84'; // teste
const API_KEY = '33a619b25841380b76ec03721d6994f4'; // produção
const API = 'https://api.iugu.com/v1'

// docs: https://dev.iugu.com/reference
class IuguService {

  criarCliente(cliente) {
    // https://api.iugu.com/v1/customers
    // expected cliente params: email, name

    return new Promise((resolve, reject) => {
      request({
        url: API + '/customers',
        method: 'POST',
        auth: {
          'user': API_KEY,
          'pass': ''
        },
        json: cliente
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        } 
      });
    });
  }

  updateCliente(idCliente, cliente) {
    // https://api.iugu.com/v1/customers
    // expected cliente params: email, name

    return new Promise((resolve, reject) => {
      request({
        url: API + '/customers/' + idCliente,
        method: 'PUT',
        auth: {
          'user': API_KEY,
          'pass': ''
        },
        json: cliente
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        } 
      });
    });
  }

  listarCartoes(idCliente) {
    // https://api.iugu.com/v1/customers/customer_id/payment_methods

    if(!idCliente) {
      throw new Error('idCliente can not be null or empty');
    }

    return new Promise((resolve, reject) => {
      request({
        url: `${API}/customers/${idCliente}/payment_methods`,
        method: 'GET',
        auth: {
          'user': API_KEY,
          'pass': ''
        }
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          const resp = JSON.parse(body)
          resolve(resp);
        } 
      });
    });
  }

  adicionarCartao(idCliente, cartao) {
    // https://api.iugu.com/v1/customers/customer_id/payment_methods
    // expected cartao params: description, token, set_as_default

    if(!idCliente) {
      throw new Error('idCliente can not be null or empty');
    }

    cartao.set_as_default = true;
    
    // console.log(cartao);

    return new Promise((resolve, reject) => {
      request({
        url: `${API}/customers/${idCliente}/payment_methods`,
        method: 'POST',
        auth: {
          'user': API_KEY,
          'pass': ''
        },
        json: cartao
      }, (error, response, body) => {
        if (error) {
          console.log('error => ', error);
          reject(error);
        } else {
          
          if(body.errors) {
            console.log('body.errors ', body.errors);
            reject(body.errors);
          } else {
            resolve(body);
          }
        } 
      });
    });
  }

  removerCartao(idCliente, idCartao) {
    // https://api.iugu.com/v1/customers/customer_id/payment_methods/id

    if(!idCliente || !idCartao) {
      throw new Error('idCliente and idCartao can not be null or empty');
    }

    return new Promise((resolve, reject) => {
      request({
        url: `${API}/customers/${idCliente}/payment_methods/${idCartao}`,
        method: 'DELETE',
        auth: {
          'user': API_KEY,
          'pass': ''
        },
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        } 
      });
    });
  }

  listarAssintura(idCliente) {
    // https://api.iugu.com/v1/subscriptions
    return new Promise((resolve, reject) => {
      request({
        url: API + '/subscriptions?status_filter=active&customer_id=' + idCliente,
        method: 'GET',
        auth: {
          'user': API_KEY,
          'pass': ''
        }
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          const resp = JSON.parse(body)
          resolve(resp.items);
        } 
      });
    });
  }

  // boletoPorId(id) {
  //   // https://api.iugu.com/v1/subscriptions
  //   return new Promise((resolve, reject) => {
  //     console.log(API + '/invoices/' + id + '/capture');
      
  //     request({
  //       url: API + '/invoices/' + id,
  //       method: 'GET',
  //       auth: {
  //         'user': API_KEY,
  //         'pass': ''
  //       }
  //     }, (error, response, body) => {
  //       console.log('body ', body);
        
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(JSON.parse(body));
  //       } 
  //     });
  //   });
  // }

  assinturaPorId(id) {
    // https://api.iugu.com/v1/subscriptions
    return new Promise((resolve, reject) => {
      request({
        url: API + '/subscriptions/' + id,
        method: 'GET',
        auth: {
          'user': API_KEY,
          'pass': ''
        }
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        } 
      });
    });
  }

  reativarAssinatura(idAssinatura) {
    // https://api.iugu.com/v1/subscriptions/id/activate

    return new Promise((resolve, reject) => {
      request({
        url: API + `/subscriptions/${idAssinatura}/activate`,
        method: 'POST',
        auth: {
          'user': API_KEY,
          'pass': ''
        }
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(body));
        } 
      });
    });
  }

  suspenderAssinatura(idAssinatura) {
    // https://api.iugu.com/v1/subscriptions/id/suspend

    return new Promise((resolve, reject) => {
      request({
        url: API + `/subscriptions/${idAssinatura}/suspend`,
        method: 'POST',
        auth: {
          'user': API_KEY,
          'pass': ''
        }
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        } 
      });
    });
  }
  
  criarAssinatura(idCliente, isSecond, payable_with) {
    // https://api.iugu.com/v1/subscriptions
    let date = new Date();
    const assinatura = {
      plan_identifier: 'basic_plan',
      customer_id: idCliente,
      payable_with: payable_with
    };

    if(payable_with == 'credit_card') {
      if(!isSecond && payable_with) {
        date.setDate(date.getDate() + 30);
      } else {
        assinatura.only_on_charge_success = true;
      }
    } else {
      date.setDate(date.getDate() + 30);
    }

    const formatedDate = dateFormat(date, 'dd-mm-yyyy');
    assinatura.expires_at = formatedDate;

    // console.log('ASSINATURA =>>>>>> ', assinatura);
    
    return new Promise((resolve, reject) => {
      request({
        url: API + '/subscriptions',
        method: 'POST',
        auth: {
          'user': API_KEY,
          'pass': ''
        },
        json: assinatura
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          if(!body.id) {
            reject(body);
          } else {
            const transacao = {
              idTransaction: body.id,
              data: body,
              createdAt: formatedDate
            };
            resolve(transacao);
            TransacaoModel.create(transacao).then(() => {
              console.log('transaction created');
            }).catch(err => {
              console.log('error trying to create the transaction');
            });
          }
    
        } 
      });
    });

  }

}

module.exports = new IuguService();