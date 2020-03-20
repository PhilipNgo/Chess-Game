var index = [0]; // Used in isTaken function

function checkBehavior(whiteDragControls, blackDragControls, orbitControls, allObj, chessboard, whosTurn, whiteObj, blackObj, scene){

//=============Helper dots===============

let helperDots = [];

for (var i = 0; i < 40; i++) {

  let helpGeo = new THREE.BoxGeometry(0.5,0.5,0.5);
  let helpMat = new THREE.MeshStandardMaterial({
    color: 0x8b0000
  });
  let help = new THREE.Mesh(helpGeo.clone(), helpMat.clone());


  helperDots.push(help.clone());
  helperDots[i].position.set(100,100,100);
  if(i > 22){
    helperDots[i].scale.set(5,10,5);
    helperDots[i].material.transparent = true;
    helperDots[i].material.opacity = 0.4;
  }
  scene.add(helperDots[i]);
}

//==========================Orbit======================
        orbitControls.enableDamping = true;
        orbitControls.minPolarAngle = 0.8;
        orbitControls.maxPolarAngle = 2.4;
        orbitControls.maxAzimuthAngle = Math.PI;
        orbitControls.minAzimuthAngle = 0;
        orbitControls.dampingFactor = 0.07;
        orbitControls.rotateSpeed = 0.87;
        orbitControls.autoRotate = true;

// ====================Drag===============================================
        blackDragControls.deactivate();
        let currentWhite = new THREE.Vector3();
        let currentBlack = new THREE.Vector3();

        //=============White drag controls============================
        whiteDragControls.addEventListener( 'hoveron', function (event){
          event.object.material.emissive.set( 0x00008b );
        } );
        whiteDragControls.addEventListener( 'hoveroff', function (event){
          event.object.material.emissive.set( 0x000000 );
        } );
        whiteDragControls.addEventListener( 'dragstart', function ( event ) {
          orbitControls.enabled = false;
          currentWhite.set(startxPos(event.object), 1.5, startzPos(event.object));
          moveHelp(event.object, chessboard, currentWhite, helperDots, whiteObj, blackObj);


        } );

        whiteDragControls.addEventListener ( 'drag', function( event ){
        event.object.position.y = 1.5; // Cant drag upwards.

        boundary(event.object, chessboard);

        });


        //After a move, its blacks turn
        whiteDragControls.addEventListener( 'dragend', function (event){

          orbitControls.enabled = true;

          if(correctPosition(event.object, chessboard, currentWhite, i)){
            blackDragControls.activate();
            whiteDragControls.deactivate();
            whosTurn ^= true;
            isTaken(event.object, whiteObj, blackObj, whosTurn);
            moveDots(helperDots);
            orbitControls.autoRotateSpeed = -20;
          }

        } );


      //=============Black drag controls================================
        blackDragControls.addEventListener( 'hoveron', function (event){
          event.object.material.emissive.set( 0x006400 );
        } );
        blackDragControls.addEventListener( 'hoveroff', function (event){
          event.object.material.emissive.set( 0x000000 );
        } );
        blackDragControls.addEventListener( 'dragstart', function ( event ) {
          orbitControls.enabled = false;
          currentBlack.set(startxPos(event.object), 1.5, startzPos(event.object));
          moveHelp(event.object, chessboard, currentBlack, helperDots, whiteObj, blackObj);
        } );
        //Cant drag outside board
        blackDragControls.addEventListener ( 'drag', function( event ){
        event.object.position.y = 1.5; // Cant drag upwards.
        boundary(event.object, chessboard);

        });
        //After blacks turn, its whites turn
        blackDragControls.addEventListener( 'dragend', function (event){

          orbitControls.enabled = true;

          if(correctPosition(event.object, chessboard, currentBlack)){
            blackDragControls.deactivate();
            whiteDragControls.activate();
            whosTurn ^= true;
            isTaken(event.object, whiteObj, blackObj, whosTurn);
            moveDots(helperDots);
            orbitControls.autoRotateSpeed = 20;
          }
        } );


}

function correctPosition(piece, chessboard, current){

    let currentxPos = current.x;
    let currentzPos = current.z;
    let pos = getPosOnBoard(piece, chessboard);

    //Put piece in center of closest square
    piece.position.set(chessboard[pos.x][pos.y].position.x, 1.5, chessboard[pos.x][pos.y].position.z);

    //Check if piece moved
    if(Math.abs(piece.position.x - currentxPos) >= 2.5 || Math.abs(piece.position.z - currentzPos) >= 2.5 ){
        return true;
    }else{
        return false;
    }

}

function startxPos(piece){
    return piece.position.x;
}


function startzPos(piece){
    return piece.position.z;
}

function isTaken(piece, whiteObj, blackObj, whosTurn){

    if(!whosTurn){

        if(samePlace(piece,blackObj,index))
        {
            blackObj[index].position.set(20-2.5*index, 1.5, 19);
        }
      }else{
        if(samePlace(piece,whiteObj, index))
        {
            whiteObj[index].position.set(20-2.5*index, 1.5, -25);
        }

    }
}

function boundary(piece, chessboard){
  //Cant drag outside board
  if(piece.position.x < chessboard[1][1].position.x){
      piece.position.x = chessboard[1][1].position.x;
  }
  if (piece.position.x > chessboard[8][8].position.x){
    piece.position.x = chessboard[8][8].position.x;
  }
  if (piece.position.z > chessboard[1][1].position.z) {
      piece.position.z = chessboard[1][1].position.z;
  }
  if(piece.position.z < chessboard[8][8].position.z){
      piece.position.z = chessboard[8][8].position.z;
  }
}

function moveDots(helperDots){
  for (var i = 0; i < helperDots.length; i++) {
    helperDots[i].position.set(100,100,100);
  }
}

function moveHelp(piece, chessboard, current, helperDots, whiteObj, blackObj){

  let temp = getPosOnBoard(piece, chessboard);

  let killzonePawn = [];
  killzonePawn.push(new THREE.Vector3( chessboard[temp.x+1][temp.y-1].position.x ,1.5, chessboard[temp.x+1][temp.y-1].position.z));
  killzonePawn.push(new THREE.Vector3( chessboard[temp.x+1][temp.y+1].position.x ,1.5, chessboard[temp.x+1][temp.y+1].position.z));

  if(piece.name == "White Pawn"){

      if(current.z == chessboard[2][1].position.z){
          moveDots(helperDots);
          helperDots[0].position.set(current.x, 1.5, chessboard[3][1].position.z);
          helperDots[1].position.set(current.x, 1.5, chessboard[4][1].position.z);
      }else{
          moveDots(helperDots);
          helperDots[0].position.set(current.x, 1.5, chessboard[temp.x + 1][1].position.z);
      }
      for (var i = 0; i < killzonePawn.length; i++) {
        if(isOccupiedOnBoard(killzonePawn[i], blackObj)){

            helperDots[25+i].position.set(killzonePawn[i].x, killzonePawn[i].y, killzonePawn[i].z);

        }
      }
  }
  if(piece.name == "Black Pawn"){
      if(current.z == chessboard[7][1].position.z)
      {
          helperDots[0].position.set(current.x, 1.5, chessboard[6][1].position.z);
          helperDots[1].position.set(current.x, 1.5, chessboard[5][1].position.z);
      }else {
        moveDots(helperDots);
        helperDots[0].position.set(current.x, 1.5, chessboard[temp.x - 1][1].position.z);
      }
  }
}


//Returns r,c of piece on chessboard
function getPosOnBoard(piece, chessboard){

  let minx = 10;
  let minz = 10;
  let r;
  let c;

  for (var row = 1; row < chessboard.length; row++) {
    for (var col = 1; col < chessboard.length; col++) {
      if(Math.abs(piece.position.x - chessboard[row][col].position.x) < minx){
        minx = Math.abs(piece.position.x - chessboard[row][col].position.x)
        c = col;
      }
      if(Math.abs(piece.position.z - chessboard[row][col].position.z) < minz){
        minz = Math.abs(piece.position.z - chessboard[row][col].position.z)
        r = row;
      }
    }
  }

  return new THREE.Vector2(r,c);
}

function isOccupiedOnBoard(pos, obj){
    for (var i = 0; i < obj.length; i++) {

      // console.log("X VALUES",pos.x, obj[i].position.x);
      // console.log("Z VALUES",pos.z, obj[i].position.z);

        if(pos.x == obj[i].position.x && pos.z == obj[i].position.z){
          return true;
        }
    }
    return false;
}

//Return true or false if position is occupied
function samePlace(piece, obj, index){
  for (var i = 0; i < obj.length; i++) {
    if((piece.position.x == obj[i].position.x) && (piece.position.z == obj[i].position.z)){
      index[0] = i;
      return true;
    }
  }
  return false;
}
