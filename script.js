const fruitImages = [
    "./fruits/apple.png",
    "./fruits/bananas.png",
    "./fruits/lemon.png",
    "./fruits/pineapple.png",
     "./fruits/watermelon.png",
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
    let maxSize=8;
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
    const c=random(0, window.innerWidth/2);
    const endX = c+startX;
    const endX2 =2*c+startX;
    const peakY = -random(0, window.innerHeight);
    // console.log(endX, endY)

    const duration = random(4, 6); // Animation duration

    fruit.animate(
        [
            {
                transform: `translate(0, 0) rotate(0deg) scale(1)`, // Start position
            },
            
            {
                transform: `translate(${(c) / 2}px, ${peakY}px) rotate(22deg) scale(1.115)`, // Rotate at the peak
                offset: 0.2, // Stay and rotate
            },
            {
                transform: `translate(${2*c}px, ${startY}px) rotate(35deg) scale(1)` // End position
            }
        ],
        {
            duration: duration * 1000, // Total animation duration
            easing: 'ease-in-out', // Smooth acceleration and deceleration
            iterations: 1, // Run once
            fill: 'forwards' // Retain the final position after animation
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
        
        createFruit(); 
    }, 1000);
}

// spawnFruits();

var canvas= document.getElementById("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
var drawing=canvas.getContext("2d");
var T=0;
var x0=random(0, window.innerWidth/3);
var x01=random(2*window.innerWidth/3, window.innerWidth);
var y0=canvas.height;
var y01=canvas.height;
var x=x0;
var x1=x01;
var y=y0;
var y1=y01;
var angle=random(60,85);
var speed= random(2.5,3)
// var speed= random(2.5,3)*((Math.max(window.innerHeight, window.innerWidth))/2000);
var g=0.007;
console.log(speed);
console.log(y0);
console.log(y01);
console.log(window.innerHeight);
console.log(window.innerWidth);

var oldTimeStamp=0.;
var secondsPassed=0.;
var animationSpeed=600;
const img = new Image();
img.classList.add('fruit');
img.src = fruitImages[Math.floor(random(0, fruitImages.length))];
// img.src = `url(${fruitImages[Math.floor(random(0, fruitImages.length))]})`;
window.onload=init();
console.log(img.src);

function init(){
    window.requestAnimationFrame(animationLoop);
}
function animationLoop(timeStamp){
    secondsPassed=(timeStamp- oldTimeStamp)/1000;
    oldTimeStamp=timeStamp;
    update();
    draw();
    // var space = y ;
    // var hmax=0.5*speed*speed*Math.sin(-angle*Math.PI/180.)*Math.sin(-angle*Math.PI/180.)/g-y;
    // if(hmax>=space){
    //     drawing.clearRect(0,0, canvas.width, canvas.height);
    //     // console.log(hmax);
    //     return;}
    canvas.addEventListener('mousemove', function() {
        if (drawing.isPointInPath(img, img.offsetX, img.offsetY)) {
            drawing.fillStyle = 'green';
          }
          else {
            drawing.fillStyle = 'red';
          }
          
        
          // Draw circle
          drawing.clearRect(0, 0, canvas.width, canvas.height);
          drawing.fill(img);
      });

    if(y>=y0 && x!=x0){
        drawing.clearRect(0,0, canvas.width, canvas.height);
        return;
    }
    window.requestAnimationFrame(animationLoop);
}
function update(){
    T+= animationSpeed*secondsPassed;
    x=speed*Math.cos(-angle*Math.PI/180.)*T+x0;
    y=0.5*g*T*T+speed*Math.sin(-angle*Math.PI/180.)*T+y0;
}
function draw(){
    
    // const fruit = document.createElement('div');
    // fruit.classList.add('fruit');
    // fruit.style.backgroundImage = `url(${fruitImages[Math.floor(random(0, fruitImages.length))]})`;
    // drawing.clearRect(0,0, canvas.width, canvas.height)
    // // drawing.beginPath();
    // const img= new Image;
    // img.src="./fruits/strawberry.png";
    // img.classList.add('fruit');
    // let picSize = Math.min(window.innerWidth, window.innerHeight)/5;
    // console.log(picSize);
    // var space = window.innerHeight - img.offsetTop + img.offsetHeight;
    // drawing.drawImage(img,x,y,picSize,picSize); 
    // setTimeout(() => {
    //     canvas.delete(img);
    //  }, 10);

    // console.log(hmax);
    drawing.clearRect(0,0, canvas.width, canvas.height)
    drawing.beginPath();
    // Reuse the same image object
    let picSize = Math.min(window.innerWidth, window.innerHeight)/5;
    console.log(picSize);
    
    // console.log(space);
    drawing.drawImage(img,x,y,picSize,picSize);
}


// Get elemenets of class "inside"
const loadingPageTexts = document.getElementsByClassName('inside');
console.log(loadingPageTexts);
