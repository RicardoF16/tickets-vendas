const firebase = require('../../lib/firebase').firebase,
      axios = require('axios'),
      pagarme = require('pagarme');

const url = 'https://api.pagar.me/1/',
      api_key = 'PAGARME_API_KEY',
      config = {
        auth: {
          username: api_key,
          password: 'x'
        }
      };
  
class PagarMeController {
  getAllTransactions(req, res) {
    const API = url + 'transactions';

    axios.get(API, config)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        req.send(err);
      });
  }

  /**
  * @description URL de postback do pagar.me
  */
  receiveStatus(req, res) {
    const transaction = req.body;
    const transactionRef = firebase.database().ref('transactions/' + transaction.id);
  
    let signature = pagarme.postback.calculateSignature(
      req.headers['x-hub-signature'],
      JSON.stringify(req.body)
    );

    const valid = pagarme.postback.verifySignature(
      req.headers['x-hub-signature'],
      JSON.stringify(req.body),
      signature
    );

    if (valid) {
      transactionRef.once('value', logSnap => {
        let log = logSnap.val();

        log.status = transaction.current_status;

        // processing, authorized, paid, refunded, waiting_payment, pending_refund, refused;
        switch (log.status) {
          case 'paid':
              // fazer logica de aceite de pagamento;
            break;
          case 'refunded':
              // fazer logica de pagamento devolvido
            break;
          case 'refused':
              // fazer logica de pagamento negado
            break;
          default:
              // outros status aguardar ou não.
            break;
        }

        transactionRef.update(log);
      });
      res.send('OK').status(201);
    } else {
      res.status(404);
    }
  }

  doTransaction(req, res) {

    /**
     * verificar parametros de recebimento do transaction em
     * @ref https://docs.pagar.me/reference#criar-transacao
    */

    const API = url + 'transactions';
    const { uid, transaction } = req.body;

    transaction.payment_method = 'credit_card';
    transaction.postback_url = '/api/pagamento/receiveStatus/';

    axios.post(API, transaction, config)
      .then(response => {
        const transaction = response.data;

        firebase
          .database()
          .ref('transactions/' + transaction.id)
          .set({
            transaction: transaction,
            status: transaction.status,
            amount: transaction.amount,
            uid: uid,
            date: new Date().toJSON()
          });
        if (transaction.status === 'paid') {
          firebase
          
            .database()
            .ref('transactions/' + transaction.id)
            .update({ status: transaction.status });
        }
        res.send({ id: transaction.id, amount: transaction.amount });
      })
      .catch(err => {
        res.sendStatus(501);
      });
  }
}

module.exports = new PagarMeController();
