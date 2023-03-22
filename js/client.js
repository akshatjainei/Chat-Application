const socket = require('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageConatiner = document.querySelector("conatiner"); 

const append = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    //prevents from loading again and again
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}` , 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter Your Name :");
socket.emit('new-user-joined' , name);

socket.on('user-joined' , name => {
    append(`${name} joined the chat` , 'right');
})

socket.on('recieve' , data => {
    append(`${data.name} : ${data.message}` , 'left');
})

socket.on('left' , name => {
    append(`${data.name} left the chat` , 'left');
})