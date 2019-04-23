// Creating variables

var canvas = document.getElementsByTagName("canvas")[0];
var geometry = new THREE.BoxGeometry( 2, 3, 1.5 );
var material = new THREE.MeshPhongMaterial({color : "red"});
var wall_material = new THREE.MeshPhongMaterial();
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var head_geometry = new THREE.BoxGeometry( 1, 1, 1);
var head = new THREE.Mesh( head_geometry, material );
head.position.set( 0, 2, 0);
scene.add( head );

var arm_geometry = new THREE.BoxGeometry(0.5, 3.5, 0.75);
var left_arm = new THREE.Mesh( arm_geometry, material);
var right_arm = new THREE.Mesh( arm_geometry, material);
left_arm.position.set( 1.25, -0.5, 0);
right_arm.position.set( -1.25, -0.5, 0);
scene.add(left_arm);
scene.add(right_arm);

var leg_geometry = new THREE.BoxGeometry(0.8, 4, 1);
var left_leg = new THREE.Mesh( leg_geometry, material);
var right_leg = new THREE.Mesh( leg_geometry, material);
left_leg.position.set( 0.5, -3.5, 0);
right_leg.position.set( -0.5, -3.5, 0);
scene.add(left_leg);
scene.add(right_leg);

camera.position.set(10, 10, 16);
camera.lookAt(new THREE.Vector3(0, 0, 0));

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

var parts = [cube, head, left_arm, right_arm, left_leg, right_leg];
var alpha = Math.PI/2;
var cx=0 ,cy=0, cz=0, dy=0;

function update() {
	/* cube.rotation.x += 0.015;
	cube.rotation.y += 0.010;
	cube.rotation.z += 0.005; */
	cy += dy;
	if(cy < 0){
		cy = 0;
		dy = 0;
	}
	dy -= 0.01;
	var delta = 0.01;
	var deltaAlpha = 0.01;
	if(isKeyPressed[87]){
		cz+=delta*5*Math.sin(-alpha + Math.PI/2);
		cx+=delta*5*Math.cos(-alpha + Math.PI/2);
	}	
	if(isKeyPressed[83]){
		cz+=delta*5*Math.sin(-alpha - Math.PI/2);
		cx+=delta*5*Math.cos(-alpha - Math.PI/2);
	}	
	/* if(isKeyPressed[65]){
		alpha += delta;
	}	
	if(isKeyPressed[68]){
		alpha -= delta;
	}	 */

	for(let i = 0; i<parts.length; i++){
		parts[i].rotation.y = alpha;
	}

	cube.position.set(cx,cy,cz);
	head.position.set(cx,cy+2,cz)

	left_arm.position.set(cx + Math.cos(-alpha) * 1.25,cy-0.5,cz + Math.sin(-alpha) * 1.25);
	right_arm.position.set(cx + Math.cos(Math.PI-alpha) * 1.25,cy-0.5,cz + Math.sin(Math.PI-alpha) * 1.25);
	
	left_leg.position.set(cx + Math.cos(-alpha) * 0.5,cy-3.5,cz + Math.sin(-alpha) * 0.5);
	right_leg.position.set(cx + Math.cos(Math.PI-alpha) * 0.5,cy-3.5,cz + Math.sin(Math.PI-alpha) * 0.5);
	
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
	alpha += -(e.movementX * 0.008);
}
function mouseup() {
	if(document.pointerLockElement !== canvas){
		canvas.requestPointerLock();
	}
	
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
