const fs = require('fs');
const DB = require('../json/db.json');
// console.log(DB);
class Contact {
    constructor() {
        this.contactos = [];
        this.db = DB.USUARIOS;
    }
    add(mail,user){
        // user : name, uuid, mail,
        // console.log(this.db);
        try {
            delete user.mailUser;
            if(this.db.length>=1){

                this.db.find(user=>user.mail===mail).contact.push(user);
                this.agregarJSON();
                return "Contacto agregado exitosamente."
            }
            else{
                return "No hay Usuarios";
            }
        } catch (error) {
            return error;
        }
       
    }
    remove(user){
         var contactos = this.contactos.filter(contact=>contact.id!=user.id);
        this.agregarJSON();
        return contactos;
    }
    getContact(id){
        return this.contactos.filter(contact=>contact.id===user.id)[0];
    }
    getAllContact(){
        return this.contactos;
    }  
    agregarJSON() {

        fs.writeFileSync("./src/json/db.json",JSON.stringify({USUARIOS:this.db}))
    }
}

module.exports = Contact;