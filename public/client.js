import * as THREE from 'three'
// import { OrbitControls } from './jsm/controls/OrbitControls.js'
// import Stats from './jsm/libs/stats.module.js'
// import { GUI } from './jsm/libs/lil-gui.module.min.js'

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
light.position.set(0,250,0);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x111111);
scene.add(ambientLight);

	//////////////
	// שליטה //
	//////////////

	// move mouse and: left   click to rotate, 
	//                 middle click to zoom, 
	//                 right  click to pan
// const controls = new OrbitControls(camera, renderer.domElement)


	//////////////
	//  הוספת צורות  //
	//////////////
		
	// צורות נקראות "mesh":
	//  a collection of points ("geometry") and
	//  a set of surface parameters ("material")	
const cube_geometry = new THREE.BoxGeometry(100, 100, 100)
const cube_material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true,})
const cube = new THREE.Mesh(cube_geometry, cube_material)
cube.position.set(-100, 50, 0)
scene.add(cube)

// const cylinder_geometry = new THREE.SphereGeometry( 50, 32, 16 );
// const cylinder_material = new THREE.MeshLambertMaterial( {color: 0x8888ff} );
// const cylinder = new THREE.Mesh( cylinder_geometry, cylinder_material );
// cylinder.position.set(100, 25, 0)
// scene.add( cylinder );


// const floorTexture = new THREE.TextureLoader().load( './images/index.jpg' );
// const floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
// const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
// const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.position.y = -0.5;
// floor.rotation.x = Math.PI / 2;
// scene.add(floor);

	//////////////
	//  הוספת צירים  //
	//////////////

// const axesHelper = new THREE.AxesHelper( 100 );
// scene.add( axesHelper );

	//////////////
	// התאמת רספונסיביות //
	//////////////

// window.addEventListener(
//     'resize',
//     () => {
//         camera.aspect = window.innerWidth / window.innerHeight
//         camera.updateProjectionMatrix()
//         renderer.setSize(window.innerWidth, window.innerHeight)
//         render()
//     },
//     false
// )

	//////////////
	//הצגת נתונים (קצב רענון וכ'ו)//
	//////////////
// const stats = Stats()
// document.body.appendChild(stats.domElement)


	//////////////
	// ממשק לשליטה גרפית בצורה//
	//////////////
// const gui = new GUI()
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(cube.scale, 'x', -5, 5)
// cubeFolder.add(cube.scale, 'y', -5, 5)
// cubeFolder.add(cube.scale, 'z', -5, 5)
// cubeFolder.open()
// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'z', 0, 1500)
// cameraFolder.open()

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
    cube.rotation.x += +0.01
    // cylinder.rotation.x += 0.01
    // cylinder.rotation.y += 0.01
    // controls.update()
    render()
    // stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
