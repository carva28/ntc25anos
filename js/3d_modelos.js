// cuidado com esta mensagem!! deviamos pensar numa forma diferente de a mostrar
if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

document.getElementById("btn01").addEventListener("click", function(event) {
    // display the current click count inside the clicked div
    for (var i = 1993; i <= 1997; i++) {
        init(i);
        console.log("Ano"+i);
    }
    
  }, false);

  document.getElementById("btn02").addEventListener("click", function(event) {
    // display the current click count inside the clicked div
    for (var i = 1998; i <= 2002; i++) {
        init(i);
        console.log("Ano"+i);
    }
    
  }, false);

  document.getElementById("btn03").addEventListener("click", function(event) {
    // display the current click count inside the clicked div
    for (var i = 2003; i <= 2007; i++) {
        init(i);
        console.log("Ano"+i);
    }
    
  }, false);

  document.getElementById("btn04").addEventListener("click", function(event) {
    // display the current click count inside the clicked div
    for (var i = 2008; i <= 2012; i++) {
        init(i);
        console.log("Ano"+i);
    }
    
  }, false);

  document.getElementById("btn05").addEventListener("click", function(event) {
    // display the current click count inside the clicked div
    for (var i = 2013; i <= 2017; i++) {
        init(i);
        console.log("Ano"+i);
    }
    
  }, false);

 





function init(year) {

    /* create variables */
    var mesh;
    var container, controls;
    var camera, scene, renderer, light;

    /* create scene */
    scene = new THREE.Scene();

    /* get container reference */
    container = document.getElementById("ano" + year);


    /* set camera settings */
    camera = new THREE.PerspectiveCamera(0.25, window.innerWidth / window.innerHeight, 0.25, 250);
    camera.position.set(0, 150, 50);

   
 

    /* set illumination */
    light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 150,500);
    scene.add(light);

    

    /* load model */
    var loader = new THREE.GLTFLoader();
    loader.load('models/' + year + '.glb', function (gltf) {
        console.log("carregou modelo");
        gltf.scene.traverse(function (child) {
            if (child.isMesh) { }
        });

        // rotate scene to object face forward
        gltf.scene.rotation.set(Math.PI * 0.5 , 0, 0);

        mesh = gltf.scene;
        scene.add(mesh);
        
        render();

        document.getElementById("close05").addEventListener("click", function(event) {
            // display the current click count inside the clicked div
           
                scene.remove(mesh);
                console.log("remove");
           
            
          }, false);
        

    }, undefined, function (e) {
        console.error(e);
    });

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    container.appendChild(renderer.domElement);

    /* set controls */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableRotate = true;
    controls.minPolarAngle = Math.PI * 0.5;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.enableZoom = false;
    controls.enableKeys = false;
    controls.noPan = true;
    controls.update();


    animate();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function render() {
        if (mesh) {
            mesh.rotation.z -= 0.008;
        }
        requestAnimationFrame(render);
    }

}
