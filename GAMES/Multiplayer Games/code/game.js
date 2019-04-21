// Creating variables
var socket = io();

socket.on("number", function(numberOfClients) {
    console.log(numberOfClients);
});

function update() {
    
}

function draw() {
    
}

function keyup(key) {
	if(key == 32){
        socket.emit("space");
    }
}
function mouseup() {
    
}
