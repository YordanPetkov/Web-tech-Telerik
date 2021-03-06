// Creating variables

var socket = io();

var canvas = document.getElementsByTagName("canvas")[0];
var geometry = new THREE.BoxGeometry( 2, 3, 1.5 );
var head_geometry = new THREE.BoxGeometry( 1, 1, 1);
var arm_geometry = new THREE.BoxGeometry(0.5, 3.5, 0.75);
var leg_geometry = new THREE.BoxGeometry(0.8, 4, 1);
var material = new THREE.MeshPhongMaterial({color : "red"});
var velocity = 0.3;
var alpha = Math.PI/2, beta = 0;
var cx=1 ,cy=0, cz=1, dy=0,oldx,oldy,oldz,oldalpha,oldbeta;

class Player {
	constructor(x, y, z, alpha, beta){
		this.b = new THREE.Mesh(geometry,material);
		this.h = new THREE.Mesh(head_geometry, material);
		this.la = new THREE.Mesh(arm_geometry, material);
		this.ra = new THREE.Mesh(arm_geometry, material);
		this.ll = new THREE.Mesh(leg_geometry, material);
		this.rl = new THREE.Mesh(leg_geometry, material);
		this.move(x, y, z, alpha, beta);
		scene.add(this.b);
		scene.add(this.h);
		scene.add(this.la);
		scene.add(this.ra);
		scene.add(this.ll);
		scene.add(this.rl);
	}
	move(x, y, z, alpha, beta){
		alpha = Math.PI/2 - alpha;
		this.b.position.set(x, y, z);
		this.h.position.set(x, y+2, z);
		this.la.position.set(x + Math.cos(-alpha) * 1.25,y-0.5,z + Math.sin(-alpha) * 1.25);
		this.ra.position.set(x + Math.cos(Math.PI-alpha) * 1.25,y-0.5,z + Math.sin(Math.PI-alpha) * 1.25);
		this.ll.position.set(x + Math.cos(-alpha) * 0.5,y-3.5,z + Math.sin(-alpha) * 0.5);
		this.rl.position.set(x + Math.cos(Math.PI-alpha) * 0.5,y-3.5,z + Math.sin(Math.PI-alpha) * 0.5);
	

		this.b.rotation.y = alpha;
		this.h.rotation.y = alpha;
		this.la.rotation.y = alpha;
		this.ra.rotation.y = alpha;
		this.ll.rotation.y = alpha;
		this.rl.rotation.y = alpha;
		//this.m.rotation.y = beta;
	}
}

var floorg = new THREE.BoxGeometry(1000, 1 , 1000);
var floorm = new THREE.MeshBasicMaterial({color: "green"});
var floor = new THREE.Mesh(floorg, floorm);
floor.position.set(0, -5, 0);
scene.add(floor);

var p = [];
var id = -1;

socket.on("init", (cid, pl) => {
	id = cid;
	for(let i = 0; i<pl.length; i++){
		if(i == id){
			cx = pl[i].x;
			cy = pl[i].y;
			cz = pl[i].z;
			alpha = pl[i].alpha;
			beta = pl[i].beta;
		}else {
			p[i] = new Player(pl[i].x, pl[i].y, pl[i].z,
				pl[i].alpha, pl[i].beta);
		}
		
	}
});

socket.on("newpl", (pid, pl) => {
	p[pid] = new Player(pl.x, pl.y, pl.z,
		pl.alpha, pl.beta);
});

socket.on("mv", (pid, pl) => {
	p[pid].move(pl.x,pl.y,pl.z,pl.alpha,pl.beta);
});

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
var light3 = new THREE.PointLight( );
light.position.set(-1000,1000,1000);
light2.position.set(1000, 1000, -500);
light3.position.set(0, -1000 , 500);
scene.add( light );
scene.add( light2 );
scene.add( light3 );




function updateCamera(){
	camera.position.set(cx, cy, cz);
	camera.lookAt(new THREE.Vector3(Math.cos(alpha)*Math.cos(beta) + cx,
		Math.sin(beta) + cy,
	 	Math.sin(alpha)*Math.cos(beta) + cz));
}

updateCamera();

function update() {
	if(id == -1)return;
	dy-= 0.01;

	oldx = cx;
	oldy = cy;
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
	if(oldx != cx || oldy != cy || oldz != cz || oldalpha != alpha || oldbeta != beta){
		socket.emit("mv", cx, cy, cz, alpha, beta);
	}

	oldalpha = alpha;
	oldbeta = beta;
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
