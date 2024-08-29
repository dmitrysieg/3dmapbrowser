import * as THREE from 'three';

function createMesh() {
	
	let N = 10;
	let D = 1.0;
	
	const group = new THREE.Group();
	const geometry = new THREE.BufferGeometry();
	
	let h = []
	
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			h.push(i);
			h.push(Math.random() * D);
			h.push(j);
		}
	}
	
	let vertices = new Float32Array(h);
	
	let indices = [];
	
	for (let i = 0; i < N - 1; i++) {
		for (let j = 0; j < N - 1; j++) {
			indices.push( i      * N + j);
			indices.push((i + 1) * N + j + 1);
			indices.push( i      * N + j + 1);
			
			indices.push( i      * N + j);
			indices.push((i + 1) * N + j    );
			indices.push((i + 1) * N + j + 1);
		}
	}
		
	geometry.setIndex( indices );
	geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.center();

	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	const object = new THREE.Mesh( geometry, material );

	group.add(object);	

	return object;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let mesh = createMesh();
scene.add(mesh);

let camStart = new THREE.Vector3(0, 10, 0);
let angle = 0;

function animate() {

	camStart.setFromCylindricalCoords(15, angle, 10);
	angle += 0.01;

	camera.position.copy(camStart);
	camera.lookAt(0, 0, 0);
	camera.updateProjectionMatrix();
	
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );