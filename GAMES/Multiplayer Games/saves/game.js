// Creating variables
var socket = io();
var savename = "";

var saveList;
if(!localStorage.saveList) saveList = [];
else saveList = JSON.parse(localStorage.saveList);

function goToNewSave(){
    document.getElementById("saves-menu").style.display = "none";
    document.getElementById("savename-menu").style.display = "block";

}

function startGame(){
    savename = document.getElementById("save-name").value;
    document.getElementById("savename-menu").style.display = "none";
    document.getElementById("canvas-id").style.display = "block";
    if(!localStorage.savesList)localStorage.savesList = JSON.stringify([]);
    saveList.push(savename);
    localStorage.saveList = JSON.stringify(saveList);
}

socket.on("number", function(numberOfClients) {
});

function update() {
    
}

function draw() {
    
}

function keyup(key) {
}
function mouseup() {
    
}
