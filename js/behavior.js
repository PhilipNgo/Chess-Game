function checkBehavior(whiteDragControls, blackDragControls, orbitControls, allObj, chessboard, whosTurn, whiteObj, blackObj){

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
        } );

        whiteDragControls.addEventListener ( 'drag', function( event ){
        event.object.position.y = 1.5; // Cant drag upwards.

          //Cant drag outside board
          if(event.object.position.x < chessboard[1][1].position.x){
            event.object.position.x = chessboard[1][1].position.x;
          }
          if (event.object.position.x > chessboard[8][8].position.x){
            event.object.position.x = chessboard[8][8].position.x;
          }
          if (event.object.position.z > chessboard[1][1].position.z) {
            event.object.position.z = chessboard[1][1].position.z;
          }
          if(event.object.position.z < chessboard[8][8].position.z){
            event.object.position.z = chessboard[8][8].position.z;
          }
        });

        //After a move, its blacks turn
        whiteDragControls.addEventListener( 'dragend', function (event){

          orbitControls.enabled = true;

          if(checkPosition(event.object, chessboard, currentWhite)){
            blackDragControls.activate();
            whiteDragControls.deactivate();
            whosTurn ^= true;
            isTaken(event.object, whiteObj, blackObj, whosTurn);
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
        } );
        //Cant drag outside board
        blackDragControls.addEventListener ( 'drag', function( event ){
        event.object.position.y = 1.5; // Cant drag upwards.
          if(event.object.position.x < chessboard[1][1].position.x){
            event.object.position.x = chessboard[1][1].position.x;
          }
          if (event.object.position.x > chessboard[8][8].position.x){
            event.object.position.x = chessboard[8][8].position.x;
          }
          if (event.object.position.z > chessboard[1][1].position.z) {
            event.object.position.z = chessboard[1][1].position.z;
          }
          if(event.object.position.z < chessboard[8][8].position.z){
            event.object.position.z = chessboard[8][8].position.z;
          }
        });
        //After blacks turn, its whites turn
        blackDragControls.addEventListener( 'dragend', function (event){

          orbitControls.enabled = true;

          if(checkPosition(event.object, chessboard, currentBlack)){
            blackDragControls.deactivate();
            whiteDragControls.activate();
            whosTurn ^= true;
            console.log(whosTurn);

            isTaken(event.object, whiteObj, blackObj, whosTurn);

            orbitControls.autoRotateSpeed = 20;
          }
        } );


}

function checkPosition(piece, chessboard, current){

    let minx = 10;
    let minz = 10;
    let r;
    let c;
    let currentxPos = current.x;
    let currentzPos = current.z;

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
    //Put piece in center of closest square
    piece.position.set(chessboard[r][c].position.x, 1.5, chessboard[r][c].position.z);

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

    console.log("THIS IS",whosTurn);

    if(!whosTurn){
      for (var i = 0; i < blackObj.length; i++) {
          if((piece.position.x == blackObj[i].position.x) && (piece.position.z == blackObj[i].position.z))
          {
              blackObj[i].position.set(20-2.5*i, 1.5, 19);
          }
        }
      }else{
      for (var k = 0; k < whiteObj.length; k++){

        if((piece.position.x == whiteObj[k].position.x) && (piece.position.z == whiteObj[k].position.z))
        {
            whiteObj[k].position.set(20-2.5*k, 1.5, -25);
        }
      }
    }
}
