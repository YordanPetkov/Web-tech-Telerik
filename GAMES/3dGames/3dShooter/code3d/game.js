// Creating variables

var canvas = document.getElementsByTagName("canvas")[0];
var geometry = new THREE.BoxGeometry( 2, 3, 1.5 );
var material = new THREE.MeshPhongMaterial({color : "red"});
var wall_material = new THREE.MeshPhongMaterial();




var wall_geometry = new THREE.BoxGeometry(10, 8, 1);
var wall1 = new THREE.Mesh(wall_geometry, wall_material);
var wall2 = new THREE.Mesh(wall_geometry, wall_material);
wall1.position.set(0, -1.5, -5);
wall2.position.set(-5, -1.5, 0);
wall2.rotation.y = Math.PI/2;
scene.add(wall1);
scene.add(wall2);

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
var light3 = new THREE.PointLight( );
light.position.set(-100,100,100);
light2.position.set(100, 100, -50);
light3.position.set(0, -100 , 50);
scene.add( light );
scene.add( light2 );
scene.add( light3 );

var alpha = Math.PI/2, beta = 0;
var cx=0 ,cy=0, cz=0, dy=0;


function updateCamera(){
	camera.position.set(cx, cy, cz);
	camera.lookAt(new THREE.Vector3(Math.cos(alpha)*Math.cos(beta) + cx,
		Math.sin(beta) + cy,
	 	Math.sin(alpha)*Math.cos(beta) + cz));
}

updateCamera();

function update() {
	if (isKeyPressed[87]){
		
	}
	updateCamera();
}

function keyup(key) {
	// Show the pressed keycode in the console
	if(key == 32 &&  cy <= 0){
		dy = 0.2;
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
	alpha += (e.movementX * 0.003);
	beta -= (e.movementY*0.003);
	if(beta > Math.PI/2)beta = Math.PI/2;
	if(beta < -Math.PI/2)beta = -Math.PI/2;
}
function mouseup() {
	if(document.pointerLockElement !== canvas){
		canvas.requestPointerLock();
	}
	
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
