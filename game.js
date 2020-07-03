import { resizeCanvas, canvasWidth, canvasHeight } from "./components/canvasDimensions.js";
import { drawBall, setBallStartPosition, setBallSpeed, updateBall, ballOutOfBounds } from "./components/ball.js";
import { drawBat, setBatStartPosition, updateBat, handleMouseControl } from "./components/bat.js";
import { initBricks, drawBricks, getBrickTotal } from "./components/bricks.js";

// Game state variables
let score = 0;
let livesLeft = 3;
let gamePaused = true;
let gameOver = false;

// Target DOM elements
/* Main Menu Screen */
const mainMenu = document.querySelector(".main-menu");
const mainOptions = mainMenu.querySelector(".main-options");
const startBtn = mainOptions.querySelector("#start-btn");
const levelOptions = mainMenu.querySelector(".level-options");
const levelReturnBtn = levelOptions.querySelector("#level-return-btn");
const howToPlayBtn = mainOptions.querySelector("#howtoplay-btn");
const overviewScreen = mainMenu.querySelector(".overview");
const closeOverviewBtn = overviewScreen.querySelector(".close-modal");

/* In-game Screen */
const gameScreen = document.querySelector(".game-screen");
const ctx = document.querySelector("canvas").getContext("2d");
const livesDisplay = gameScreen.querySelector("#lives");
const scoreDisplay = gameScreen.querySelector("#score");
const startMsg = gameScreen.querySelector(".msg");

/* Post-game Screen */
const gameOverScreen = document.querySelector("#gameover-screen");
const restartBtn = gameOverScreen.querySelector("#restart");
const exitBtn = gameOverScreen.querySelector("#exit");

// Main game loop function to trigger updating/drawing of game elements on canvas.
function main() {
    if (gamePaused) return;

    if (gameOver) {
        gameOverScreen.classList = "lose";
        gameOverScreen.querySelector("#result").textContent = "game over!";
        return;
    }

    if (getBrickTotal() === 0) {
        gameOverScreen.classList = "win";
        gameOverScreen.querySelector("#result").textContent = "you won!";
        return;
    }

    window.requestAnimationFrame(main);
    update();
    draw();
}

function update() {
    updateBat();
    updateBall();
    checkDeath();
}

export function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBricks(ctx);
    drawBat(ctx);
    drawBall(ctx);
}

export function updateScore(points = 0) {
    score += points;
    scoreDisplay.textContent = (
        score < 10? `0000${score}`:
        score < 100? `000${score}`:
        score < 1000? `00${score}`:
        score < 10000? `0${score}`:
        score
    );
}

function checkDeath() {
    if(ballOutOfBounds()) {
        if (livesLeft === 0) {
            gameOver = true;
            return;
        }
        
        livesLeft--;
        togglePause();
        init();
    }
}

// Initialise game after a state change, e.g. after losing a life.
function init() {
    resizeCanvas();
    setBallStartPosition();
    setBatStartPosition();
    draw();
    updateScore();
    livesDisplay.textContent = livesLeft < 10? `0${livesLeft}`:livesLeft;
}

function reset() {
    gameOver = false;
    livesLeft = 3;
    score = 0;
    togglePause();
    initBricks();
    init();
}

function startGame() {
    mainMenu.classList.add("hide");
    gameScreen.classList.add("playmode");
}

function backToMainMenu() {
    mainMenu.classList.remove("hide");
    gameScreen.classList.remove("playmode");
    setTimeout(reset, 500);
}

// Hide/show level selector.
function toggleLevelOptions() {
    mainOptions.classList.toggle("hide");
    levelOptions.classList.toggle("hide");

    let levelOptionBtns = [...levelOptions.children].filter(btn => btn.classList.contains("level-btn"));

    if (levelOptions.classList.contains("hide")) {
        levelOptionBtns.forEach(btn => btn.removeEventListener("click", setDifficultyLevel));
    }
    else {
        levelOptionBtns.forEach(btn => btn.addEventListener("click", setDifficultyLevel));
    }
}

// Select game difficulty by ultimately setting ball speed.
function setDifficultyLevel(e) {
    const selectedLevel = e.target.dataset.level;
    let ballSpeed;

    switch(selectedLevel) {
        case "ninja":
            ballSpeed = 15;
            break;
        case "hard":
            ballSpeed = 12;
            break;
        default:
            ballSpeed = 7;
            break;
    }
    setBallSpeed(ballSpeed);
    toggleLevelOptions();
    startGame();
}

// Hide/show how to play instructions.
function toggleHowToPlay() {
    overviewScreen.classList.toggle("hide");
}

function togglePause() {
    if(gamePaused) {
        startMsg.style.opacity = 0;
        gamePaused = false;
        window.requestAnimationFrame(main);
        window.addEventListener("mousemove", handleMouseControl);
    }
    else {
        startMsg.style.opacity = 1;
        gamePaused = true;
        window.cancelAnimationFrame(main);
        window.removeEventListener("mousemove", handleMouseControl);
    }
}

function spacebarToggle(e) {
    if (e.code == "Space") togglePause();
}

window.onload = () => {
    const app = document.querySelector("#app");
    const loader = document.querySelector("#loader");
    loader.firstElementChild.style.visibility = "visible"; // Loader bricks initially hidden to allow smoother entry into view.

    init();

    setTimeout(() => {
        loader.classList.add("loaded");
        app.classList.add("show");
    }, 3000);

} 
startBtn.addEventListener("click", toggleLevelOptions);
levelReturnBtn.addEventListener("click", toggleLevelOptions);
howToPlayBtn.addEventListener("click", toggleHowToPlay);
closeOverviewBtn.addEventListener("click", toggleHowToPlay);
gameScreen.addEventListener("click", togglePause);
window.addEventListener("keypress", spacebarToggle);
window.addEventListener("resize", () => {
    resizeCanvas();
    draw();
});
restartBtn.addEventListener("click", () => {
    gameOverScreen.classList = "hide";
    reset();
});
exitBtn.addEventListener("click", () => {
    gameOverScreen.classList = "hide";
    backToMainMenu();
});
