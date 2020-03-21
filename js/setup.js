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
renderer.setClearColor( 0x000000, 1 );
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

//lights and shadows
let ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
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
    var whiteObj = [];
    var blackObj = [];

    addPieces(scene, chessboard, allObj);

    for (var i = 0; i < allObj.length; i++) {
      if(allObj[i].name.substr(0,5) == "White"){
        whiteObj.push(allObj[i]);
      }
      else {
        blackObj.push(allObj[i]);
      }
    }

    //Helper dots for pieces
    let helperDots = [];

    for (var i = 0; i < 45; i++) {

      let helpGeo = new THREE.BoxGeometry(0.5,0.5,0.5);
      let helpMat = new THREE.MeshStandardMaterial({
        color: 0x8b0000
      });
      let help = new THREE.Mesh(helpGeo.clone(), helpMat.clone());

      helperDots.push(help.clone());
      helperDots[i].position.set(100,100,100);
      if(i > 22 && i < 43){
        helperDots[i].scale.set(5,10,5);
        helperDots[i].material.transparent = true;
        helperDots[i].material.opacity = 0.25;
      }else if(i > 42){
        helperDots[i].name = "CastlingHelper" + (i - 42);
        console.log(helperDots[i].name);
        //helperDots[i].material.color = "0xf5bd1f";
      }
      scene.add(helperDots[i]);
    }


    //Controls
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    var whiteDragControls = new DragControls( whiteObj, camera, renderer.domElement);
    var blackDragControls = new DragControls( blackObj, camera, renderer.domElement);
    var dotsDragControls = new DragControls( helperDots, camera, renderer.domElement);
    var whosTurn = true; // White starts

    //Controls the behaviour or pieces. Backbone of everything
    checkBehavior(whiteDragControls, blackDragControls, dotsDragControls, orbitControls, allObj, chessboard, whosTurn, whiteObj, blackObj, scene, helperDots);

    //Board that shows history of moves
      showBoard(whiteObj, blackObj, scene, orbitControls);

    //Camera
    camera.position.y = 30;
    camera.position.z = 30;

    let animate = function() {
      requestAnimationFrame(animate);
      orbitControls.update();
      //console.log(whosTurn);

      //if(!whosTurn && camera.rotate.y < MATH.PI)
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
