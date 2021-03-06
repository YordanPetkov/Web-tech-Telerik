// Creating variables

var canvas = document.getElementsByTagName("canvas")[0];
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshPhongMaterial({color : "red"});
var wall_material = new THREE.MeshPhongMaterial();

var nw = 500;
var wall =[];


var wall_geometry = new THREE.BoxGeometry(10, 4, 1);
for(let i =0; i <nw ; i++){
	wall[i] = new THREE.Mesh(wall_geometry, wall_material);
	wall[i].position.set(Math.random()*1000-500, 0, Math.random()*1000-500);
	if(Math.random()>0.5){
		wall[i].rotation.y = Math.PI/2;
	}
	scene.add(wall[i]);
}

var ne = 5;
var enemy = [], er = [];
for(let i=0; i<ne; i++){
	enemy[i] = new THREE.Mesh(geometry,material);
	enemy[i].position.set(Math.random()*1000-500, 0, Math.random()*1000-500);
	scene.add(enemy[i]);
	er[i] = 0;
}

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
var cx=0 ,cy=0, cz=0, dy=0,oldx,oldz;


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

	let collision = false;
	for(let i=0; i<nw; i++){
		if(wall[i].rotation.y > 0){
			if(areColliding(cx-1,cz-1,2,2,wall[i].position.x-0.5,
				wall[i].position.z-5, 1, 10)){
					collision = true;
				}
		}else {
			if(areColliding(cx-1,cz-1,2,2,wall[i].position.x-5,
				wall[i].position.z-0.5, 10, 1)){
					collision = true;
				}
		}
	}

	if(collision){
		cx = oldx;
		cz = oldz;
	}
	

	updateCamera();
	
	for(let i=0 ; i < ne; i++){
		if(Math.random()<0.03){
			er[i] = Math.random()*0.1-0.05;
		}
		enemy[i].rotateY(er[i]);
		enemy[i].position.set(enemy[i].position.x + Math.cos(enemy[i].rotation.y)*velocity,
			    enemy[i].position.y,
				enemy[i].position.z +  Math.sin(enemy[i].rotation.y)*velocity);
	}
}

function keyup(key) {
	// Show the pressed keycode in the console
	if(key == 32 &&  cy <= 0){
		dy = 0.3;
	}
	console.log("Keyup", key);
}

function keydown(key) {
	if(key == 27){
		document.exitPointerLock();
	}
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
