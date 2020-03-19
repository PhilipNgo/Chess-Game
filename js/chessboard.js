function addChessboard(scene){
    let chessboard = [];

    let squareGeo = new THREE.BoxGeometry(4, 4, 1);
    let squareColor;
    let decideColor = false; //false = dark square

    for (let row = 0; row < 10; row++) {

      chessboard[row] = [];

      for (let col = 0; col < 10; col++) {

      if(row % 2 == 0 && col % 2 != 0){
        decideColor = false;
      }
      else if(col % 2 == 0 && row % 2 != 0)
      {
        decideColor = false;
      }
      else{
        decideColor = true;
      }

      if(row == 0 || row == 9 || col == 0 || col == 9 )
      {
        squareColor = new THREE.MeshStandardMaterial({
          color: 0xa52a2a
        });
      }
      else if(decideColor){
        squareColor = new THREE.MeshStandardMaterial({
          color: 0xffffff
        });
      }
      else{
        squareColor = new THREE.MeshStandardMaterial({
          color: 0x000000
        });
      }

      chessboard[row][col] = new THREE.Mesh(squareGeo, squareColor);
      chessboard[row][0].position.x = -20;

      //Transform
      if(col > 0){
        chessboard[row][col].position.set(chessboard[row][col-1].position.x + 4, 0, -row*4);
      }
      else {
        chessboard[row][col].position.set(col, 0, -row*4);
      }
      chessboard[row][col].rotation.x = Math.PI / 2;
      chessboard[row][col].receiveShadow = true;

      scene.add(chessboard[row][col]);
      }
    }
}
