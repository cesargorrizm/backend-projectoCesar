const { response } = require("express");
const Usuario = require("../models/usuario")
const bcript = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { json } = require("express/lib/response");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existEmail = await Usuario.findOne({ email: email });

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }
        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcript.genSaltSync();
        usuario.password = bcript.hashSync(password, salt);

        await usuario.save();

        //Generar mi JWT Json Web Token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'fallo inesperado'
        });
    }
};

//contorlador de login
const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email: email });
        if (!usuarioDB) {
            return res.status(404), json({
                ok: false,
                msg: 'Email no enconcontrado'
            });
        };

        const validPasword = bcript.compareSync(password, usuarioDB.password);
        if (!validPasword) {
            return res.status(404), json({
                ok: false,
                msg: 'contrseña no es valida'
            });
        };

        
        //generar JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'fallo inesperado'
        });

    }
};

const renewToken= async(req,res= response)=>{

    
    const usuario = await Usuario.findById(req.uid);
    
    const token = await generarJWT(usuario.id);

    res.json({
        ok:true,
        usuario,
        token
    });
}

module.exports = { crearUsuario, login, renewToken };
