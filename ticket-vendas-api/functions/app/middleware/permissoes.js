const validarPermissao = papel => (req, res, next) => {
  
  if (req.usuario && req.usuario.papel >= papel) {
    next();
  } else {
    res.status(403).send("Unauthorized");
  }
};

module.exports = validarPermissao;
