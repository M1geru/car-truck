var scene = new THREE.Scene();

scene.background=new THREE.Color(0xdddddd);
//CAMARA
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 5000);


//RENDER
const renderer = new THREE.WebGLRenderer({anttialias:true});
renderer.setSize(  window.innerWidth,window.innerHeight  );
//renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);

//CONTROLES ORBIT/DEVICE/STEREO
const orbit = new THREE.OrbitControls(camera, renderer.domElement);
//const device = new THREE.DeviceOrientationControls( camera );
	


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
   
    





camera.rotation.y=45/180*Math.PI;
camera.position.x=800;
camera.position.y=100;
camera.position.z=1000;


//objects

const boxWidth = 1000;
const boxHeight = 10;
const boxDepth = 2500;

const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.position.y=-30

var t=0;
var animate = function () {
    renderer.render( scene, camera );
    requestAnimationFrame( animate );

    document.addEventListener('keydown', (event) => {
        if (event.key === "f"||event.key === "F") {
            camera.lookAt(0,0,0);
            camera.position.x=800;
            camera.position.y=100;
            camera.position.z=1000;
        }
        if(event.key === "1"){
            camera.position.set(0,150,1800);
            camera.lookAt(0,0,0);
           
        }
        if(event.key === "2"){
            camera.position.set(1500,150,0);
            camera.lookAt(0,0,0);
            
        }
        if(event.key === "3"){
            camera.position.set(-1500,150,0);
            camera.lookAt(0,0,0);
            
        }
        if(event.key === "4"){
            camera.position.set(0,1500,0);
            camera.lookAt(0,0,0);
           
        }
    },false);



 
    if(camera.position.y<=-14 ){
        camera.position.y=-14
    }
    if(camera.position.y>1500){
        camera.position.y=1500;
    }
    if(camera.position.z>2300){
        camera.position.z=2300;
    }
    if(camera.position.z<-1800){
        camera.position.z=-1800;
    }
    if(camera.position.x<-1500){
        camera.position.x=-1500;
    }
    if(camera.position.x>1500){
        camera.position.x=1500;
    }
};

animate();