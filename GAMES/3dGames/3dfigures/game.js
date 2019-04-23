// Creating variables
var geometry = new THREE.BoxGeometry( 0.9, 0.9, 0.9 );
var material = new THREE.MeshPhongMaterial();
var cube = [];
for(let i = 0; i < 10; i++){
	cube[i] = [];
	for(let j = 0; j < 10; j++){
		cube[i][j] = new THREE.Mesh( geometry, material );
		cube[i][j].position.set(i-5, 0, j-5);
		scene.add( cube[i][j] );
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
	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if(Math.random() < 0.5){
				cube[i][j].position.y += 0.01;
			}else {
				cube[i][j].position.y -= 0.01;
			}
		}
		
	}
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
