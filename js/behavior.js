var index = [0]; // Used in isTaken function
var whiteCastleCheck = [false, false, false];  //WhiteKing, WhiteRook1, WhiteRook2
var blackCastleCheck = [false, false, false];  //Black King, BlackRook1, BlackRook2
function checkBehavior(whiteDragControls, blackDragControls, dotsDragControls, orbitControls, allObj, chessboard, whosTurn, whiteObj, blackObj, scene, helperDots){
var castling = false;


//==========================Orbit======================
        orbitControls.enableDamping = true;
        orbitControls.minPolarAngle = 0;
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
        let currentObj = new THREE.Mesh();

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
          moveHelp(event.object, chessboard, currentWhite, helperDots, whiteObj, blackObj, allObj);
          currentObj = event.object;
        } );
        whiteDragControls.addEventListener( 'drag', function ( event ) {
          event.object.position.y = 1.5;
          boundary(event.object, chessboard);
        } );
        whiteDragControls.addEventListener( 'dragend', function ( event ) {
          orbitControls.enabled = true;
          event.object.position.set(currentWhite.x, 1.5, currentWhite.z);
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
          moveHelp(event.object, chessboard, currentBlack, helperDots, whiteObj, blackObj, allObj);
          currentObj = event.object;

        } );
        //Cant drag outside board
        blackDragControls.addEventListener( 'drag', function ( event ) {
          event.object.position.y = 1.5;
          boundary(event.object, chessboard);

        } );
        blackDragControls.addEventListener( 'dragend', function ( event ) {
          orbitControls.enabled = true;
          event.object.position.set(currentBlack.x, 1.5, currentBlack.z);
        } );


    //======================Helper dots Drag controls=================================
    dotsDragControls.addEventListener( 'dragstart', function ( event ) {
      orbitControls.enabled = true;

      currentObj.position.set(event.object.position.x, event.object.position.y, event.object.position.z);

      //Castling
      if(event.object.name.substring(0,14) == "CastlingHelper"){
          moveRookCastling(event.object, allObj, whosTurn, parseInt(event.object.name.substring(14,15)));
      }

      if(currentObj.name.substring(0,5) == "White"){

        blackDragControls.activate();
        whiteDragControls.deactivate();
        whosTurn ^= true;
        isTaken(event.object, whiteObj, blackObj, whosTurn);
        moveDots(helperDots);
        orbitControls.autoRotateSpeed = -20;
        setFalse(currentObj, whiteCastleCheck, whosTurn);

      }else{

        blackDragControls.deactivate();
        whiteDragControls.activate();
        whosTurn ^= true;
        isTaken(event.object, whiteObj, blackObj, whosTurn);
        moveDots(helperDots);
        orbitControls.autoRotateSpeed = 20;
        setFalse(currentObj, blackCastleCheck, whosTurn);

      }
    } );
}


//If king or rook has moved, then castling is no longer aloud
function setFalse(currentObj, obj, whosTurn){
    if(!whosTurn){
        if(currentObj.name.substring(6,11) == "Rook1"){
            obj[1] = true;
        }else if(currentObj.name.substring(6,11) == "Rook0"){
            obj[2] = true;
        }else if (currentObj.name.substring(6,10) == "King") {
            obj[0] = true;
        }
    }
}

function moveRookCastling(obj, allObj, whosTurn, num){

    let turn = "White ";

    if(!whosTurn){
      turn = "Black ";
    }
    for (var i = 0; i < allObj.length; i++) {
        if(num == 1 && allObj[i].name == turn + "Rook1"){
            allObj[i].position.set(obj.position.x-4, obj.position.y, obj.position.z);
        }else if(num == 2 && allObj[i].name == turn + "Rook0"){

            allObj[i].position.set(obj.position.x+4, obj.position.y, obj.position.z);
        }
    }
}

//Check if a piece has moved, not needed, but may come in use later on.
// function hasMoved(piece, chessboard, current){
//
//     let currentxPos = current.x;
//     let currentzPos = current.z;
//     let pos = getPosOnBoard(piece, chessboard);
//
//     //Put piece in center of closest square
//     piece.position.set(chessboard[pos.x][pos.y].position.x, 1.5, chessboard[pos.x][pos.y].position.z);
//
//     //Check if piece moved
//     if(Math.abs(piece.position.x - currentxPos) >= 2.5 || Math.abs(piece.position.z - currentzPos) >= 2.5 ){
//         return true;
//     }else{
//         return false;
//     }
// }

function correctPosition(piece, helperDots){

    //Check if on top of helperDot.
    for (var i = 0; i < helperDots.length; i++) {
        if(Math.abs(piece.position.x - helperDots[i].position.x) <= 2.5 && Math.abs(piece.position.z - helperDots[i].position.x) <= 2.5 ){
          return true;
        }
    }
    return false;
}

function startxPos(piece){
    return piece.position.x;
}


function startzPos(piece){
    return piece.position.z;
}

function isTaken(piece, whiteObj, blackObj, whosTurn){
    if(!whosTurn){
      if(samePlace(piece,blackObj,index)){
          blackObj[index].position.set(20-2.5*index, 1.5, 19);
      }
    }else if(samePlace(piece,whiteObj, index)){
        whiteObj[index].position.set(20-2.5*index, 1.5, -25);
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

//Move helperdot offscreen
function moveDots(helperDots){
  for (var i = 0; i < helperDots.length; i++) {
    helperDots[i].position.set(100,100,100);
  }
}

// Shows where the pieces can move
function moveHelp(piece, chessboard, current, helperDots, whiteObj, blackObj, allObj){

  // Variables for helper
  let temp = getPosOnBoard(piece, chessboard);

  let killzoneWhitePawn = [];
  killzoneWhitePawn.push(new THREE.Vector3( chessboard[temp.x+1][temp.y-1].position.x ,1.5, chessboard[temp.x+1][temp.y-1].position.z));
  killzoneWhitePawn.push(new THREE.Vector3( chessboard[temp.x+1][temp.y+1].position.x ,1.5, chessboard[temp.x+1][temp.y+1].position.z));

  let killzoneBlackPawn = [];
  killzoneBlackPawn.push(new THREE.Vector3( chessboard[temp.x-1][temp.y-1].position.x ,1.5, chessboard[temp.x-1][temp.y-1].position.z));
  killzoneBlackPawn.push(new THREE.Vector3( chessboard[temp.x-1][temp.y+1].position.x ,1.5, chessboard[temp.x-1][temp.y+1].position.z));

  if(piece.name == "White Pawn"){

      if(current.z == chessboard[2][1].position.z){
          moveDots(helperDots);
          helperDots[0].position.set(current.x, 1.5, chessboard[3][1].position.z);
          helperDots[1].position.set(current.x, 1.5, chessboard[4][1].position.z);
      }else{
          moveDots(helperDots);
          helperDots[0].position.set(current.x, 1.5, chessboard[temp.x + 1][1].position.z);
      }
      for (var i = 0; i < killzoneWhitePawn.length; i++) {
        if(isOccupiedOnBoard(killzoneWhitePawn[i], blackObj)){
            helperDots[25+i].position.set(killzoneWhitePawn[i].x, killzoneWhitePawn[i].y, killzoneWhitePawn[i].z);
        }
      }
  }
  if(piece.name == "Black Pawn"){
      if(current.z == chessboard[7][1].position.z)
      {
          moveDots(helperDots);
          if(!isOccupiedOnBoard(helperDots[0].position, allObj)){
                helperDots[0].position.set(current.x, 1.5, chessboard[6][1].position.z);
                if(!isOccupiedOnBoard(helperDots[0].position, allObj)){
                    helperDots[1].position.set(current.x, 1.5, chessboard[5][1].position.z);
                }
          }
      }else{
          moveDots(helperDots);
          helperDots[0].position.set(current.x, 1.5, chessboard[temp.x - 1][1].position.z);
      }
      for (var i = 0; i < killzoneBlackPawn.length; i++) {
        if(isOccupiedOnBoard(killzoneBlackPawn[i], whiteObj)){
            helperDots[25+i].position.set(killzoneBlackPawn[i].x, killzoneBlackPawn[i].y, killzoneBlackPawn[i].z);
        }
      }
  }

  if(piece.name.substring(6,10) == "Rook"){
      moveDots(helperDots);
      rookMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj, false);
  }

  if(piece.name.substring(6,12) == "Bishop"){
      moveDots(helperDots);
      bishopMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj, true);
  }

  if(piece.name.substring(6,11) == "Queen"){
    moveDots(helperDots);
    rookMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj, false);
    bishopMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj, true);
  }

  if(piece.name.substring(6,12) == "Knight"){
    moveDots(helperDots);
    knightMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj);
  }

  if(piece.name.substring(6,10) == "King"){
      moveDots(helperDots);
      kingMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj);
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

//Returns true if spot is occupied. input is position
function isOccupiedOnBoard(pos, obj){
    for (var i = 0; i < obj.length; i++) {
        if(pos.x == obj[i].position.x && pos.z == obj[i].position.z){
          return true;
        }
    }
    return false;
}

//Return true or false if position is occupied. input is piece
function samePlace(piece, obj, index){
    for (var i = 0; i < obj.length; i++) {
        if((piece.position.x == obj[i].position.x) && (piece.position.z == obj[i].position.z)){
          index[0] = i;
          return true;
        }
    }
    return false;
}

function isOutsideBoard(piece, chessboard){
  if(piece.x < chessboard[1][1].position.x || piece.x > chessboard[8][8].position.x || piece.z > chessboard[1][1].position.z || piece.z < chessboard[8][8].position.z){
      return true;
  }
  return false;
}

function rookMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj, checkDiff){

  let posUp = piece.position.clone();
  let posDown = piece.position.clone();
  let posLeft = piece.position.clone();
  let posRight = piece.position.clone();

  let counter = 0;

  posUp.set(posUp.x, 1.5, posUp.z-4);
  posDown.set(posDown.x, 1.5, posDown.z+4);
  posLeft.set(posLeft.x-4, 1.5, posLeft.z);
  posRight.set(posRight.x+4, 1.5, posRight.z);

  while(!isOccupiedOnBoard(posUp, allObj) && !isOutsideBoard(posUp, chessboard)){
    helperDots[counter].position.set(posUp.x, 1.5, posUp.z);
    posUp.set(posUp.x, 1.5, posUp.z-4);
    counter++;
  }
  while(!isOccupiedOnBoard(posDown, allObj) && !isOutsideBoard(posDown, chessboard)){
    helperDots[counter].position.set(posDown.x, 1.5, posDown.z);
    posDown.set(posDown.x, 1.5, posDown.z+4);
    counter++;
  }
  while(!isOccupiedOnBoard(posLeft, allObj) && !isOutsideBoard(posLeft, chessboard)){
    helperDots[counter].position.set(posLeft.x, 1.5, posLeft.z);
    posLeft.set(posLeft.x-4, 1.5, posLeft.z);
    counter++;
  }
  while(!isOccupiedOnBoard(posRight, allObj) && !isOutsideBoard(posRight, chessboard)){
    helperDots[counter].position.set(posRight.x, 1.5, posRight.z);
    posRight.set(posRight.x+4, 1.5, posRight.z);
    counter++;
  }

    if(piece.name.substring(0,5) == "White"){
        killZone(posUp, posDown, posLeft, posRight, blackObj, helperDots, checkDiff);
    }else {
        killZone(posUp, posDown, posLeft, posRight, whiteObj, helperDots, checkDiff);
    }
}

function bishopMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj, checkDiff){

  let posUpRight = piece.position.clone();
  let posUpLeft = piece.position.clone();
  let posDownRight = piece.position.clone();
  let posDownLeft = piece.position.clone();

  let counter = 14;

  posUpRight.set(posUpRight.x+4, 1.5, posUpRight.z-4);
  posUpLeft.set(posUpLeft.x-4, 1.5, posUpLeft.z-4);
  posDownRight.set(posDownRight.x+4, 1.5, posDownRight.z+4);
  posDownLeft.set(posDownLeft.x-4, 1.5, posDownLeft.z+4);

  while(!isOccupiedOnBoard(posUpRight, allObj) && !isOutsideBoard(posUpRight, chessboard)){
    helperDots[counter].position.set(posUpRight.x, 1.5, posUpRight.z);
    posUpRight.set(posUpRight.x+4, 1.5, posUpRight.z-4);
    counter++;
  }
  while(!isOccupiedOnBoard(posUpLeft, allObj) && !isOutsideBoard(posUpLeft, chessboard)){
    helperDots[counter].position.set(posUpLeft.x, 1.5, posUpLeft.z);
    posUpLeft.set(posUpLeft.x-4, 1.5, posUpLeft.z-4);
    counter++;
  }
  while(!isOccupiedOnBoard(posDownRight, allObj) && !isOutsideBoard(posDownRight, chessboard)){
    helperDots[counter].position.set(posDownRight.x, 1.5, posDownRight.z);
    posDownRight.set(posDownRight.x+4, 1.5, posDownRight.z+4);
    counter++;
  }
  while(!isOccupiedOnBoard(posDownLeft, allObj) && !isOutsideBoard(posDownLeft, chessboard)){
    helperDots[counter].position.set(posDownLeft.x, 1.5, posDownLeft.z);
    posDownLeft.set(posDownLeft.x-4, 1.5, posDownLeft.z+4);
    counter++;
  }
  if(piece.name.substring(0,5) == "White"){
      killZone(posUpRight, posUpLeft, posDownRight, posDownLeft, blackObj, helperDots, checkDiff);
  }else {
      killZone(posUpRight, posUpLeft, posDownRight, posDownLeft, whiteObj, helperDots, checkDiff);
  }
}

function knightMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj){
    let pos = [];

    for (var i = 0; i < 8; i++) {
        pos.push(piece.position.clone());
    }

    let counter = 0;

    pos[0].set(pos[0].x-4, 1.5, pos[0].z-8); //UpLeft
    pos[1].set(pos[1].x+4, 1.5, pos[1].z-8); //UpRight

    pos[2].set(pos[2].x-4, 1.5, pos[2].z+8); //DownLeft
    pos[3].set(pos[3].x+4, 1.5, pos[3].z+8); //DownRight

    pos[4].set(pos[4].x-8, 1.5, pos[4].z-4); //LeftLeft
    pos[5].set(pos[5].x-8, 1.5, pos[5].z+4); //LeftRight

    pos[6].set(pos[6].x+8, 1.5, pos[6].z+4); //RightLeft
    pos[7].set(pos[7].x+8, 1.5, pos[7].z-4); //RightRight

  for (var i = 0; i < pos.length; i++) {
    if(!isOccupiedOnBoard(pos[i], allObj) && !isOutsideBoard(pos[i], chessboard)){
      helperDots[counter].position.set(pos[i].x, 1.5, pos[i].z);
      counter++;
    }
  }

  if(piece.name.substring(0,5) == "White"){
      killZone(pos[0], pos[1], pos[2], pos[3], blackObj, helperDots, false);
      killZone(pos[4], pos[5], pos[6], pos[7], blackObj, helperDots, true);
  }else {
      killZone(pos[0], pos[1], pos[2], pos[3], whiteObj, helperDots, false);
      killZone(pos[4], pos[5], pos[6], pos[7], whiteObj, helperDots, true);
  }
}

function kingMovement(piece, chessboard, allObj, helperDots, whiteObj, blackObj){
  let pos = [];

  for (var i = 0; i < 8; i++) {
      pos.push(piece.position.clone());
  }

  let counter = 0;

  pos[0].set(pos[0].x, 1.5, pos[0].z-4); //Up
  pos[1].set(pos[1].x, 1.5, pos[1].z+4); //Down

  pos[2].set(pos[2].x-4, 1.5, pos[2].z); //Left
  pos[3].set(pos[3].x+4, 1.5, pos[3].z); //Right

  pos[4].set(pos[4].x-4, 1.5, pos[4].z-4); //UpLeft
  pos[5].set(pos[5].x+4, 1.5, pos[5].z-4); //UpRight

  pos[6].set(pos[6].x-4, 1.5, pos[6].z+4); //DownLeft
  pos[7].set(pos[7].x+4, 1.5, pos[7].z+4); //DownRight

for (var i = 0; i < pos.length; i++) {
  if(!isOccupiedOnBoard(pos[i], allObj) && !isOutsideBoard(pos[i], chessboard)){
    helperDots[counter].position.set(pos[i].x, 1.5, pos[i].z);
    counter++;
  }
}

if(piece.name.substring(0,5) == "White"){
    killZone(pos[0], pos[1], pos[2], pos[3], blackObj, helperDots, false);
    killZone(pos[4], pos[5], pos[6], pos[7], blackObj, helperDots, true);

    if(canCastle("White", 1)){
      let rightRight = pos[3].clone(); //p[3] is Right
      rightRight.set(rightRight.x+4, 1.5, rightRight.z);
      if(!isOccupiedOnBoard(rightRight, allObj) && !isOccupiedOnBoard(pos[3], allObj)){
        helperDots[43].position.set(rightRight.x, 1.5, rightRight.z);
        counter++;
      }
    }
    if(canCastle("White", 2)){
      let leftLeft = pos[2].clone(); //p[3] is Right
      leftLeft.set(leftLeft.x-4, 1.5, leftLeft.z);
      if(!isOccupiedOnBoard(leftLeft, allObj) && !isOccupiedOnBoard(pos[2], allObj)){
        helperDots[44].position.set(leftLeft.x, 1.5, leftLeft.z);
        counter++;
      }
    }


}else {
    killZone(pos[0], pos[1], pos[2], pos[3], whiteObj, helperDots, false);
    killZone(pos[4], pos[5], pos[6], pos[7], whiteObj, helperDots, true);

    if(canCastle("Black", 1)){
      let rightRight = pos[3].clone(); //p[3] is Right
      rightRight.set(rightRight.x+4, 1.5, rightRight.z);
      if(!isOccupiedOnBoard(rightRight, allObj) && !isOccupiedOnBoard(pos[3], allObj)){
        helperDots[43].position.set(rightRight.x, 1.5, rightRight.z);
        counter++;
      }
    }
    if(canCastle("Black", 2)){
      let leftLeft = pos[2].clone(); //p[3] is Right
      leftLeft.set(leftLeft.x-4, 1.5, leftLeft.z);
      if(!isOccupiedOnBoard(leftLeft, allObj) && !isOccupiedOnBoard(pos[2], allObj)){
        helperDots[44].position.set(leftLeft.x, 1.5, leftLeft.z);
        counter++;
      }
    }
}




}

function killZone(posUp, posDown ,posLeft, posRight, obj, helperDots, checkDiff){

  let counter2 = 0;
  if(checkDiff == true){
    counter2 = 5;
  }
  for (var i = 0; i < 4; i++) {
      if(isOccupiedOnBoard(posUp, obj)){
        helperDots[23+counter2].position.set(posUp.x, 1.5, posUp.z);
        counter2++;
      }
      if(isOccupiedOnBoard(posDown, obj)){
        helperDots[23+counter2].position.set(posDown.x, 1.5, posDown.z);
        counter2++;
      }
      if(isOccupiedOnBoard(posLeft, obj)){
        helperDots[23+counter2].position.set(posLeft.x, 1.5, posLeft.z);
        counter2++;
      }
      if(isOccupiedOnBoard(posRight, obj)){
        helperDots[23+counter2].position.set(posRight.x, 1.5, posRight.z);
        counter2++;
      }
  }
}


function canCastle(choice, pos){
  if(choice == "White"){
      if(whiteCastleCheck[pos] || whiteCastleCheck[0]){return false;}
      return true;
  }else{
      if(blackCastleCheck[pos] || blackCastleCheck[0]){return false;}
      return true;
  }
}
