const path = require('path');
const http = require('http');
const express=require('express');
const socketio = require('socket.io');
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require("./utils/util-users");

const app=express();
const server = http.createServer(app);
const io = socketio(server);
const userRoute=require("./routes/users");
var bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: "50mb",
    extended: true,
    parameterLimit: 5000000000
}))

//set static folder
app.set("view engine", "ejs");
app.use(express.static( path.join(__dirname, 'public')));

//Run when a new client connects
io.on('connection',socket=>{
    socket.on('join-room',({username,room})=>{
        // console.log("a user joined ");
        const user=userJoin(socket.id,username,room);
        socket.join(user.room);

        socket.emit('message',formatMessage("bot",'welcome to chatapp'));
        //broadcast when a user connects
        socket.broadcast.to(user.room)
        .emit('message',formatMessage("bot",`${user.username} has joined the chat`));
        //send users and room info
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });
    });

    //Run  when client disconnects
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id);
        // console.log(user);
        if(user){
        io.to(user.room).emit('message',formatMessage("bot",`${user.username} has left the chat`));
        //send users and room info 
        io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            });
        }    
    })
     //Listen for message form
     socket.on('chatMessage',msg=>{
        const user=getCurrentUser(socket.id);
        if(user){
        io.to(user.room).emit('message',formatMessage( `${user.username}`,msg));
            } 
});
});


app.get('/',(req,res)=>{
    res.render('homepage');
    // res.send("hello");
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/register',(req,res)=>{
    res.render('register');
});
app.get('/user/chat.ejs?:id',(req,res)=>{
    res.render('chat');
})
app.get('/user/:id',(req,res)=>{
    let username=req.params['id'];
    res.render('index',{username:username});
});

const mongoose = require("mongoose");
const formatMessage = require('./utils/messages');

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("connected to mongodb")).catch((err) => console.log(err));

app.use('/api/user', userRoute);



server.listen(6969,()=>{
    console.log("server is running on 6969")
})