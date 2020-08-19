const GiftCardService = require('../../services/giftcard.service');


class GiftCardController {

  getAll(req, res) {
    const query = req.query;

    GiftCardService.getAll(query)
      .then(giftcards => {
        if (giftcards) {
          res.send(giftcards);
        }
      }).catch(err => {
        res.status(500).send(err);
      });
  }


  post(req, res) {
    const { serie, quantidade, duracaoMeses } = req.body;

    GiftCardService.create(serie, quantidade, duracaoMeses)
      .then(giftcardCriado => {
        res.send(giftcardCriado);
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  use(req, res) {
    const { id } = req.params;
    const uid = req.usuario.id;
    
    GiftCardService.use(uid, id)
      .then(giftcard => {
        res.send(giftcard);
      }).catch(err => {
        res.status(500).send(err);
      });
  }

  delete(req, res) {
    const { id } = req.params;

    GiftCardService.delete(id)
      .then(() => {
        res.send({})
      }).catch(err => {
        res.status(500).send(err);
      });
  }

}

module.exports = new GiftCardController();