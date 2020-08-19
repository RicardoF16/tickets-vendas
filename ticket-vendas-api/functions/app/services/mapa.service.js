const SolicitacaoModel = require('../models/evento.model');
let distanceCalculator = require('../helpers/distance-calculator.helper');



class SolicitacaoService {


  getAllSolicitacoes(query) {
    if(!query) {
      query = {};
    }
    return SolicitacaoModel.rebuild(`/solicitacoes`).find(query);
  }


  getSolicitacoesMapaService(latUsuario, longUsuario, raio) {
    return new Promise((resolve, reject) => {
      let solicitacaoRaio = [];
      this.getAllSolicitacoes({
        perPage: 1000,
        where: '(status,=,1)'
      }).then(solitacoes => {
        // solitacoes.list = solitacoes.list.filter(solicitation => {
        //   return solicitation.status !== 0;
        // });
        if (solitacoes) {
          console.log('solitacoes =>>>>>', solitacoes);
          
          solitacoes.list.forEach(solicitacao => {
            const result = distanceCalculator(solicitacao.lat, solicitacao.long, latUsuario, longUsuario, raio);
            if (result) {
              solicitacaoRaio.push({ ...solicitacao });
            }
            else {
              // console.log('Fora do raio para notificação!')
            }
          });

          console.log('Socitações dentro do raio >> ', solicitacaoRaio);

          resolve(solicitacaoRaio);
        }
      }).catch(err => {
        console.error("Erro na busca das solicitações por lat long!");
      });
    })
  }


}

module.exports = new SolicitacaoService();