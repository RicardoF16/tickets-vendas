const permissoes = role => (req, res, next) => {
  
  if (req.usuario && req.usuario.role >= role) {
    next();
  } else {
    res.status(403).send("Unauthorized");
  }
};

module.exports = permissoes;



// TIPOS PERMISSOES

//0 - 9     - USUÁRIOS
//80 - 90   - FUNCIONÁRIOS
//99        - SUPER ADMIN