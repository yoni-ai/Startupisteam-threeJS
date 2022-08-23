import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'
import { OBJLoader } from './jsm/loaders/OBJLoader.js'

	///////////
	// סצנה //
	///////////
const scene = new THREE.Scene()

	////////////
	// CAMERA //
	////////////
	
	// המצלמה ממוקמת ב (0,0,0)
	// 	נשנה לה ערכים ל (z = 400) (y = 150)
    // ונפנה אותה למרכז הבמה
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000)
camera.position.set(0,150,400);
camera.lookAt(scene.position);

	//////////////
	// RENDERER - המגיש //
	//////////////
	
	//אתחול המגיש
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

	///////////
	// תאורה //
	///////////
	
	// יצירת תאורה לסצנה
const light = new THREE.PointLight(0xffffff);
light.position.set(0,1250,0);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x111111);
scene.add(ambientLight);

	//////////////
	// שליטה //
	//////////////

	// move mouse and: left   click to rotate, 
	//                 middle click to zoom, 
	//                 right  click to pan
const controls = new OrbitControls(camera, renderer.domElement)

// instantiate a loader
const loader = new OBJLoader();
const loader2 = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'./models/IronMan.obj',
	// called when resource is loaded
	function ( object ) {
		object.position.set(0,250,0);
		scene.add( object );
	},
	// called when loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);


	//////////////
	//  הוספת צורות  //
	//////////////
		
	// צורות נקראות "mesh":
	//  a collection of points ("geometry") and
	//  a set of surface parameters ("material")	
const cube_geometry = new THREE.BoxGeometry(100, 100, 100)
const cube_material = new THREE.MeshBasicMaterial({color: 0x00fff0, wireframe: false,})
const cube = new THREE.Mesh(cube_geometry, cube_material)
cube.position.set(-100, 50, 0)
scene.add(cube)

const cylinder_geometry = new THREE.SphereGeometry( 50, 32, 16 );
const cylinder_material = new THREE.MeshLambertMaterial( {color: 0x8888ff} );
const cylinder = new THREE.Mesh( cylinder_geometry, cylinder_material );
cylinder.position.set(100, 25, 0)
scene.add( cylinder );


const floorTexture = new THREE.TextureLoader().load( './images/index.jpg' );
const floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.5;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

const wallTexture = new THREE.TextureLoader().load( './images/index2.jpg' );
const wallMaterial = new THREE.MeshBasicMaterial( { map: wallTexture, side: THREE.DoubleSide } );
const wallGeometry = new THREE.PlaneGeometry(1000, 500, 1, 1);
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.z = -500;
wall.position.y = 250;
scene.add(wall);

const wall2Texture = new THREE.TextureLoader().load( './images/index3.jpg' );
const wall2Material = new THREE.MeshBasicMaterial( { map: wall2Texture, side: THREE.DoubleSide } );
const wall2Geometry = new THREE.PlaneGeometry(1000, 500, 1, 1);
const wall2 = new THREE.Mesh(wall2Geometry, wall2Material);
wall2.rotation.y = Math.PI /2;
wall2.position.x = 500;
wall2.position.y = 250;
scene.add(wall2);


	//////////////
	//  הוספת צירים  //
	//////////////

const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

	//////////////
	// התאמת רספונסיביות //
	//////////////

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

	//////////////
	//הצגת נתונים (קצב רענון וכ'ו)//
	//////////////
const stats = Stats()
document.body.appendChild(stats.domElement)


	//////////////
	// ממשק לשליטה גרפית בצורה//
	//////////////
const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.scale, 'x', -100, 100)
cubeFolder.add(cube.scale, 'y', -5, 5)
cubeFolder.add(cube.scale, 'z', -5, 5)
cubeFolder.open()

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 1500)
cameraFolder.add(camera.position, 'x', 0, 2500)
cameraFolder.open()

	//////////////
	// הוספת כפתור שמזיז את המצלמה//
	//////////////
// window.addEventListener("click", onClick, false);
// function onClick() {
// var el = document.getElementById("button");
// el.addEventListener("click", go_to_point, false);}

// function go_to_point(){
//     console.log("hey");
//     camera.position.set(0,1500,0);
//  }

	//////////////
	// הפונקציות שמריצות את הכל ומגישות אותו שוב שוב/
	//////////////

function animate() {
    requestAnimationFrame(animate)
	// object.position.x = +0.01
	// object.rotation.z = +0.01
    cube.rotation.x += +0.01
	cube.rotation.y += +0.01
	cube.position.x += +0.1
    // cylinder.rotation.x += 0.01
    // cylinder.rotation.y += 0.01
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
