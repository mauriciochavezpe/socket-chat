var socket = io();
var lstContacto = document.getElementById("listaContactos");
var chat = document.getElementById("listaContactos");
var id = null;
var fEnviar = document.getElementById("formEnviar");
socket.on('connect', () => {
    console.log("conectado al servidor")

})

socket.on('disconnect', () => {
    console.log("Desconectado del servidor")
})

socket.on('listaPersona', (obj) => {
    console.log("dasdasdasd");
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
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
} 

chat.addEventListener('click', ventanaChat)

function ventanaChat(e){
    console.log(e.target.id)
    id = e.target.id;
}

fEnviar.addEventListener('submit',function(e){
    e.preventDefault();
    socket.emit('mensaje',{ mensaje: document.getElementById("txtMensaje").value ,id:id })
})

socket.on('mensaje',(info)=>{
    console.log(info);
})