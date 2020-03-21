function addPieces(scene, chessboard, allObj)
{

// Black and white material
  let whiteMat = new THREE.MeshStandardMaterial({
    color: 0xa5a5a5
  });
  let yo = new THREE.MeshStandardMaterial({
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
  pawnHeadGeo.translate(0, 1.5, 0);
  pawnGeo.merge(pawnHeadGeo);

  for (var i = 0; i < 8; i++) {

    let whitePawnMesh = new THREE.Mesh(pawnGeo.clone(), whiteMat.clone());
    let whitePawnHead = new THREE.Mesh(pawnHeadGeo.clone(), whitePawnMesh.material);

    let blackPawnMesh = new THREE.Mesh(pawnGeo.clone(), blackMat.clone());
    let blackPawnHead = new THREE.Mesh(pawnHeadGeo.clone(), blackPawnMesh.material);

    whitePawnMesh.name = "White Pawn";
    blackPawnMesh.name = "Black Pawn";

    allWhitePawns.push(whitePawnMesh.clone());
    allBlackPawns.push(blackPawnMesh.clone());

    scene.add(allWhitePawns[i]);
    scene.add(allBlackPawns[i]);

    allWhitePawns[i].position.set(chessboard[2][i+1].position.x, 1.5 ,chessboard[2][i+1].position.z);
    allBlackPawns[i].position.set(chessboard[7][i+1].position.x, 1.5 ,chessboard[7][i+1].position.z);
  }

//All rooks
let allWhiteRooks = [];
let allBlackRooks = [];

let rookGeo = new THREE.BoxGeometry(2,3,2);

let pos = 1; //Helper varaible for putting out objects

for (var i = 0; i < 2; i++) {

  let whiteRookMesh = new THREE.Mesh(rookGeo, whiteMat.clone());
  let blackRookMesh = new THREE.Mesh(rookGeo, blackMat.clone());

  whiteRookMesh.name = "White Rook";
  blackRookMesh.name = "Black Rook";

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

pos = 2;

for (var i = 0; i < 2; i++) {

  let whiteKnightMesh = new THREE.Mesh(knightGeo, whiteMat.clone());
  let blackKnightMesh = new THREE.Mesh(knightGeo, blackMat.clone());

  whiteKnightMesh.name = "White Knight";
  blackKnightMesh.name = "Black Knight";

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

pos = 3; //Helper varaible for putting out objects

for (var i = 0; i < 2; i++) {

  let whiteBishopMesh = new THREE.Mesh(bishopGeo, whiteMat.clone());
  let blackBishopMesh = new THREE.Mesh(bishopGeo, blackMat.clone());

  whiteBishopMesh.name = "White Bishop";
  blackBishopMesh.name = "Black Bishop";

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

let whiteKingMesh = new THREE.Mesh(kingGeo, whiteMat.clone());
let blackKingMesh = new THREE.Mesh(kingGeo, blackMat.clone());

whiteKingMesh.name = "White King";
blackKingMesh.name = "Black King";

scene.add(whiteKingMesh);
scene.add(blackKingMesh);

whiteKingMesh.position.set(chessboard[1][5].position.x, 1.5 ,chessboard[1][5].position.z);
blackKingMesh.position.set(chessboard[8][5].position.x, 1.5 ,chessboard[8][5].position.z);

//Queens
let queenGeo = new THREE.BoxGeometry(1,3,1);
let queenHeadGeo = new THREE.TorusKnotGeometry(0.7, 0.2, 64, 8, 20, 18);
queenHeadGeo.translate(0, 1.5, 0);
queenGeo.merge(queenHeadGeo);


let whiteQueenMesh = new THREE.Mesh(queenGeo, whiteMat.clone());
let whiteQueenHead = new THREE.Mesh(queenHeadGeo, whiteQueenMesh.material);
let blackQueenMesh = new THREE.Mesh(queenGeo, blackMat.clone());
let blackQueenHead = new THREE.Mesh(queenHeadGeo, blackQueenMesh.material);

whiteQueenMesh.name = "White Queen";
blackQueenMesh.name = "Black Queen";

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
  allObj.push(whiteQueenMesh);
  allObj.push(blackQueenMesh);

  for (var i = 0; i < allObj.length; i++) {
    allObj[i].castShadow = true; //default is false
    allObj[i].receiveShadow = true; //default
  }

}
