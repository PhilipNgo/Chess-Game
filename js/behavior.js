function checkBehavior(dragControls, orbitControls, allObj, chessboard){


      dragControls.addEventListener( 'hoveron', function (event){
        event.object.material.emissive.set( 0x006400 );

      } );
      dragControls.addEventListener( 'hoveroff', function (event){
        event.object.material.emissive.set( 0x000000 );

      } );
      dragControls.addEventListener( 'dragstart', function ( event ) {
        orbitControls.enabled = false;
      } );
      dragControls.addEventListener ( 'drag', function( event ){
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
      dragControls.addEventListener( 'dragend', function (){
        orbitControls.enabled = true;
        //checkPosition(event.object, chessboard);
      } );
}

function checkPosition(piece, chessboard){

    let minx = 10;
    let minz = 10;
    let r;
    let c;

      for (var row = 0; row < chessboard.length; row++) {
        for (var col = 0; col < chessboard.length; col++) {
          if(Math.abs(obj.position.x - chessboard[row][col].position.x) < minx){
            minx = Math.abs(piece.position.x - chessboard[row][col].position.x)
            r = row;
          }
          if(Math.abs(obj.position.z - chessboard[row][col].position.z) < minz){
            minz = Math.abs(piece.position.z - chessboard[row][col].position.z)
            console.log(minz);
            c = col;
          }
        }
          console.log(r,c,minx,minz);
        }
}
