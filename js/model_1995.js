if ( WEBGL.isWebGLAvailable() === false ) {
				document.body.appendChild( WEBGL.getWebGLErrorMessage() );
			}
			var container, stats, controls;
			var camera, scene, renderer, light;
          
        
			init();
			animate();
        
            
            
			function init() {
               
                container = document.getElementById('modal-body2');
				camera = new THREE.PerspectiveCamera( 0.5, window.innerWidth / window.innerHeight, 0.25, 1000 );
				//camera.position.set( -1.8, 0.9, 2.7 );
                camera.position.x = 0;
                camera.position.y = 150;
                camera.position.z = 10;
				controls = new THREE.OrbitControls( camera );
				controls.target.set(0, 0, 0);
                controls.enableRotate = true;
                controls.minPolarAngle = Math.PI * 0.5;
                controls.maxPolarAngle = Math.PI * 0.5;
                controls.enableZoom = false;
                controls.enableKeys = false;
                
                //controls.autoRotate = true;
				controls.update();
 
                
                
				scene = new THREE.Scene();
				light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
				light.position.set( 1, 1, 0 );
				scene.add( light );
				

                //MODEL INITIAL
                
                var loader = new THREE.GLTFLoader();
                loader.load( 'models/19955.glb' , function ( gltf ) {
					gltf.scene.traverse( function ( child ) {
						if ( child.isMesh ) {
                            
                            
						}
					} );
                    
                    gltf.scene.rotation.set(Math.PI * 0.5, 0, 0)
					scene.add( gltf.scene );
                    
                                    console.log("nome:",gltf.scene );
                      mesh = gltf.scene;
                      scene.add(mesh);


                    
                    mesh.rotation.y += 0.006;
                    
                    render();

				}, undefined, function ( e ) {
					console.error( e );
				} );
                    
               
                
				

				renderer = new THREE.WebGLRenderer( { alpha: true } );
                                renderer.setClearColor( 0x000000, 0 );

				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.gammaOutput = true;
				container.appendChild( renderer.domElement );
				// stats
				stats = new Stats();
				container.appendChild( stats.dom );
                
              
				//
                
                
			}
			
            
            
            
			//
			function animate() {
             
				requestAnimationFrame( animate );
				renderer.render( scene, camera );
				stats.update();
			}
                
                
            function render(){
                

                if (mesh) {
                    mesh.rotation.z -= 0.01;
                }

                    requestAnimationFrame(render);
                    //WebGLRenderer.render(scene, camera);
            }