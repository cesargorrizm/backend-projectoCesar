const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //Leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.JWY_KEY);
        
        req.uid =uid;
        console.log(uid);

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validarJWT
}