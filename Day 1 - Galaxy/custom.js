var container;
var camera, scene, renderer, group, particle;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 4000 );
  camera.position.z = 3000;

  scene = new THREE.Scene();

  var PI2 = Math.PI * 2;
  var program = function ( ctx ) {
  	ctx.beginPath();
  	ctx.arc( 0, 0, 0.5, 0, PI2, true );
  	ctx.fill();
  };

  group = new THREE.Group();
  scene.add( group );

  for ( var i = 0; i < 700; i++ ) {
  	var material = new THREE.SpriteCanvasMaterial ({
      color: 0xffffff,
      opacity: 0.9,
      program: program
  } );

  	particle = new THREE.Sprite( material );
  	particle.position.x = Math.random() * 4000 - 2000;
  	particle.position.y = Math.random() * 4000 - 2000;
  	particle.position.z = Math.random() * 4000 - 2000;
  	particle.scale.x = particle.scale.y = Math.random() * 0 + 10;
  	group.add( particle );
  }

  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor( 0xffffff, 0.0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  camera.lookAt( scene.position );

  var currentSeconds = Date.now();
  group.rotation.z = currentSeconds * 0.0002;

  renderer.render( scene, camera );
}