/*
    path: api/usuario
*/
const { Router } = require('express');
const  Usuario  = require('../models/usuario');



const router = Router();

router.get('/',(req,res,next)=>{
    const searchedField = req.query.email;
    Usuario.find({email:{$regex:searchedField,$options:'$i'}})
    .then(data=>{
        res.send(data);
    });
});

module.exports=router;