import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const auth = getAuth(app);

// var to store last highest score
let lastHighestScore = 0;
// var to store current game score
let currentScore = 0;

let lastClickTime = 0;
const doubleClickDelay = 300; 

lastHighestScore = localStorage.getItem('highestScore');
if(lastHighestScore === null) {
    lastHighestScore = 0;
}
document.querySelector('.highscore').innerHTML = lastHighestScore;
console.log(`Last Highest Score: ${lastHighestScore}`);
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
// Define fruit paths
const fruitPaths = [
    "./fruits/bananas.png",
    "./fruits/lemon.png",
    "./fruits/pineapple.png",
    "./fruits/watermelon.png",
    "./fruits/strawberry.png",
    "./fruits/apple.png",
    "./fruits/boom2.png"
];

// fruits and blast image
// Preload images
const allfruits = [];

function preloadImages() {
    let loadedImages = 0;
    
    return new Promise((resolve, reject) => {
        fruitPaths.forEach((path, index) => {
            const img = new Image();
            
            img.onload = () => {
                allfruits[index] = img;
                loadedImages++;
                if (loadedImages === fruitPaths.length) {
                    resolve();
                }
            };
            
            img.onerror = () => {
                console.error(`Failed to load image: ${path}`);
                reject(`Failed to load image: ${path}`);
            };
            
            img.src = path;
        });
    });
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
async function startGame() {
    try {
        await preloadImages();
        canvas = document.createElement('canvas');
        canvas.id = 'canvas';
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
    canvas.addEventListener("click", onCanvasClick);
} catch (error) {
    console.error('Failed to start game:', error);
}
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
    
    // if((y>=y0 && x!=x0) || (continousFailures >= 3) || img.src.includes('boom')){
    if((y>=y0 && x!=x0) || (continousFailures >= 3) ){
        // if(y>=y0 && x!=x0){
        continousFailures++;
        drawing.clearRect(0,0, canvas.width, canvas.height);
        //}

        // if(img.src.includes('boom')) {
            
        //     setTimeout(() => {canvas.addEventListener('click', onCanvasClick);}, 3000);
       
        //     document.querySelector('.score').innerHTML = currentScore;
        //     setTimeout(() => {canvas.remove();}, 6000);
        //     setTimeout(() => {return;}, 9000);
        // }

        if(continousFailures >= 3) {
            // remove the canvas element from the body
            canvas.remove();
            console.log("Game score: ", currentScore);
            
            document.querySelector('.score').innerHTML = currentScore;

            const ExitPage = document.getElementById('game-over-page');
            ExitPage.style.display = 'block';
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

    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    event.preventDefault();
    if (timeDiff < doubleClickDelay) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const picSize = Math.min(window.innerWidth, window.innerHeight) / 5;

    console.log(`MouseX: ${mouseX}, MouseY: ${mouseY}`);
    console.log(`ImageX: ${x}, ImageY: ${y}, ImageSize: ${picSize}`);

    // Check if the click is within the bounds of the fruit image
    if (mouseX >= x && mouseX <= x + picSize && mouseY >= y && mouseY <= y + picSize) {
        animationRunning = false; // Stop the animation
        
        continousFailures = 0;
        
        console.log("Fruit clicked!");
        drawing.clearRect(0,0, canvas.width, canvas.height);

        let currentFrame = 0;
        const animateBlast = () => {
            // if(img.src.includes('boom')) {
            //     if (currentFrame >= blastImages.length) {
            //         drawing.clearRect(0, 0, canvas.width, canvas.height);
            //         canvas.remove();
            //         return;
            //     }
                
            //     document.querySelector('.score').innerHTML = currentScore;
            //     canvas.remove();
            //     return;
            // }

            if (currentFrame >= blastImages.length) {
                drawing.clearRect(0, 0, canvas.width, canvas.height);
                reinitializeGame();
                return;
            }

            drawing.clearRect(0, 0, canvas.width, canvas.height);
            const picSize = Math.min(window.innerWidth, window.innerHeight)/5;
            drawing.drawImage(blastImages[currentFrame], x, y, 1.3*picSize, 1.3*picSize);
            currentFrame++;
            setTimeout(animateBlast, 8);
        };

        animateBlast();

        setTimeout(() => {
            if(img.src.includes('boom') && animationRunning == false) {
       
            document.querySelector('.score').innerHTML = currentScore;
            canvas.remove();
            return;
        }}, 200); 

        // inc score

        currentScore+=10;
        lastHighestScore = Math.max(lastHighestScore, currentScore);
        localStorage.setItem('highestScore', lastHighestScore);

        // update the score
        document.querySelector('.score').innerHTML = currentScore;
        document.querySelector('.highscore').innerHTML = lastHighestScore;
    }
}
lastClickTime = currentTime;
}

const loadingPageTexts = document.getElementsByClassName('inside');
const signUp_LoginPageTexts = document.getElementsByClassName('nav_item');

console.log(loadingPageTexts);
const playText = loadingPageTexts[0];
const playUnrated = loadingPageTexts[1];
const Cont = loadingPageTexts[3];
const sign_Up = signUp_LoginPageTexts[1];
const log_in = signUp_LoginPageTexts[0];
const back_button = document.getElementById('backbutton');
const create_account = document.getElementById('createAccount');
const enter= document.getElementById('login');

//add event listener - on click
playText.addEventListener('click', function() {
    console.log('playText clicked');
    //hide the loading page
    const loadingPage = document.getElementById('loading-page');
    loadingPage.style.display = 'none';

    
    //start the game
    // get the last highes score from local storage
    currentScore=0;
    document.querySelector('.score').innerHTML = currentScore;
   
    startGame();
});

playUnrated.addEventListener('click', function() {
    console.log('playUnrated clicked');
    //hide the loading page
    const loadingPage = document.getElementById('loading-page');
    loadingPage.style.display = 'none';
    const topscore = document.getElementById('High-sc');
    topscore.style.display = 'none';

    currentScore=0;
    document.querySelector('.score').innerHTML = currentScore;

    //start the game
    startGame();
})


Cont.addEventListener('click', function() {
    console.log('Cont clicked');
    //hide the loading page
    const loadingPage = document.getElementById('loading-page');
    loadingPage.style.display = 'block';
    const exitpage = document.getElementById('game-over-page');
    exitpage.style.display = 'none';
    const topscore = document.getElementById('High-sc');
    topscore.style.display = 'block';

    currentScore=0;

    document.querySelector('.score').innerHTML = currentScore;
})


sign_Up.addEventListener('click', function() {
    console.log('sign_Up clicked');
    //hide the loading page
    const loadingPage = document.getElementById('loading-page');
    loadingPage.style.display = 'none';
    const signup = document.getElementById('signup-page');
    signup.style.display = 'block';
    const nav = document.getElementById('Headers');
    nav.style.display = 'none';
    const back_button = document.getElementById('backbutton');
    back_button.style.display = 'block';
})

back_button.addEventListener('click', function() {
    console.log('back_button clicked');
    const back_button = document.getElementById('backbutton');
    back_button.style.display = 'none';
    const loadingPage = document.getElementById('loading-page');
    loadingPage.style.display = 'block';
    const signup = document.getElementById('signup-page');
    signup.style.display = 'none';
    const nav = document.getElementById('Headers');
    nav.style.display = 'flex'; 
    nav.style.position = 'fixed'; 
    nav.style.top = '0'; 
    nav.style.right = '0'; 
})

create_account.addEventListener('click', function() {
    //fetch the data of username, email and password
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });



})






