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
class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
};

var grid = [],
    rows = 10,
    cols = 40;

for(let i = 0; i < rows; i++){
    grid[i] = [];
    for(let j = 0; j < cols; j++){
        grid[i][j] = 1;
    }
}

var players = [];
var isCon = [];
var plNum = 0;

io.on('connection', function(socket){
    let cid = plNum++;
    players[cid] = new Player(Math.random() * 600, 30);
    isCon[cid] = 1;
    socket.emit("id", cid, grid, players);
    io.emit("isCon", isCon);
    socket.broadcast.emit("moved", cid, players[cid]);

    socket.on("break", function(i, j){
        socket.broadcast.emit("break", i , j);
        grid[i][j] = 0;
    });

    socket.on("moved", function(id, player) {
        io.emit("moved", id, player);
        players[id] = player;
    });

    socket.on('disconnect', function() {
        isCon[cid] = 0;
        io.emit("isCon", isCon);
    });
});

http.listen(3000, function(){
    console.log("server started");
});