const SuporteModel = require('../models/suporte.model');
const Mailer = require('../lib/mailer')
class SuporteService {

  create(suporte) {
    
    if (suporte.name !== undefined && suporte.email !== undefined && suporte.phone !== undefined && suporte.description !== undefined) {
        Mailer.enviarEmail('suportepetcarpeople@gmail.com', { template: 'suporte',
          name: suporte.name ,
          email: suporte.email,
          phone: suporte.phone,
          conteudo: suporte.description
        });

    } else {
       return Promise.reject('Os campos e-mail, telefone e descrição são obrigatórios');
    }

    return SuporteModel.create(suporte);
  }

}

module.exports = new SuporteService();