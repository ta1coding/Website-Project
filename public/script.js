// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a light source
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 5, 5); // Initial position
scene.add(light);

// Create a stationary cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.5, 0); // Position the cube above the ground

// Rotate the cube 45 degrees around the Y-axis to show multiple faces
cube.rotation.y = Math.PI / 4; // 45 degrees in radians
scene.add(cube);

// Create a ground (floor)
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd3d3d3, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
floor.position.y = 0; // Position the floor at y = 0
scene.add(floor);

// Create three walls
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.5 });

// Left wall
const wall1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall1.rotation.y = Math.PI / 2; // Rotate to make it vertical
wall1.position.set(-5, 2.5, 0); // Position the wall on the left side

// Right wall
const wall2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall2.rotation.y = Math.PI / 2; // Rotate to make it vertical
wall2.position.set(5, 2.5, 0); // Position the wall on the right side

// Back wall
const wall3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall3.position.set(0, 2.5, -5); // Position the wall at the back

// Add walls to the scene
scene.add(wall1, wall2, wall3);

// Set camera position to view multiple faces of the cube
camera.position.set(0, 2, 5); // Elevate camera and position it in front of the cube
camera.lookAt(cube.position); // Make the camera look at the cube

// Mouse movement event
document.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates to the range -1 to 1
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the light position based on mouse coordinates
    light.position.x = mouseX * 5;  // Scale to the environment
    light.position.y = mouseY * 5 + 5; // Scale to the environment and raise it a bit
});

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Optionally rotate the cube for a dynamic effect
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();

// Resize the renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
