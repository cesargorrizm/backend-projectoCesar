const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWY_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                // no se ha creado el token
                reject('No se pudo generar el JWT');
            } else {
                // Token!
                resolve(token);
            }
        })
    });
}
const comprobarJWT=(token = '')=>{

    try {
        const {uid} = jwt.verify(token, process.env.JWY_KEY);
        
        return [true, uid] ;

    } catch (error) {
        return [false,null];
    }
}


module.exports = {
    generarJWT,
    comprobarJWT
}