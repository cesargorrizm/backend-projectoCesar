/*
    path: api/usuario
*/
const { Router } = require('express');
const  Usuario  = require('../models/usuario');



const router = Router();
const getUsuario= async(req,res= response)=>{
    const searchedField = req.query.email;

    const  usuarios= await Usuario.find({email:{$regex:searchedField,$options:'$i'}});
    res.json({
        
        usuarios
    
    });


}

router.get('/',getUsuario);

module.exports=router;