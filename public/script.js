// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a light source
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 2, 5); // Initial position, slightly above the cube
scene.add(light);

// Create a stationary cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.5, 0); // Position the cube above the ground
scene.add(cube);

// Rotate the cube 45 degrees around the Y-axis to show multiple faces
cube.rotation.y = Math.PI / 4; // 45 degrees in radians

// Create a ground (floor)
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd3d3d3, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
floor.position.y = 0; // Position the floor at y = 0
scene.add(floor);

// Create four walls
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

// Additional right wall (new wall)
const wall4 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall4.rotation.y = Math.PI / 2; // Rotate to make it vertical
wall4.position.set(10, 2.5, 0); // Position the additional wall on the far right

// Add walls to the scene
scene.add(wall1, wall2, wall3, wall4);

// Set camera position to view multiple faces of the cube
camera.position.set(0, 2, 5); // Elevate camera and position it in front of the cube
camera.lookAt(cube.position); // Make the camera look at the cube

// Get the light indicator DOM element
const lightIndicator = document.getElementById('light-indicator');

// Track the cube's jump state
let isJumping = false;
let velocityY = 0; // Vertical velocity of the cube
const gravity = -0.02; // Gravity to pull the cube down
const jumpStrength = 0.3; // How strong the jump is
const floorHeight = 0.5; // Height at which the cube lands

// Mouse movement event
document.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates to the range -1 to 1
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1; // From -1 to 1
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // From -1 to 1

    // Update the light position based on mouse coordinates
    light.position.x = mouseX * 5;  // Scale to the environment
    light.position.z = -mouseY * 10 + 5; // Adjust depth based on mouse position (bottom = close, top = far)
    light.position.y = 2; // Keep the light at a fixed height above the cube

    // Update light indicator position to match the light
    const indicatorX = event.clientX - 5; // Subtract half the width of the indicator to center it
    const indicatorY = event.clientY - 5; // Subtract half the height of the indicator to center it
    lightIndicator.style.left = `${indicatorX}px`;
    lightIndicator.style.top = `${indicatorY}px`;
});

// Space bar event listener for jump
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        // Initiate jump if space is pressed and the cube is not already jumping
        isJumping = true;
        velocityY = jumpStrength;
    }
});

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // If the cube is jumping, apply physics
    if (isJumping) {
        // Apply gravity to the cube's vertical velocity
        velocityY += gravity;

        // Update cube's position based on velocity
        cube.position.y += velocityY;

        // Check if the cube has landed on the floor
        if (cube.position.y <= floorHeight) {
            cube.position.y = floorHeight; // Reset cube's position to the floor level
            isJumping = false; // Cube has landed, stop jumping
            velocityY = 0; // Reset velocity
        }
    }

    renderer.render(scene, camera);
};

animate();

// Resize the renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
