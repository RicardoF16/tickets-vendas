const UsuarioService = require('../../services/usuario.service');
// const itemService = require('../../services/item.service');
//const SolicitacaoService = require('../../services/evento.service');

class UsuarioController {

  getAll(req, res) {
    console.log('GetAll');
    const query = req.query;
    console.log('req.query >>', req.query);
    UsuarioService.getAll(query)
      .then(usuarios => {
        if (usuarios) {
          res.send(usuarios)
        }
      }).catch(err => {
        res.sendStatus(500);
      });
  }

  getById(req, res) {
    console.log('getById');
    const { uid } = req.params;

    UsuarioService.getByUid(uid)
      .then(usuario => {
        if (usuario) {
          res.send(usuario);
        } else {
          res.status(404).send('user not found');
        }
      }).catch(err => {
        res.sendStatus(500);
      });
  }

  getMe(req, res) {
    console.log('getMe');
    res.send(req.usuario);
  }

  putMe(req, res) {
    const usuario = req.body;
    delete usuario.premiumValidoAte;
    delete usuario.premium;

    UsuarioService.update(req.usuario.id, usuario)
      .then(usuario => {
        res.status(200).send(usuario);
      }).catch(err => {
        console.log(err);
        res.status(501).send(err);
      });
  }


  put(req, res) {
    const { uid } = req.params;
    const usuario = req.body;

    UsuarioService.update(uid, usuario)
      .then(usuario => {
        res.status(200).send(usuario);
      }).catch(err => {
        res.sendStatus(501)
      });
  }

  post(req, res) {
    const usuario = req.body;
    UsuarioService.create(usuario)
      .then(usuarioCriado => {
        res.status(201).send(usuarioCriado);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          if (err.code == 'auth/email-already-exists') {
            res.status(409).send(err);
          } else {
            res.sendStatus(500);
          }
        }
      });
  }

  admin(req, res) {
    const usuario = req.body;
    UsuarioService.adminLogin(usuario)
      .then(usuarioCriado => {
        res.status(201).send(usuarioCriado);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }

  postSocial(req, res) {
    const usuario = req.body;

    UsuarioService.createSocialLogin(usuario)
      .then(usuarioCriado => {
        res.status(201).send(usuarioCriado);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }

  delete(req, res) {
    const { uid } = req.params;

    UsuarioService.delete(uid)
      .then(usuarioDeletado => {
        res.status(200).send(usuarioDeletado);
      }).catch(err => {
        if (err.hasError) {
          res.status(400).send(err);
        } else {
          res.sendStatus(500);
        }
      });
  }
}
module.exports = new UsuarioController();