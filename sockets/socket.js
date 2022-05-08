
const {io} = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    client.on('disconnect', () => { 
        console.log('Cliente desconetado');
    });

    client.on('mensaje', (payload) => {
        console.log('msg', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });
});