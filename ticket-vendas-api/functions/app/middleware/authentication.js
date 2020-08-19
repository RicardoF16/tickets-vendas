const { admin } = require('../lib/firebase');
const UsuarioModel = require('../services/usuario.service');

const validarBearerToken = (req, res, next) => {

    if (
        (!req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer ')) &&
        !req.cookies.__session
    ) {
        //console.log('Unauthorized');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        idToken = req.cookies.__session;
    }
    admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedIdToken => {

            UsuarioModel.getByUid(decodedIdToken.uid)
                .then(usuario => {
                    if (usuario) {
                        usuario.id = decodedIdToken.uid;
                    }

                    req.usuario = usuario;
                    next();
                });
        })
        .catch(error => {
            console.log('decodedIdToken 2 >>', error);
            res.status(403).send('Unauthorized' + idToken);
        });
};

module.exports = validarBearerToken;
