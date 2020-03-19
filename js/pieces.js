function addPieces(scene, chessboard, allObj)
{

// Black and white material
  let whiteMat = new THREE.MeshStandardMaterial({
    color: 0xa5a5a5
  });
  let blackMat = new THREE.MeshStandardMaterial({
    color: 0x2c3a3e
  });

// White and Black pawns
  var allWhitePawns = [];
  var allBlackPawns = [];

  let pawnGeo = new THREE.ConeGeometry(1,3,32);
  let pawnHeadGeo = new THREE.OctahedronGeometry(0.8, 2);
  let whitePawnMesh = new THREE.Mesh(pawnGeo, whiteMat);
  let whitePawnHead = new THREE.Mesh(pawnHeadGeo, whiteMat);

  let blackPawnMesh = new THREE.Mesh(pawnGeo, blackMat);
  let blackPawnHead = new THREE.Mesh(pawnHeadGeo, blackMat);



  for (var i = 0; i < 8; i++) {

    allWhitePawns.push(whitePawnMesh.clone());
    allBlackPawns.push(blackPawnMesh.clone());

    whitePawnHead.position.y = 1.5;
    blackPawnHead.position.y = 1.5;

    allWhitePawns[i].add(whitePawnHead.clone());
    allBlackPawns[i].add(blackPawnHead.clone());

    scene.add(allWhitePawns[i]);
    scene.add(allBlackPawns[i]);

    allWhitePawns[i].position.set(chessboard[2][i+1].position.x, 1.5 ,chessboard[2][i+1].position.z);
    allBlackPawns[i].position.set(chessboard[7][i+1].position.x, 1.5 ,chessboard[7][i+1].position.z);
  }

//All rooks
let allWhiteRooks = [];
let allBlackRooks = [];

let rookGeo = new THREE.BoxGeometry(2,3,2);

let whiteRookMesh = new THREE.Mesh(rookGeo, whiteMat);
let blackRookMesh = new THREE.Mesh(rookGeo, blackMat);
let pos = 1; //Helper varaible for putting out objects

for (var i = 0; i < 2; i++) {

  allWhiteRooks.push(whiteRookMesh.clone());
  allBlackRooks.push(blackRookMesh.clone());

  scene.add(allWhiteRooks[i]);
  scene.add(allBlackRooks[i]);

  allWhiteRooks[i].position.set(chessboard[1][pos].position.x, 1.5 ,chessboard[1][pos].position.z);
  allBlackRooks[i].position.set(chessboard[8][pos].position.x, 1.5 ,chessboard[8][pos].position.z);
  pos = pos + 7;
}



//All knights
let allWhiteKnights = [];
let allBlackKnights = [];

let knightGeo = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 30, 30 );

let whiteKnightMesh = new THREE.Mesh(knightGeo, whiteMat);
let blackKnightMesh = new THREE.Mesh(knightGeo, blackMat);
pos = 2;

for (var i = 0; i < 2; i++) {

  allWhiteKnights.push(whiteKnightMesh.clone());
  allBlackKnights.push(blackKnightMesh.clone());

  scene.add(allWhiteKnights[i]);
  scene.add(allBlackKnights[i]);

  allWhiteKnights[i].position.set(chessboard[1][pos].position.x, 1.5 ,chessboard[1][pos].position.z);
  allWhiteKnights[i].scale.set(0.2,0.4,0.1);
  allWhiteKnights[i].rotation.x = -Math.PI/2;
  allWhiteKnights[i].rotation.z = -Math.PI/4;

  allBlackKnights[i].position.set(chessboard[8][pos].position.x, 1.5 ,chessboard[8][pos].position.z);
  allBlackKnights[i].scale.set(0.2,0.4,0.1);
  allBlackKnights[i].rotation.x = -Math.PI/2;
  allBlackKnights[i].rotation.z = Math.PI/4;

  pos = pos + 5;
}

//All Bishops
let allWhiteBishops = [];
let allBlackBishops = [];

let bishopGeo = new THREE.OctahedronGeometry(1.2);

let whiteBishopMesh = new THREE.Mesh(bishopGeo, whiteMat);
let blackBishopMesh = new THREE.Mesh(bishopGeo, blackMat);
pos = 3; //Helper varaible for putting out objects

for (var i = 0; i < 2; i++) {

  allWhiteBishops.push(whiteBishopMesh.clone());
  allBlackBishops.push(blackBishopMesh.clone());

  scene.add(allWhiteBishops[i]);
  scene.add(allBlackBishops[i]);

  allWhiteBishops[i].position.set(chessboard[1][pos].position.x, 1.5 ,chessboard[1][pos].position.z);
  allBlackBishops[i].position.set(chessboard[8][pos].position.x, 1.5 ,chessboard[8][pos].position.z);
  pos = pos + 3;
}

// Kings
let kingGeo = new THREE.SphereGeometry(1.5);

let whiteKingMesh = new THREE.Mesh(kingGeo, whiteMat);
let blackKingMesh = new THREE.Mesh(kingGeo, blackMat);


scene.add(whiteKingMesh);
scene.add(blackKingMesh);

whiteKingMesh.position.set(chessboard[1][5].position.x, 1.5 ,chessboard[1][5].position.z);
blackKingMesh.position.set(chessboard[8][5].position.x, 1.5 ,chessboard[8][5].position.z);

//Queens
let queenGeo = new THREE.BoxGeometry(1,3,1);
let queenHeadGeo = new THREE.TorusKnotGeometry(0.7, 0.2, 64, 8, 20, 18);;

let whiteQueenMesh = new THREE.Mesh(queenGeo, whiteMat);
let whiteQueenHead = new THREE.Mesh(queenHeadGeo, whiteMat);
let blackQueenMesh = new THREE.Mesh(queenGeo, blackMat);
let blackQueenHead = new THREE.Mesh(queenHeadGeo, blackMat);

whiteQueenHead.position.y = 1.5;
blackQueenHead.position.y = 1.5;

whiteQueenMesh.add(whiteQueenHead);
blackQueenMesh.add(blackQueenHead);

scene.add(whiteQueenMesh);
scene.add(blackQueenMesh);

whiteQueenMesh.position.set(chessboard[1][4].position.x, 1.5 ,chessboard[1][4].position.z);
blackQueenMesh.position.set(chessboard[8][4].position.x, 1.5 ,chessboard[8][4].position.z);


// Add everything to allObj so we vcan move it
  for (var i = 0; i < allWhitePawns.length; i++) {
      if(i < 2){
        allObj.push( allWhiteRooks[i] );
        allObj.push( allBlackRooks[i] );
        allObj.push( allWhiteKnights[i] );
        allObj.push( allBlackKnights[i] );
        allObj.push( allWhiteBishops[i] );
        allObj.push( allBlackBishops[i] );
      }
      allObj.push( allWhitePawns[i] );
      allObj.push( allBlackPawns[i] );
  }
  allObj.push(whiteKingMesh);
  allObj.push(blackKingMesh);

}
