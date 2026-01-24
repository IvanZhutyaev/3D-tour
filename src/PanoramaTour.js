import * as THREE from 'three';

export class PanoramaTour {
    constructor(canvasId, config) {
        this.canvas = document.getElementById(canvasId);
        this.config = config;
        this.currentSceneIndex = 0;
        
        // Camera settings
        this.fov = 75;
        this.minFov = 40;
        this.maxFov = 100;
        
        // Mouse/touch controls
        this.isUserInteracting = false;
        this.onPointerDownMouseX = 0;
        this.onPointerDownMouseY = 0;
        this.lon = 0;
        this.onPointerDownLon = 0;
        this.lat = 0;
        this.onPointerDownLat = 0;
        
        this.init();
    }
    
    init() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 0);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        // Raycaster for hotspot detection
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hotspots = [];
        
        // Add event listeners
        this.addEventListeners();
        
        // Load first scene
        this.loadScene(0);
    }
    
    loadScene(index) {
        this.currentSceneIndex = index;
        const scene = this.config.scenes[index];
        
        // Show loading screen
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.remove('hidden');
        
        // Remove old sphere if exists
        if (this.sphere) {
            this.scene.remove(this.sphere);
            if (this.sphere.geometry) this.sphere.geometry.dispose();
            if (this.sphere.material) {
                if (this.sphere.material.map) this.sphere.material.map.dispose();
                this.sphere.material.dispose();
            }
        }
        
        // Remove old hotspots
        this.clearHotspots();
        
        // Load texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            scene.image,
            (texture) => {
                // Create sphere geometry (inside-out for panorama)
                const geometry = new THREE.SphereGeometry(500, 60, 40);
                geometry.scale(-1, 1, 1); // Invert to see inside
                
                const material = new THREE.MeshBasicMaterial({
                    map: texture
                });
                
                this.sphere = new THREE.Mesh(geometry, material);
                this.scene.add(this.sphere);
                
                // Reset camera orientation
                this.lon = scene.initialLon || 0;
                this.lat = scene.initialLat || 0;
                
                // Add hotspots
                if (scene.hotspots) {
                    this.addHotspots(scene.hotspots);
                }
                
                // Hide loading screen
                loadingScreen.classList.add('hidden');
            },
            undefined,
            (error) => {
                console.error('Error loading panorama:', error);
                loadingScreen.classList.add('hidden');
                alert('Error loading panorama. Please check the image path.');
            }
        );
    }
    
    addHotspots(hotspots) {
        hotspots.forEach(hotspot => {
            // Create hotspot mesh
            const geometry = new THREE.SphereGeometry(5, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.7
            });
            const mesh = new THREE.Mesh(geometry, material);
            
            // Position hotspot using spherical coordinates
            const phi = THREE.MathUtils.degToRad(90 - hotspot.lat);
            const theta = THREE.MathUtils.degToRad(hotspot.lon);
            
            mesh.position.x = 200 * Math.sin(phi) * Math.cos(theta);
            mesh.position.y = 200 * Math.cos(phi);
            mesh.position.z = 200 * Math.sin(phi) * Math.sin(theta);
            
            mesh.userData = { hotspot };
            this.scene.add(mesh);
            this.hotspots.push(mesh);
        });
    }
    
    clearHotspots() {
        this.hotspots.forEach(hotspot => {
            this.scene.remove(hotspot);
            if (hotspot.geometry) hotspot.geometry.dispose();
            if (hotspot.material) hotspot.material.dispose();
        });
        this.hotspots = [];
    }
    
    addEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.onPointerDown.bind(this), false);
        this.canvas.addEventListener('mousemove', this.onPointerMove.bind(this), false);
        this.canvas.addEventListener('mouseup', this.onPointerUp.bind(this), false);
        this.canvas.addEventListener('wheel', this.onMouseWheel.bind(this), false);
        this.canvas.addEventListener('click', this.onCanvasClick.bind(this), false);
        
        // Touch events
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.canvas.addEventListener('touchend', this.onPointerUp.bind(this), false);
        
        // Window resize
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }
    
    onPointerDown(event) {
        this.isUserInteracting = true;
        this.onPointerDownMouseX = event.clientX;
        this.onPointerDownMouseY = event.clientY;
        this.onPointerDownLon = this.lon;
        this.onPointerDownLat = this.lat;
    }
    
    onPointerMove(event) {
        if (this.isUserInteracting) {
            this.lon = (this.onPointerDownMouseX - event.clientX) * 0.1 + this.onPointerDownLon;
            this.lat = (event.clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;
        }
    }
    
    onPointerUp() {
        this.isUserInteracting = false;
    }
    
    onTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            this.onPointerDownMouseX = event.touches[0].pageX;
            this.onPointerDownMouseY = event.touches[0].pageY;
            this.onPointerDownLon = this.lon;
            this.onPointerDownLat = this.lat;
            this.isUserInteracting = true;
        }
    }
    
    onTouchMove(event) {
        if (event.touches.length === 1 && this.isUserInteracting) {
            event.preventDefault();
            this.lon = (this.onPointerDownMouseX - event.touches[0].pageX) * 0.1 + this.onPointerDownLon;
            this.lat = (event.touches[0].pageY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;
        }
    }
    
    onMouseWheel(event) {
        event.preventDefault();
        const delta = event.deltaY * 0.05;
        this.fov = THREE.MathUtils.clamp(this.fov + delta, this.minFov, this.maxFov);
        this.camera.fov = this.fov;
        this.camera.updateProjectionMatrix();
    }
    
    onCanvasClick(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Check for intersections with hotspots
        const intersects = this.raycaster.intersectObjects(this.hotspots);
        
        if (intersects.length > 0) {
            const hotspot = intersects[0].object.userData.hotspot;
            if (hotspot.targetScene !== undefined) {
                this.loadScene(hotspot.targetScene);
                // Update active scene button
                const sceneBtns = document.querySelectorAll('.scene-btn');
                sceneBtns.forEach(btn => btn.classList.remove('active'));
                sceneBtns[hotspot.targetScene].classList.add('active');
            }
        }
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    zoomIn() {
        this.fov = THREE.MathUtils.clamp(this.fov - 10, this.minFov, this.maxFov);
        this.camera.fov = this.fov;
        this.camera.updateProjectionMatrix();
    }
    
    zoomOut() {
        this.fov = THREE.MathUtils.clamp(this.fov + 10, this.minFov, this.maxFov);
        this.camera.fov = this.fov;
        this.camera.updateProjectionMatrix();
    }
    
    update() {
        // Clamp latitude
        this.lat = Math.max(-85, Math.min(85, this.lat));
        
        // Convert to radians
        const phi = THREE.MathUtils.degToRad(90 - this.lat);
        const theta = THREE.MathUtils.degToRad(this.lon);
        
        // Update camera target
        const target = new THREE.Vector3();
        target.x = 500 * Math.sin(phi) * Math.cos(theta);
        target.y = 500 * Math.cos(phi);
        target.z = 500 * Math.sin(phi) * Math.sin(theta);
        
        this.camera.lookAt(target);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    start() {
        this.animate();
    }
}
