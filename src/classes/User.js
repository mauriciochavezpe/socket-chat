const DB = require('../json/db.json');
const fs = require('fs');
class User {
    /**
     * nombre
     * group
     * mail
     * group:[]
     */
    constructor() {
        this.personas = [];
        this.personas = DB.USUARIOS;
    }

    getUser(id) {
        // console.log(this.personas)
        return this.personas.filter(persona => persona.id === id)[0];
    }
    getUsers() {
        return this.personas;
    }
    removeUser(id) {
        this.personas = this.personas.filter(persona => persona.id != id);
        return this.personas;
    }
    agregarJSON() {
        fs.writeFileSync("./src/json/db.json", JSON.stringify({ USUARIOS: this.personas }))
    }
    getUsersGroup(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }
    add(user) {
       var persona = this.personas.filter((persona) => persona.email == user.email)[0];
   
        if (persona != undefined) {
            this.personas.map((p) => {
                if (p.email == persona.email) {
                    p.id = user.id;
                    console.log("Usuario actualizado")
                }
            })
        }
        else {
            console.log("Usuario creado")
            this.personas.push(user);
        }
        this.agregarJSON();
    }
}

module.exports = User;
