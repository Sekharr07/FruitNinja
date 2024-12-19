const fruitImages = [
    "./fruits/apple.png",
    "./fruits/bananas.png",
    "./fruits/lemon.png",
    "./fruits/pineapple.png",
    "./fruits/strawberry.png",
];

const fruitsContainer = document.querySelector('.fruits-container');

// Random nUmber generator
const random = (min, max) => Math.random() * (max - min) + min;

// main animation function 
function createFruit() {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    fruit.style.backgroundImage = `url(${fruitImages[Math.floor(random(0, fruitImages.length))]})`;
    let minSize=4;
    let maxSize=10;
    const fruitSize = Math.floor(random(minSize, maxSize));
    fruit.style.width = `${fruitSize}rem`;
    fruit.style.height = `${fruitSize}rem`;


    // const startX = 10;
    // const startY = 50; // Below the screen
    const startX = random(0, window.innerWidth);
    const startY = window.innerHeight + 50; // Below the screen
    // console.log(startX, startY)
    fruit.style.left = `${startX}px`;
    fruit.style.top = `${startY}px`; 


    fruitsContainer.appendChild(fruit);

    const endX = random(0, window.innerWidth);
    const endY = -random(0, window.innerHeight + 50);
    // console.log(endX, endY)

    const duration = random(2, 4); // Animation duration


    fruit.animate(
        [
            // Start position (startX, startY)
            { transform: `translate(0, 0)` }, 
            // End position (endX, endY)
            { transform: `translate(${endX - startX}px, ${endY - startY}px)` } 
        ],

        {
            duration: duration * 1000,
            easing: 'ease-in-out',
            iterations: 1,
            fill: 'forwards'
        }
    );


    setTimeout(() => {
        fruit.remove();
    }, duration * 1000);
}

function spawnFruits() {
    setInterval(() => {
        createFruit();
        createFruit(); 
    }, 1000);
}

spawnFruits();


