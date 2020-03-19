function addChessboard(scene, chessboard){


    let squareGeo = new THREE.BoxGeometry(4, 4, 1);
    let squareColor;
    let decideColor = false; //false = dark square

    let woodTexture = new THREE.TextureLoader().load('wood.jpg');
    let whiteTexture = new THREE.TextureLoader().load('white.jpg');
    let blackTexture = new THREE.TextureLoader().load('black.jpg');

    for (let row = 0; row < 10; row++) {
      //Empty chessboard
      chessboard[row] = [];
      for (let col = 0; col < 10; col++) {

          //Check if dark or light square
          if(row % 2 == 0 && col % 2 != 0){
            decideColor = true;
          }
          else if(col % 2 == 0 && row % 2 != 0)
          {
            decideColor = true;
          }
          else{
            decideColor = false;
          }


          if(row == 0 || row == 9 || col == 0 || col == 9 ) //Outer rim of board
          {
            squareColor = new THREE.MeshStandardMaterial({
              map: woodTexture
            });
          }
          else if(decideColor){ // Light square
            squareColor = new THREE.MeshStandardMaterial({
              map: whiteTexture
            });
          }
          else{ // Dark square
            squareColor = new THREE.MeshStandardMaterial({
              map: blackTexture
            });
          }

          //Create new square for each row/col
          chessboard[row][col] = new THREE.Mesh(squareGeo, squareColor);
          //chessboard[row][col].add(geometry);
          chessboard[row][0].position.x = -20;

          //Transform
          if(col > 0){
              chessboard[row][col].position.set(chessboard[row][col-1].position.x + 4, 0, -row*4 + 15);
          }
          else {
              chessboard[row][col].position.set(col, 0, -row*4 + 15);
          }

          chessboard[row][col].rotation.x = -Math.PI / 2;
          chessboard[row][col].receiveShadow = true;

          scene.add(chessboard[row][col]);
      }
    }

    var loader = new THREE.FontLoader();

    loader.load( 'fonts/gentilis_regular.typeface.json', function ( font ) {

    let letter = 'A';
    let number = '1';

      for (var i = 0; i < 8; i++) {

    	var alphaGeo = new THREE.TextGeometry( letter, {
    		font: font,
    		size: 2,
    		height: 1,
    		curveSegments: 5,
    		bevelEnabled: true,
    		bevelThickness: 0.05,
    		bevelSize: 0.02,
    		bevelOffset: 0,
    		bevelSegments: 1
    	} );

      var numGeo = new THREE.TextGeometry( number, {
        font: font,
        size: 2,
        height: 1,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 1
      } );

      letter = String.fromCharCode(letter.charCodeAt(0) + 1);
      number = String.fromCharCode(number.charCodeAt(0) + 1);

      var txtMat = new THREE.MeshPhongMaterial({color:0x000000});

      var alphaMesh = new THREE.Mesh(alphaGeo, txtMat);
      var alphaMesh2 = new THREE.Mesh(alphaGeo, txtMat);

      var numMesh = new THREE.Mesh(numGeo, txtMat);
      var numMesh2 = new THREE.Mesh(numGeo, txtMat);

      alphaMesh.rotation.x = -Math.PI / 2;
      alphaMesh2.rotation.x = Math.PI / 2;
      alphaMesh2.rotation.y = Math.PI;
      alphaMesh.position.set(chessboard[0][1+i].position.x - 0.5, 0, chessboard[0][1+i].position.z + 0.5);
      alphaMesh2.position.set(chessboard[9][1+i].position.x + 0.5, 0, chessboard[9][1+i].position.z - 0.5);

      numMesh.rotation.x = -Math.PI / 2;
      numMesh2.rotation.x = Math.PI / 2;
      numMesh2.rotation.y = Math.PI;
      numMesh.position.set(chessboard[i+1][0].position.x - 0.5, 0, chessboard[i+1][0].position.z + 0.5);
      numMesh2.position.set(chessboard[i+1][9].position.x + 0.5, 0, chessboard[i+1][9].position.z - 0.5)

      scene.add(alphaMesh);
      scene.add(alphaMesh2);
      scene.add(numMesh);
      scene.add(numMesh2);

    }
    } );

}
