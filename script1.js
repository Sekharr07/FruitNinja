// var to store last highest score
let lastHighestScore = 0;
// var to store current game score
let currentScore = 0;
// function to generate random number between min and max
const random = (min, max) => Math.random() * (max - min) + min;
// game params
let drawing;
// T is the time elapsed since the start of the animation
let continousFailures = 0;
let T = 0;
let x0, x01, y0, y01, angle, speed,oldTimeStamp, secondsPassed, x, y;
var x1 = x01;
var y1 = y01;
let g = 0.007;
let animationRunning = true; // Flag to control animation state
let animationSpeed=600;
const fruitImages = [
    // "./fruits/bananas.png",
    // "./fruits/lemon.png",
    // "./fruits/pineapple.png",
    // "./fruits/watermelon.png",
    // "./fruits/strawberry.png",
    // "./fruits/apple.png",
    "./fruits/boom2.png"
];

// fruits and blast image
const allfruits = []
for(let i = 0; i < 6; i++) {
    const img = new Image();
    img.src = fruitImages[i];
    img.classList.add('fruit');
    allfruits.push(img);
}
let img;

// create an array of blast images ; eavh will be a new image object
const blastImages = [];
for(let i = 1; i < 26; i++) {
    const img = new Image();
    img.src = `./blast/blow (${i}).png`;
    img.classList.add('blast');
    blastImages.push(img);
}

let canvas;
// function to start the game
function startGame() {
    console.log('Game started');
    continousFailures = 0;
    // lcanvas= document.getElementById("canvas");
    // create canvas element and append to body
    canvas = document.createElement('canvas');
    // set canvas Id to canvas
    canvas.id = 'canvas';
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // append to body
    document.body.appendChild(canvas);
    drawing = canvas.getContext("2d");
    T = 0;
    y0 = canvas.height;
    y01 = canvas.height;
    angle = random(60, 85);
    speed = random(4.5,5.5);
    oldTimeStamp = new Date().getTime();
    secondsPassed = 0.0;
    x0 = random(0, window.innerWidth / 3);
    x01 = random(2 * window.innerWidth / 3, window.innerWidth);
    x = x0;
    y = y0;
    img = allfruits[Math.floor(random(0, allfruits.length))];
    // start aniamtion with current time stamp
    window.requestAnimationFrame(animationLoop);
    canvas.addEventListener('click', onCanvasClick);
}

function reinitializeGame() {
    console.log("New fruit is spawned");
    T = 0;
    y0 = canvas.height;
    y01 = canvas.height;
    angle = random(60, 85);
    speed = random(4.5,5.5);
    oldTimeStamp = new Date().getTime();
    secondsPassed = 0.0;
    x0 = random(0, window.innerWidth / 3);
    x01 = random(2 * window.innerWidth / 3, window.innerWidth);
    x = x0;
    y = y0;
    img = allfruits[Math.floor(random(0, allfruits.length))];
    console.log(img);
    animationRunning = true;
    // clear the canvas
    drawing.clearRect(0, 0, canvas.width, canvas.height);
    // start aniamtion with current time stamp
    window.requestAnimationFrame(animationLoop);
}

//`func to sloop the animation
function animationLoop() {
    const timeStamp = new Date().getTime();
    if (!animationRunning) return; // Stop animation if flag is false
    // ...existing animation code...
    secondsPassed=(timeStamp- oldTimeStamp)/1000;
    oldTimeStamp=timeStamp;
    update();
    draw();
    if((y>=y0 && x!=x0) || (continousFailures >= 3)){
        continousFailures++;
        drawing.clearRect(0,0, canvas.width, canvas.height);

        if(continousFailures >= 3) {
            // remove the canvas element from the body
            canvas.remove();
            console.log("Game score: ", currentScore);
            
            document.querySelector('.score').innerHTML = currentScore;
            return;
        }
        reinitializeGame();
    }else{
        window.requestAnimationFrame(animationLoop);
    }
}

// func to update the trajectory params
function update(){
    T+= animationSpeed*secondsPassed;
    x=speed*Math.cos(-angle*Math.PI/180.)*T+x0;
    y=0.5*g*T*T+speed*Math.sin(-angle*Math.PI/180.)*T+y0;
}

// func to draw the fruit image`during the animation
function draw(){
    drawing.clearRect(0,0, canvas.width, canvas.height)
    drawing.beginPath();
    // Reuse the same image object
    let picSize = Math.min(window.innerWidth, window.innerHeight)/5;
    console.log(picSize);
    // console.log(space);
    drawing.drawImage(img,x,y,picSize,picSize);
}

function onCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const picSize = Math.min(window.innerWidth, window.innerHeight) / 5;

    console.log(`MouseX: ${mouseX}, MouseY: ${mouseY}`);
    console.log(`ImageX: ${x}, ImageY: ${y}, ImageSize: ${picSize}`);

    // Check if the click is within the bounds of the fruit image
    if (mouseX >= x && mouseX <= x + picSize && mouseY >= y && mouseY <= y + picSize) {
        animationRunning = false; // Stop the animation
        // inc score
        continousFailures = 0;
        currentScore+=10;
        lastHighestScore = Math.max(lastHighestScore, currentScore);
        console.log("Fruit clicked!");
        drawing.clearRect(0,0, canvas.width, canvas.height);

        let currentFrame = 0;
        const animateBlast = () => {
            if (currentFrame >= blastImages.length) {
                drawing.clearRect(0, 0, canvas.width, canvas.height);
                reinitializeGame();
                return;
            }

            drawing.clearRect(0, 0, canvas.width, canvas.height);
            const picSize = Math.min(window.innerWidth, window.innerHeight)/5;
            drawing.drawImage(blastImages[currentFrame], x, y, 1.3*picSize, 1.3*picSize);
            currentFrame++;
            setTimeout(animateBlast, 10);
        };

        animateBlast();

        if(img.src.includes('boom')) {
            currentScore-=10;
            document.querySelector('.score').innerHTML = currentScore;
            canvas.remove();
        }

        // update the score
        document.querySelector('.score').innerHTML = currentScore;
    }
}

const loadingPageTexts = document.getElementsByClassName('inside');
console.log(loadingPageTexts);
const playText = loadingPageTexts[0];
//add event listener - on click
playText.addEventListener('click', function() {
    console.log('playText clicked');
    //hide the loading page
    const loadingPage = document.getElementById('loading-page');
    loadingPage.style.display = 'none';
    //start the game
    // get the last highes score from local storage
    lastHighestScore = localStorage.getItem('highestScore');
    if(lastHighestScore === null) {
        lastHighestScore = 0;
    }
    console.log(`Last Highest Score: ${lastHighestScore}`);
    startGame();
});





