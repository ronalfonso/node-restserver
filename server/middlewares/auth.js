const jwt = require('jsonwebtoken');

//===================================
//        Verificar Token
//===================================
let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

       if (err) {
           return res.status(401).jsonp({
               ok: false,
               err: {
                   message: 'Token no valido'
               }
           });
       }

       req.usuario = decoded.usuario;
       next();

    });
};

//===================================
//Verifica Admin_Role
//===================================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if ( usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

};


module.exports = {
    verificaToken,
    verificaAdmin_Role
};
