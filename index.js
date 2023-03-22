const { Socket } = require('socket.io')

const io = require('socket.io')(8000)

const users = {};

io.on('connection' , Socket =>{
    Socket.on('new-user-joined' , name=>{
        users[Socket.id] = name; 
        console.log("New User" , name);
        Socket.broadcast.emit('user-joined' , name);
    });
    Socket.on('send' , message=>{
        Socket.broadcast.emit('recieve',{message:message , name:users[Socket.id]});
    });
    Socket.on('disconnect' , message =>{
        Socket.broadcast.emit('left' , users[Socket.id]);
        delete users[Socket.id];
    })
})