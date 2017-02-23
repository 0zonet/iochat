const socket = io.connect('http://localhost:3000',{'forceNew': true});

let $messageForm = $('#messageForm');
let $message = $('#message');
let $chat = $('#chat');
let $users = $('#users');

//Enviar mensaje
$messageForm.submit((e)=>{
    e.preventDefault();
    let msg = $message.val();
    if(msg.length > 0){
         socket.emit('send message', $message.val());
         $message.val('');
    }
});


//Recivir mensaje
socket.on('new message',(data)=>{
    console.log(data);
    let template = `<div class="alert alert-info">${data.message}</div>`;
    $chat.append(template);
});