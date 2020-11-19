const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = require('./sockets/io')(server);


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 9080;

app.use(express.static(publicPath));

io;




server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});