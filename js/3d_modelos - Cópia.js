// cuidado com esta mensagem!! deviamos pensar numa forma diferente de a mostrar
if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

for (var i = 1993; i <= 2017; i++) {
    init(i);
}

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
    camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 0.5, 100);
    camera.position.set(0, 50, 0);
 
    /* set illumination
    light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 150,500);
    scene.add(light);
    */  
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .75);
    hemiLight.color.setHSL(0.7, .5, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0,150,150);
    scene.add(hemiLight);
    console.log("hemisphere light");

    var dirFrontLight = new THREE.DirectionalLight(0xffffff, .25);
    dirFrontLight.color.setHSL(0.5, 1, 0.95);
    dirFrontLight.position.set(0,0,50);
    dirFrontLight.position.multiplyScalar(1);
    scene.add(dirFrontLight);
    console.log("directional light");

    var dirSideLight = new THREE.DirectionalLight(0xffffff, .25);
    dirSideLight.color.setHSL(0.5, 1, 0.95);
    dirSideLight.position.set(50,0,50);
    dirSideLight.position.multiplyScalar(1);
    scene.add(dirSideLight);
    console.log("directional light");

    var dirTopLight = new THREE.DirectionalLight(0xffffff, .5);
    dirTopLight.color.setHSL(0.5, 1, 0.95);
    dirTopLight.position.set(0,50,-50);
    dirTopLight.position.multiplyScalar(3);
    scene.add(dirTopLight);
    console.log("directional light");


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
    controls.minPolarAngle = Math.PI * 0.5;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.enableZoom = false;
    controls.enableKeys = false;
    controls.enablePan = false;
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