const IuguService = require('./app/services/iugu.service');
const UsuarioModel = require('./app/services/usuario.service');


const iugu = async () => {
  const page = await UsuarioModel.getAll({perPage: 99});

  for (let i = 0; i < page.list.length; i++) {
    const usuario = page.list[i];
    if(!usuario.idGateway) {
      const iuguCliente = await IuguService.criarCliente({
        name: usuario.name,
        email: usuario.email
      });
      usuario.idGateway = iuguCliente.id;
      await UsuarioModel.update(usuario.id, usuario)
    }
  }
}


iugu();
