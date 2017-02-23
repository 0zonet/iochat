const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const port = 3000;






const users = [];
const connections = [];
// socket.io app
const io = require('socket.io')(server);





//socket action on connection
io.on('connection',(socket)=>{
    
    connections.push(socket);
    console.log('conectados: '+connections.length);

    //socket action on disconnected
    socket.on('disconnect',(data)=>{
        connections.splice(connections.indexOf(socket),1);
        console.log('conectados: '+connections.length);
    });


    //Enviar nuevo mensaje
    socket.on('send message',(message)=>{
        console.log(message);
        io.sockets.emit('new message',{message : message});
    });

});



//Middlewares
app.use(express.static(path.join(__dirname,'public')));


//set index route
app.get('/',(req,res)=>{
    res.render('index.html');
});

//Up server
server.listen(port, ()=>{
    console.log('Servidor listo en http://localhost:'+port);
});

