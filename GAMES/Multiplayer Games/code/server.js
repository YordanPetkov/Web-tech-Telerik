var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

//creating variables
var numberOfClients = 0;

io.on('connection', function(socket){
    ++numberOfClients;
    console.log(`Number Of clients : ${numberOfClients}`);
    io.emit("number", numberOfClients);

    socket.on("space", function() {
        console.log("Nqkoi natisna space!");
    });
});

http.listen(3000, function(){
    console.log("server started");
});