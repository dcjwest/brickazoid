import './screens/menu.js';
import {
    resizeCanvas,
    canvasWidth,
    canvasHeight,
} from './components/canvasDimensions.js';
import {
    drawBall,
    setBallStartPosition,
    updateBall,
    ballOutOfBounds,
} from './components/ball.js';
import {
    drawBat,
    setBatStartPosition,
    updateBat,
    handleMouseControl,
    handleTouchControl,
} from './components/bat.js';
import { initBricks, drawBricks, getBrickTotal } from './components/bricks.js';

// Game state variables
let score = 0;
let livesLeft = 3;
let gamePaused = true;
let gameOver = false;

// Target DOM elements

/* In-game Screen */
const gameScreen = document.querySelector('.game-screen');
const dynamicCanvas = document.querySelector('#dynamic-canvas');
const dynamicCtx = dynamicCanvas.getContext('2d');
const livesDisplay = gameScreen.querySelector('#lives');
const scoreDisplay = gameScreen.querySelector('#score');
const startMsg = gameScreen.querySelector('.msg');

/* Post-game Screen */
const gameOverScreen = document.querySelector('#gameover-screen');
const restartBtn = gameOverScreen.querySelector('#restart');
const exitBtn = gameOverScreen.querySelector('#exit');

// Main game loop function to trigger updating/drawing of game elements on canvas.
function main() {
    if (gamePaused) return;

    if (gameOver) {
        gameOverScreen.classList = 'lose';
        gameOverScreen.querySelector('#result').textContent = 'game over!';
        return;
    }

    if (getBrickTotal() === 0) {
        gameOverScreen.classList = 'win';
        gameOverScreen.querySelector('#result').textContent = 'you won!';
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
    dynamicCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBat(dynamicCtx);
    drawBall(dynamicCtx);
}

export function updateScore(points = 0) {
    score += points;
    scoreDisplay.textContent =
        score < 10
            ? `0000${score}`
            : score < 100
            ? `000${score}`
            : score < 1000
            ? `00${score}`
            : score < 10000
            ? `0${score}`
            : score;
}

function checkDeath() {
    if (ballOutOfBounds()) {
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
    drawBricks();
    updateScore();
    livesDisplay.textContent = livesLeft < 10 ? `0${livesLeft}` : livesLeft;
}

function reset() {
    gameOver = false;
    livesLeft = 3;
    score = 0;
    togglePause();
    initBricks();
    init();
}

function backToMainMenu() {
    document.querySelector('.main-menu').classList.remove('hide');
    gameScreen.classList.remove('playmode');
    setTimeout(reset, 500);
}

function togglePause() {
    if (gamePaused) {
        startMsg.style.opacity = 0;
        gamePaused = false;
        window.requestAnimationFrame(main);
        window.addEventListener('mousemove', handleMouseControl);
        dynamicCanvas.addEventListener('touchmove', handleTouchControl);
    } else {
        startMsg.style.opacity = 1;
        gamePaused = true;
        window.cancelAnimationFrame(main);
        window.removeEventListener('mousemove', handleMouseControl);
        dynamicCanvas.removeEventListener('touchmove', handleTouchControl);
    }
}

function spacebarToggle(e) {
    if (e.code == 'Space') togglePause();
}

window.onload = () => {
    const app = document.querySelector('#app');
    const loader = document.querySelector('#loader');
    loader.firstElementChild.style.visibility = 'visible'; // Loader bricks initially hidden to allow smoother entry into view.

    init();

    setTimeout(() => {
        loader.classList.add('loaded');
        app.classList.add('show');
    }, 3000);
};

gameScreen.addEventListener('click', togglePause);
window.addEventListener('keypress', spacebarToggle);
window.addEventListener('resize', () => {
    resizeCanvas();
    draw();
});
restartBtn.addEventListener('click', () => {
    gameOverScreen.classList = 'hide';
    reset();
});
exitBtn.addEventListener('click', () => {
    gameOverScreen.classList = 'hide';
    backToMainMenu();
});
