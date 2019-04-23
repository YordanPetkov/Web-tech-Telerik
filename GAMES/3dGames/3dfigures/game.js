// Creating variables
var geometry = new THREE.BoxGeometry( 0.9, 0.9, 0.9 );
var material = new THREE.MeshPhongMaterial();

for(let i = -5; i < 5; i++){
	for(let j = -5; j < 5; j++){
		var cube = new THREE.Mesh( geometry, material );
		cube.position.set(i, 0, j);
		scene.add( cube );
	}
	
}

camera.position.set(7, 10, 16);
camera.lookAt(new THREE.Vector3(0,0,0));


var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
light.position.set(8, 8, 12);
light2.position.set(-8, -8, 12);
scene.add( light );
scene.add( light2 );

function update() {
	/* cube.rotation.x += 0.015;
	cube.rotation.y += 0.010;
	cube.rotation.z += 0.005; */
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
