var socket = io();

var lstContacto = document.getElementById("listaContactos");
var chat = document.getElementById("listaContactos");
var send = document.getElementById("formEnviar");
var divChat = document.getElementById("divChatbox");
var id = null;
var email = document.getElementById("username");

socket.on('connect', function () {
    console.log("conectado al servidor")

});
socket.on('disconnect', function () {
    console.log("Desconectado del servidor")
})

function agregarUsuario() {
    socket.emit("conectarSala", { sala: "Juegos", email: document.getElementById("username").value }, (info) => {
        document.getElementById("container-login").classList.add("hidden");
        document.getElementById("container-chat").classList.remove("hidden");
        document.getElementById("container-chat").classList.add("block");

    });
}

socket.on('listaPersona', (obj) => {
    renderizarlista(obj);
})


function renderizarlista(obj) {
    lstContacto.innerHTML = null;
    obj.lista.map(contacto => {
        var li = document.createElement("li");
        li.classList.add("border-b-0,relative")
        li.innerHTML = `
        <a  class="absolute w-full h-full bg-transparent z-index-100" id=${contacto.id} href="javascript:void(0)">
        </a>
        <div data-b="box-chat" class="w-full flex border">
            <div class="m-3">
                <img class="h-12 rounded-full" src="./assets/download.png" alt="">
            </div>
            <div class="my-3 mr-3 w-4/5">
                <div class="flex justify-between">
                    <span>${contacto.nombre}</span>
                    <span>Today</span>
                </div>
                <div class="flex justify-between">
                    <span>mensaje</span>
                    <span class="w-6">
                        <div
                            class=" bg-yellow-500 color-white border rounded-full text-center">
                            2</div>
                    </span>
                </div>
            </div>
        </div>
    `
        lstContacto.appendChild(li)
    })

}

function scrollBottom() {

    // selectors
    var ultimo =  divChat.children.length

    var newMessage = divChat.scrollHeight;
    divChat.scrollTo(0,newMessage);
    // heights
    // var clientHeight = divChat.prop('clientHeight');
    // var scrollTop = divChat.prop('scrollTop');
    // var scrollHeight = divChat.prop('scrollHeight');
    // var newMessageHeight = newMessage.innerHeight();
    // var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    // if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //     divChatbox.scrollTop(scrollHeight);
    // }
}

chat.addEventListener('click', ventanaChat)

function ventanaChat(e) {
    console.log(e.target.id)

    id = e.target.id;

    // div.innerHTML = id;
}

send.addEventListener('submit', function (e) {
    e.preventDefault();
    socket.emit('mensaje', { mensaje: document.getElementById("txtMensaje").value, id: id }, function (info) {
        console.log(info);
        mensaje(info, true)
        document.getElementById("txtMensaje").value = "";
    })
})

socket.on('mensaje', (info) => {
    mensaje(info, false)
})

function mensaje(info, propietario) {
    var li = document.createElement("li");
    let justify = `${propietario ? 'justify-end' : 'justify-start'}`;
    let horas = new Date(info.fecha).getHours() > 10 ? new Date(info.fecha).getHours() : "0" + new Date(info.fecha).getHours();
    let minutos = new Date().getMinutes() > 10 ? new Date(info.fecha).getMinutes() : +"0" + new Date(info.fecha).getMinutes();
    let inter = new Date(info.fecha).getHours() > 12 ? "PM" : "AM";
 
        li.classList.add("w-full", "my-1", "flex", justify);
    // ` <li class="w-full my-1 flex ${propietario ? "justify-end" : "justify-start"}">
    li.innerHTML = `  <div class=" min-w-0 max-w-sm border flex flex-col rounded-2xl">
        <div class="text-14 w-full pt-2 px-2 break-words">${info.mensaje}</div>
        <div class="text-11 m-2 self-end"> ${horas +":"+ minutos+" "+ inter }</div>
    </div>`
    divChat.appendChild(li);
    this.scrollBottom()
}

email.addEventListener("keypress",function(e){
    // console.log(e);
    if(e.keyCode===13){
        agregarUsuario()
    }
})

// socket.emit('listaPersona',{sala:"Juegos"}, (listaUsuarios) => {
//     console.log("lista de personas",listaUsuarios);
// })
// socket.on('crearMensaje',(info)=>{
//     console.log(info);
// })


