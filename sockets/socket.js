const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado,usuarioDesconectado, grabarmendaje  } = require('../controllers/soket');



// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');


    const [valido,uid] = comprobarJWT(client.handshake.headers['x-token']);
    //verificar autenticación
    if (!valido) {
       return client.disconnect(); 
    }
    //cliente autenticado
     usuarioConectado(uid);
     console.log(valido,uid);
    //Ingresar al usuario a una sala
    //sala global , cliente id
    client.join(uid);
    //escuchar el cliente mensaje personal
    client.on('mensaje-personal',async(payload)=>{
        console.log(payload);
        //grabar mensaje
        await grabarmendaje(payload);

        io.to(payload.para).emit('mensaje-personal',payload);
    });
    //escuchar notificacion
    client.on('videollamada-personal',async(payload)=>{
        console.log(payload);

        io.to(payload.para).emit('videollamada-personal',payload);
    });

    //desconectar cliente
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
