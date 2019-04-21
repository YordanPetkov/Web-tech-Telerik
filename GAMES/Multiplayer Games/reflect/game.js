function orient(x1, y1, x2, y2, x3, y3){
    return x2*y3 + x1*y2 + y1*x3 - y1*x2 - y2*x3 - y3*x1;
}


function areIntersecting(x1, y1, x2, y2, x3, y3, x4, y4){
    let o1 = orient(x1, y1, x3, y3, x4, y4);
    let o2 = orient(x2, y2, x3, y3, x4, y4);
    let o3 = orient(x3, y3, x1, y1, x2, y2);
    let o4 = orient(x4, y4, x1, y1, x2, y2);
    if (o1==0 || o2==0 || o3==0 || o4==0){return 0;}
    return ((o1>0)^(o2>0)) && ((o3>0)^(o4>0));
}

// Creating variables
//var socket = io();
var myX = 400, myY = 300, angle = 0, speed = 0;
var bx = 100, by = 100, ex= 600, ey=300;

function update() {
    let dX = Math.cos(angle)*speed;
    let dY = Math.sin(angle)*speed;

    if(areIntersecting(myX,myY,myX+dX,myY+dY,bx,by,ex,ey)){
        angle = -angle + 2*Math.atan2(ey-by, ex-bx);
    }
    else{
        myX += dX;
        myY += dY;
    }
   
}

function draw() {
    context.fillRect(myX, myY, 10, 10);

    context.beginPath();
    context.moveTo(bx, by);
    context.lineTo(ex, ey);
    context.stroke();
}

function keyup(key) {

}

function mouseup() {
    angle = Math.atan2(mouseY - myY, mouseX - myX);
    speed = 5;

    console.log("Mouse clicked at",mouseX,mouseY);
}
