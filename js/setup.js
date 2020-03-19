import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/DragControls.js";

let SCREEN_WIDTH = window.innerWidth - 100;
let SCREEN_HEIGHT = window.innerHeight - 100;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

//Setup renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

//lights and shadows
let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
let pointLight = new THREE.PointLight(0xffffff, 1, 50);
pointLight.position.set(0, 10, 0);
pointLight.castShadow = true;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 100;
scene.add(pointLight);

console.log(scene);

    //Add the chessboard
    var chessboard = [];
    addChessboard(scene, chessboard);

    //Add pieces
    var allObj = [];

    addPieces(scene, chessboard, allObj);






    //Controls
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    var dragControls = new DragControls( allObj, camera, renderer.domElement);
		dragControls.addEventListener( 'dragstart', function ( event ) {
      orbitControls.enabled = false;
    } );
    dragControls.addEventListener ( 'drag', function( event ){
     console.log('drag');
     event.object.position.y = 1.5; // Cant drag upwards.
    });
		dragControls.addEventListener( 'dragend', function () { orbitControls.enabled = true; } );

    //Camera
    camera.position.y = 40;
    camera.position.z = 0;
    //controls.update();

    let animate = function() {
      requestAnimationFrame(animate);
      orbitControls.update();

      renderer.render(scene, camera);
    };

animate();

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
