const UsuarioService = require('../../services/usuario.service');
const IuguService = require('../../services/iugu.service');
const Mailer = require('../../lib/mailer');
const HookService = require('../../services/hook.service');
const dateFormat = require('dateformat');

class IuguController {

  // hooks: https://dev.iugu.com/docs/referencias-gatilhos
  hook(req, res) {
    const body = req.body;
    const idAccount = body.account_id;
    const today = dateFormat(new Date, 'dd-mm-yyyy');

    switch (body.event) {
      case 'invoice.payment_failed':
        const idAssintura = body.data.subscription_id;

        IuguService.assinturaPorId(idAssintura)
          .then(subscription => {
            UsuarioService.getOne({ where: `(idGateway,=,${subscription.customer_id})` })
              .then(usuario => {
                UsuarioService.suspenderAssinatura(usuario.id, idAssintura)
                  .then(() => {
                    Mailer.enviarEmail(usuario.email, { template: 'email', conteudo: `Fizemos uma tentativa de ativar sua assinatura sem sucesso! Verifique na central de pagamento do PetCarPeople se você possui um cartão de crédito valido e ative uma nova assinatura.` });
                  });
              });
          })
        break;
      case 'subscription.renewed':
        const id = body.data.id;
        UsuarioService.getOne({ where: `(email,=,${body.data.customer_email})` })
          .then(usuario => {
            const info = {
              idAssinatura: id,
              criadaEm: today
            };

            if (usuario.assinaturas) {
              const index = usuario.assinaturas.findIndex(assinatura => assinatura.idAssinatura === id);
              if (index < 0) {
                usuario.assinaturas.push(info);
                usuario.veiculosDisponiveis++;
              }
            } else {
              usuario.assinaturas = [info];
              if (usuario.veiculosDisponiveis) {
                usuario.veiculosDisponiveis++;
              } else {
                usuario.veiculosDisponiveis = 1;
              }
            }

            UsuarioService.update(usuario.id, usuario)
              .then(() => { });
          });

        break;
      default:
        break;
    }

    HookService.create({
      data: body,
      createdAt: today,
    }).then(created => {
      res.sendStatus(200);
    }).catch(err => {
      res.sendStatus(500);
    })

  }

  adicionarCartao(req, res) {
    const cartao = req.body;
    const usuario = req.usuario;

    UsuarioService.addCartao(usuario.idGateway, cartao)
      .then(() => {
        res.status(201).send({});
      }).catch(err => {
        res.status(403).send(err);
      })
  }

  removerCartao(req, res) {
    const { id } = req.params;
    const usuario = req.usuario;

    UsuarioService.removeCartao(usuario.idGateway, id)
      .then(() => {
        res.status(200).send({});
      }).catch(err => {
        res.send(err);
      })
  }

  listarCartoes(req, res) {
    const usuario = req.usuario;

    UsuarioService.listarCartoes(usuario.idGateway)
      .then(cartoes => {
        res.send(cartoes);
      }).catch(err => {
        res.status(403).send({
          msg: 'ERROR_LIST_CARDS'
        });
      });
  }

  criarAssinatura(req, res) {
    const { type, ...cliente } = req.body;

    const usuario = req.usuario;
    UsuarioService.criarAssinatura(usuario.id, type, cliente)
      .then(transaction => {
        res.send(transaction);
      }).catch(err => {
        res.status(403).send({
          msg: 'ERROR_CREATING_SIGNATURE',
          trace: err
        });
      })
  }

  suspenderAssinatura(req, res) {
    const usuario = req.usuario;
    const { id } = req.params;

    UsuarioService.suspenderAssinatura(usuario.id, id)
      .then(() => {
        res.status(200).send({});
      }).catch(err => {
        res.status(403).send(err);
      })
  }

  listarAssinturas(req, res) {
    const usuario = req.usuario;

    UsuarioService.listarAssinaturaAtivas(usuario.idGateway)
      .then((assinaturas) => {
        res.send(assinaturas);
      }).catch(err => {
        res.status(501);
      })
  }

  // buscarBoleto(req, res) {
  //   // const usuario = req.usuario;
  //   const { id } = req.params;

  //   UsuarioService.buscarBoletoId(id)
  //     .then((boleto) => {
  //       res.send(boleto);
  //     }).catch(err => {
  //       res.status(501);
  //     })
  // }
}

module.exports = new IuguController();