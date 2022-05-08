
const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bad Bunny'));
bands.addBand(new Band('Carol G'));
bands.addBand(new Band('Anuel'));

// console.log(bands.getBands());

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);
        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });

    client.on('vote-band', ( payload ) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', ( payload ) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', ( payload ) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


    client.on('emitir-mensaje', ( payload ) => {
        // io.emit( 'nuevo-mensaje', payload ); //emitite a todos los clientes
        // io.emit( 'nuevo-mensaje', payload ); //emitite a todos los clientes

        client.broadcast.emit( 'nuevo-mensaje', payload ); //emite a todos los clientes excepto al que lo envia
    });
});