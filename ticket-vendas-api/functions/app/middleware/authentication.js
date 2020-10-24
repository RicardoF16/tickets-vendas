const { admin } = require('../lib/firebase');
const userService = require('../services/usuario.service');

const auth = (req, res, next) => {
    
    if (
        (!req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer ')) &&
        !req.cookies.__session
    ) {
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
            userService.getByUid(decodedIdToken.uid)
                .then(usuario => {
                    if (usuario) {
                        usuario.uid = decodedIdToken.uid;
                    }

                    req.usuario = usuario;
                    next();
                }).catch(ex => {
                    res.status(403).send('Unauthorized' + idToken);        
                });
        })
        .catch(error => {
            res.status(403).send('Unauthorized' + idToken);
        });
};

module.exports = auth;
