const GiftcardModel = require('../models/giftcard.model');
const UsuarioModel = require('../models/usuario.model');
const uuidv1 = require('uuid/v1');

class GiftcardService {

  getAll(query) {
    return GiftcardModel.find(query);
  }

  async create(serie, quantidade, duracaoMeses) {
    const page = await GiftcardModel.find({ perPage: 99999999 });
    let lastSerie = 0;

    page.list.forEach(giftcard => {
      const serieNum = Number(giftcard.serie);
      if(serieNum > lastSerie) {
        lastSerie = serieNum + 1;
      }
    });
    
    if(lastSerie < 10) {
      lastSerie = `0${lastSerie}`; 
    }
  
    if(lastSerie) {
      const giftcards = [];

      for (let i = 0; i < quantidade; i++) {  
        const uuid = uuidv1();
        const giftcard = {
          id: uuid,
          codigo: uuid,
          serie: lastSerie,
          display: `${lastSerie}-${uuid}`,
          duracaoMeses: Number(duracaoMeses)
        };
        const giftcardCreated = await GiftcardModel.create(giftcard);
        giftcards.push(giftcardCreated);
      }

      return giftcards;
      
    } else {
      throw {
        hasError: true,
        erros: ['A serie deve ter pelo menos dois número.']
      };
    }
  }

  separateSerieAndHash(display) {
    const giftcardPair = {};
    const hash = display.split('-');
    giftcardPair.serie = hash[0];
    giftcardPair.codigo = hash.slice(1, hash.length).join('-');
    return giftcardPair;
  }

  async use(uid, id) {
    const giftcardPair = this.separateSerieAndHash(id);
    const giftcard = await GiftcardModel.findById(giftcardPair.codigo);
    if(giftcard && giftcard.serie == giftcardPair.serie && !giftcard.usado) {
      giftcard.usado = true;
      giftcard.usadoPor = uid;

      await GiftcardModel.update(giftcardPair.codigo, giftcard);

      const usuario = await UsuarioModel.findById(uid);
      giftcard.usado = false;
      if (usuario.giftcards) {
        usuario.giftcards.push(giftcard);
      } else {
        usuario.giftcards = [giftcard];
      }

      if (usuario.veiculosDisponiveis) {
        usuario.veiculosDisponiveis++;
      } else {
        usuario.veiculosDisponiveis = 1;
      }

      await UsuarioModel.update(uid, usuario);

      return giftcard;
    } else if(giftcard && giftcard.usado) {
      throw {
        hasError: true,
        erros: ['O gifcard já foi utilizado e/ou expirou.']
      };
    } else {
      throw {
        hasError: true,
        erros: ['O gifcard está incorreto e/ou seu número de serie.']
      };
    }
  }

  update(id, giftcard) {
    return GiftcardModel.update(id, giftcard);
  }

  async delete(serie) {
    const page = await GiftcardModel.find({ perPage: 99999999, where: `(serie,=,${serie})` });

    for (let index = 0; index < page.list.length; index++) {
      const giftcard = page.list[index];
      if(!giftcard.usado) {
        await GiftcardModel.delete(giftcard.id);
      }
    }

    return true;
  }
}

module.exports = new GiftcardService();