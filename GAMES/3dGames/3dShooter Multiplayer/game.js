// Creating variables

var socket = io();

var canvas = document.getElementsByTagName("canvas")[0];
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshPhongMaterial({color : "red"});

class Player {
	constructor(x, y, z, alpha, beta){
		this.m = new THREE.Mesh(geometry,material);
		this.move(x, y, z, alpha, beta);
		scene.add(this.m);
	}
	move(x, y, z, alpha, beta){
		this.m.position.set(x, y, z);
		this.m.rotation.x = alpha;
		this.m.rotation.y = beta;
	}
}

var floorg = new THREE.BoxGeometry(1000, 1 , 1000);
var floorm = new THREE.MeshBasicMaterial({color: "green"});
var floor = new THREE.Mesh(floorg, floorm);
floor.position.set(0, -5, 0);
scene.add(floor);

var p = [];


var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
var light3 = new THREE.PointLight( );
light.position.set(-1000,1000,1000);
light2.position.set(1000, 1000, -500);
light3.position.set(0, -1000 , 500);
scene.add( light );
scene.add( light2 );
scene.add( light3 );

var velocity = 0.1;
var alpha = Math.PI/2, beta = 0;
var cx=1 ,cy=0, cz=1, dy=0,oldx,oldz;


function updateCamera(){
	camera.position.set(cx, cy, cz);
	camera.lookAt(new THREE.Vector3(Math.cos(alpha)*Math.cos(beta) + cx,
		Math.sin(beta) + cy,
	 	Math.sin(alpha)*Math.cos(beta) + cz));
}

updateCamera();

function update() {
	dy-= 0.01;

	oldx = cx;
	oldz = cz;

	cy+=dy;
	if(cy<0)cy = 0;
	if (isKeyPressed[87]){
		cx += Math.cos(alpha)*velocity;
		cz += Math.sin(alpha)*velocity;
	}
	if (isKeyPressed[83]){
		cx += Math.cos(alpha+Math.PI)*velocity;
		cz += Math.sin(alpha+Math.PI)*velocity;
	}
	if (isKeyPressed[65]){
		cx += Math.cos(alpha-Math.PI/2)*velocity;
		cz += Math.sin(alpha-Math.PI/2)*velocity;
	}
	if (isKeyPressed[68]){
		cx += Math.cos(alpha+Math.PI/2)*velocity;
		cz += Math.sin(alpha+Math.PI/2)*velocity;
	}
	updateCamera();

}

function keyup(key) {
	// Show the pressed keycode in the console
	if(key == 27){
		document.exitPointerLock();
	}
	if(key == 32 &&  cy <= 0){
		dy = 0.3;
	}
	console.log("Keyup", key);
}

function keydown(key) {
	
	// Show the pressed keycode in the console
	console.log("Keydown", key);
}

function mouseMove(e){
	alpha += (e.movementX * 0.001);
	beta -= (e.movementY*0.001);
	if(beta > Math.PI/2-0.001)beta = Math.PI/2-0.001;
	if(beta < -Math.PI/2+0.001)beta = -Math.PI/2+0.001;
}
function mouseup() {
	if(document.pointerLockElement !== canvas){
		canvas.requestPointerLock();
	}
	
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
