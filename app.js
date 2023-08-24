var scene = new THREE.Scene();

scene.background=new THREE.Color(0xd1ddd1);
//CAMARA
const camera5 = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 5000);


let activeCameras = [];

 const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth  / window.innerHeight, 1, 5000);
camera1.position.set(0,150,1800);
camera1.lookAt(0,0,0);
 // Configura posición de la cámara 1
    
 const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
camera2.position.set(1500,150,0);
camera2.lookAt(0,0,0);   
// Configura posición de la cámara 2
    
const camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    
camera3.position.set(-1500,150,0);
camera3.lookAt(0,0,0);
// Configura posición de la cámara 3
    
const camera4 = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 1, 5000);
camera4.position.set(0,1500,0);
camera4.lookAt(0,0,0);    


// Configura posición de la cámara 4


//RENDER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(  window.innerWidth,window.innerHeight  );
renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);


//CONTROLES ORBIT/DEVICE/STEREO
const orbit = new THREE.OrbitControls(camera5, renderer.domElement);
orbit.enabled = false;
//const device = new THREE.DeviceOrientationControls( camera );
	
function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    if (Cambioscena) {
        const cameraAspect = (width / 2) / height;

        camera1.aspect = cameraAspect;
        camera2.aspect = cameraAspect;
        camera3.aspect = cameraAspect;
        camera4.aspect = cameraAspect;
        updateViewports();
    } else {
        camera5.aspect = width / height;
        camera5.updateProjectionMatrix();
        updateViewports();
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// Escuchar evento de cambio de tamaño de ventana
window.addEventListener('resize', onWindowResize);

//MIXER
//	var mixer;
const loader1 = new THREE.FBXLoader();
        loader1.load( 'carito.fbx', function ( object1 ) {

       
            //car=object1.scene.children[0];
            object1.traverse( function ( child ) {
                
                if ( child.isMesh ) {
                    

                    child.castShadow = true;
                    child.receiveShadow = true;
                    //material al modelo
                    if(child.name== "")
                    {
                    //child.material= material;
                    }

                }
                object1.scale.x =100
                object1.scale.y =100
                object1.scale.z =100
                
                scene.add(object1);

            } );
        });
    
     
    //LUCES
    //ambient light //solo poner intensidad y agregarla
    const light = new THREE.AmbientLight( 0x404040 , 0.6); // soft white light
    scene.add( light );

   
    
    //Crear Luz
    const directionalLight = new THREE.DirectionalLight( 0xffffff ,0.6);
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow=true;
    scene.add( directionalLight );

    
    //pointlight
    const lightP = new THREE.PointLight( 0xc4c4c4, 0.7);
    lightP.position.set( 0, 200, 1200 );
   
    scene.add( lightP );

    const lightP1 = new THREE.PointLight( 0xc4c4c4, 0.5);
    lightP1.position.set( 1200, 300, 0 );
   
    scene.add( lightP1 );

    const lightP2 = new THREE.PointLight( 0xc4c4c4, 0.7);
    lightP2.position.set( 0, 300, -1200 );
    
    scene.add( lightP2 );

    const lightP3 = new THREE.PointLight( 0xc4c4c4, 0.5);
    lightP3.position.set( -1200, 500, 0 );
    
    scene.add( lightP3 );
   
    





camera5.rotation.y=45/180*Math.PI;
camera5.position.x=800;
camera5.position.y=100;
camera5.position.z=1000;


//objects

const boxWidth = 1000;
const boxHeight = 10;
const boxDepth = 2500;

const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.position.y=-30

let Cambioscena = false;


function Cambioventana() {
    Cambioscena = !Cambioscena;
    orbit.enabled = !orbit.enabled;

    const viewWidth = window.innerWidth / 2;
    const viewHeight = window.innerHeight / 2;
    renderer.clear();

    if (Cambioscena) {
        
        // Parte superior izquierda
        renderer.setViewport(0, viewHeight, viewWidth, viewHeight);
        renderer.setScissor(0, viewHeight, viewWidth, viewHeight);
        renderer.setScissorTest(true);
        renderer.render(scene, camera1);

        // Parte superior derecha
        renderer.setViewport(viewWidth, viewHeight, viewWidth, viewHeight);
        renderer.setScissor(viewWidth, viewHeight, viewWidth, viewHeight);
        renderer.setScissorTest(true);
        renderer.render(scene, camera2);

        // Parte inferior izquierda
        renderer.setViewport(0, 0, viewWidth, viewHeight);
        renderer.setScissor(0, 0, viewWidth, viewHeight);
        renderer.setScissorTest(true);
        renderer.render(scene, camera3);

        // Parte inferior derecha
        renderer.setViewport(viewWidth, 0, viewWidth, viewHeight);
        renderer.setScissor(viewWidth, 0, viewWidth, viewHeight);
        renderer.setScissorTest(true);
        renderer.render(scene, camera4);
        updateViewports();
    } else {
        
        renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
        renderer.setScissorTest(true);
        orbit.update();
        renderer.render(scene, camera5);
        updateViewports();
    }

    updateViewports();
}

// Función para actualizar los viewports
function updateViewports() {
    const cameraCount = activeCameras.length;
    const viewportWidth = 1.0 / cameraCount;

    for (let i = 0; i < cameraCount; i++) {
        const camera = activeCameras[i];
        const x = i * viewportWidth;

        renderer.setViewport(x * window.innerWidth, 0, viewportWidth * window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }
}





var t=0;
var animate = function () {


    renderer.clear();
    if (!Cambioscena) {
        orbit.update();
        updateViewports();
       
    }
    
    // Renderizar escena con cámaras activas
    
    

    document.addEventListener('keydown', (event) => {
        if (event.key === "f"||event.key === "F") {
            camera5.lookAt(0,0,0);
            camera5.position.x=800;
            camera5.position.y=100;
            camera5.position.z=1000;
        }
        if(event.key === "1"){

            renderer.clear();
            Cambioventana();
            
           
        }else if (event.key === 'a' || event.key === 'A') {
            Cambioscena = false;
            orbit.enabled = !orbit.enabled;
            activeCameras = [camera5];
            updateViewports();
        }
        
    },false);


    requestAnimationFrame( animate );
    

 
    if(camera5.position.y<=-14 ){
        camera5.position.y=-14
    }
    if(camera5.position.y>1500){
        camera5.position.y=1500;
    }
    if(camera5.position.z>2300){
        camera5.position.z=2300;
    }
    if(camera5.position.z<-1800){
        camera5.position.z=-1800;
    }
    if(camera5.position.x<-1500){
        camera5.position.x=-1500;
    }
    if(camera5.position.x>1500){
        camera5.position.x=1500;
    }
};

animate();