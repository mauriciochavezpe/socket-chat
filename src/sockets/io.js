const socketIO = require('socket.io');
const User = require('../classes/User');
const Mensaje = require('../classes/Mensaje');


const user = new User();
const mensaje = new Mensaje();

const socket = (server) => {
    const io = socketIO(server);
    io.on('connection', (client) => {

        client.on('conectarSala', (req, callback) => {
            var sala = req.sala;
            req.id = client.id;
            req.nombre = "TEST " + Math.floor(Math.random() * 10)

            if (!sala) {

                return callback({
                    message: "No hay informacion de sala"
                })
            }
            client.join(sala) //unimos a sala 
            user.add(req) // agregamos usuario 
            client.broadcast.emit('listaPersona', { lista: user.getUsers() });
            // client.broadcast.to(sala).emit('listaPersona', user.getUsersGroup(req.sala)) // actualizamos info de sala
            // client.broadcast.to(sala).emit('crearMensaje', mensaje.send({mensaje:"TEST XYZ", nombre:req.nombre}))
            callback(user.getUsers())
        })
        client.emit('listaPersona', { lista: user.getUsers() });
        client.on('listaPersona', (req, callback) => {
            var lst = user.getUsersGroup(req.sala);
            callback(lst)
        })

        client.on('mensaje', (req, callback) => {
            let persona = user.getUser(client.id);
            var msg = mensaje.send({ mensaje: req.mensaje, nombre: persona.nombre })
            client.broadcast.to(req.id).emit('mensaje', msg);
            callback(msg);
        })

        client.on('mensajePrivado', (response) => {
            console.log(response);
        })
        client.on('disconnect', () => {
            console.log(`Usuario desconectado`);
        })
























        // client.on("crearUsuario", (data, callback) => {
        //     data.id = client.id;
        //     data.contact = [];
        //     if (data.name && data.mail) {
        //         user.add(data);
        //         return callback({
        //             status: 200,
        //             message: "Agregado exitosamente."
        //         });
        //     }
        //     else {
        //         return callback({
        //             status: 200,
        //             message: "Error al momento de agregar"
        //         });
        //     }

        // })
        // client.on("crearContacto", (data, callback) => {

        //     var msg = contact.add(data.mailUser,data);
        //     return callback({
        //         status: 200,
        //         message: msg
        //     });
        // })
        // client.on("mensajes",(data)=>{
        // })
    })
}

module.exports = socket;
