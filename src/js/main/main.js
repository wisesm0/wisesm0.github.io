import * as THREE from 'three';

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var renderer; 
var camera;
var textObject, textObject1;  

// SPINNING BOX
function spinningBox() {
    var scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 10000);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild(renderer.domElement);
	var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	camera.position.z = 1000;   
	function render() {
		requestAnimationFrame(render);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		renderer.render(scene, camera);
	};
	render();
}

// MOVING MOUNTAINS
function movingMountains() {

    var scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
	var heights = [1397, 1455, 1493, 1525, 1495, 1464, 1464, 1465, 1471, 1482, 1514, 1535, 1521, 1488, 1401, 1300, 1223, 1191, 1262, 1414];

	var obj = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5, 1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xFFFFFF } ));
	obj.position.set( 0, 5, -50);


	// FONTS
	var loader = new THREE.FontLoader();
	loader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
		var textGeometry = new THREE.TextGeometry( 'Hi I\'m Scott', {
			font: font,
		    size: .05,
		    height: .2,
		    curveSegments: 12,
		    bevelThickness: 1,
		    bevelSize: 1,
		    bevelEnabled: true
		});
		var textMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
		textObject = new THREE.Mesh(textGeometry, textMaterial);
		// console.log(textObject); 
		// scene.add(textObject);
		camera.add(textObject); 
		// textObject.position.set(-100, 0, 0);
	});

	// RENDERER
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild(renderer.domElement);

	// TERRAIN MESH
	var geometryTerrain = new THREE.PlaneGeometry( 6000, 6000, 256, 256 );
	// var geometryTerrain = new THREE.PlaneBufferGeometry( 6000, 6000, 256, 256 );
	// THREE.BufferGeometryUtils.computeTangents( geometryTerrain );

	for (var i = 0, l = geometryTerrain.vertices.length; i < l; i++) {
	  geometryTerrain.vertices[i].z = Math.random() * (30 - (0)) + (0);
	}

	var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
	var terrain = new THREE.Mesh(geometryTerrain, material);
	terrain.position.set( 0, -125, 0 );
	terrain.rotation.x = -Math.PI / 2;
	scene.add(terrain);
	scene.add( camera );

	function render() {
		requestAnimationFrame(render);
		camera.position.z -= 3;   
		renderer.render(scene, camera);
		// console.log(camera.position.z); 
		if (camera.position.z < -2600 && camera.position.z > -2603) {
			camera.remove(textObject); 
			var loader = new THREE.FontLoader();
			loader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
				var textGeometry = new THREE.TextGeometry( 'End', {
					font: font,
				    size: .05,
				    height: .2,
				    curveSegments: 12,
				    bevelThickness: 1,
				    bevelSize: 1,
				    bevelEnabled: true
				});
				var textMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
				textObject = new THREE.Mesh(textGeometry, textMaterial);
				camera.add(textObject); 
			});
		}

	};

	onWindowResize();
	window.addEventListener( 'resize', onWindowResize, false );
	render();
}


// UTILS
function onWindowResize( event ) {
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
}

function onKeyDown ( event ) {
	switch( event.keyCode ) {
		case 78: /*N*/  lightDir *= -1; break;
		case 77: /*M*/  animDeltaDir *= -1; break;
	}
}

// EXPORT FUNCTIONS
export {spinningBox, movingMountains}; 