const UsuarioModel = require('../models/usuario.model');

class ReportService {

  general() {
    const result = {
      usersRegister: 0,
      usersPremium: 0,
      totalVehicles: 0,
      totalPets: 0,
      totalPeople: 0, 
    };
    return new Promise((resolve, reject) => {
      UsuarioModel.find({
        perPage: 100000
      }).then(page => {
        page.list.forEach(user => {
          if(user.assinaturas) {
            result.usersPremium++;
          }

          if(user.pessoas) {
            result.totalVehicles += Object.values(user.pessoas).length;
          }

          if(user.pets) {
            result.totalPets += Object.values(user.pets).length;
          }

          if(user.veiculos) {
            result.totalVehicles += Object.values(user.veiculos).length;
          }
 
          result.usersRegister++;
        });
        resolve(result);
      });
    });
  }

  


}

module.exports = new ReportService();