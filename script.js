const fruitImages = [
    "./fruits/apple.png",
    "./fruits/bananas.png",
    "./fruits/lemon.png",
    "./fruits/pineapple.png",
    "./fruits/strawberry.png",
];

const fruitsContainer = document.querySelector('.fruits-container');

// Helper function to generate a random number between a range
const random = (min, max) => Math.random() * (max - min) + min;

// Function to create and animate a fruit
function createFruit() {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    fruit.style.backgroundImage = `url(${fruitImages[Math.floor(random(0, fruitImages.length))]})`;

    

    // Set initial position (off-screen)
    const startX = random(0, window.innerWidth);
    const startY = window.innerHeight + 50; // Below the screen
    console.log(startX, startY)
    fruit.style.left = `${startX}px`;
    fruit.style.top = `${startY}px`;

    // Add to container
    fruitsContainer.appendChild(fruit);

    // Set the animation trajectory
    const endX = random(0, window.innerWidth);
    const peakY = random(window.innerHeight / 4, window.innerHeight / 2);

    const duration = random(2, 4); // Animation duration

    // Animate using CSS
    fruit.animate(
        [
            { transform: `translate(0, 0)` },
            { transform: `translate(${endX - startX}px, -${peakY}px)` },
            { transform: `translate(${endX - startX}px, ${window.innerHeight}px)` }
        ],
        {
            duration: duration * 1000,
            easing: 'ease-in-out',
            iterations: 1,
            fill: 'forwards'
        }
    );

    // Remove fruit after animation
    setTimeout(() => {
        fruit.remove();
    }, duration * 1000);
}

// Function to spawn fruits periodically
function spawnFruits() {
    setInterval(() => {
        createFruit();
        // createFruit(); 
    }, 1000);
}

// Start spawning fruits
// spawnFruits();

createFruit();


