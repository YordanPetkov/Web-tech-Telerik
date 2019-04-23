// Creating variables
var geometry = new THREE.BoxGeometry( 2, 3, 1.5 );
var material = new THREE.MeshPhongMaterial();
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

camera.position.set(25, 18, 35);
camera.lookAt(new THREE.Vector3(0, 0, 0));

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

function update() {
	/* cube.rotation.x += 0.015;
	cube.rotation.y += 0.010;
	cube.rotation.z += 0.005; */
	
	var delta = 0.01;
	for(let i = 0; i<parts.length; i++){
		if(isKeyPressed[87]){
			parts[i].position.z +=delta;
		}	
		if(isKeyPressed[83]){
			parts[i].position.z -=delta;
		}	
		if(isKeyPressed[65]){
			parts[i].position.x +=delta;
		}	
		if(isKeyPressed[68]){
			parts[i].position.x -=delta;
		}	
	}
	
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Keyup", key);
}

function keydown(key) {
	// Show the pressed keycode in the console
	console.log("Keydown", key);
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
