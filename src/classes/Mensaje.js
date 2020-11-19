class Mensaje {
    constructor() {
    }

    send(msg) {
        return {
            nombre: msg.nombre,
            mensaje: msg.mensaje,
            fecha: new Date().getTime(),
            uui: Math.floor(Math.random()*10000000000)
        };
    }

}

module.exports = Mensaje;