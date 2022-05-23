const mogoose = require('mongoose');

const dbConecction =async() =>{
    try {
      await  mogoose.connect(process.env.BD_CNN);
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conceta con la base de datos');
    }
}



module.exports={
    dbConecction
}