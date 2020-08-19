const SolicitacaoService = require('../../services/evento.service');
const MapaService = require('../../services/mapa.service');



class MapaController {

  
  getSolitacoesMapa(req, res) {
    
    const { latUser, longUser, raio } = req.params;

    console.log('Lat User >> ', latUser );
    console.log('longUser >> ', longUser );

    MapaService.getSolicitacoesMapaService(latUser, longUser, raio)
      .then(mapa => {
        if (mapa) {
          res.send(mapa)
        }
      }).catch(err => {
        if(err.hasError) {
          res.status(400).send(err);  
        } else {
          res.sendStatus(500);
        }
      });
  }

  



}
module.exports = new MapaController();