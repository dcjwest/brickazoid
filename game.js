import { resizeCanvas, canvasWidth, canvasHeight } from "./components/canvasDimensions.js";
import { drawBall, setBallStartPosition, updateBall, ballOutOfBounds } from "./components/ball.js";
import { drawBat, setBatStartPosition, updateBat } from "./components/bat.js";
import { drawBricks, brickTotal } from "./components/bricks.js";

let score = 0;
let livesLeft = 3;
let gamePaused = true;
let gameOver = false;

const gameScreen = document.querySelector(".game-screen");
const ctx = document.querySelector("canvas").getContext("2d");
const livesDisplay = gameScreen.querySelector("#lives");
const scoreDisplay = gameScreen.querySelector("#score");
const startMsg = gameScreen.querySelector(".msg");

// Main game loop function to trigger updating/drawing of game elements on canvas.
function main() {
    if (gamePaused) return;

    if (gameOver) {
        if (confirm("GAME OVER. Click okay to restart.")) window.location = "/";
        else {
            gameScreen.removeEventListener("click", togglePause);
            window.removeEventListener("keypress", spacebarToggle);
        }
        return;
    }

    if (brickTotal === 0) {
        if (confirm("YOU WON!. Click okay to play again.")) window.location = "/";
        else {
            gameScreen.removeEventListener("click", togglePause);
            window.removeEventListener("keypress", spacebarToggle);
        }
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

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBricks(ctx);
    drawBat(ctx);
    drawBall(ctx);
}

export function updateScore() {
    score += 5;
    scoreDisplay.textContent = score < 10? `00${score}`: score < 100? `0${score}` : score;
}

function checkDeath() {
    if(ballOutOfBounds()) {
        if (livesLeft === 0) {
            gameOver = true;
            return;
        }
        else {
            livesLeft--;
            togglePause();
            setBallStartPosition();
            setBatStartPosition();
            init();
        }
    }
}

function init() {
    resizeCanvas();
    draw();
    livesDisplay.textContent = livesLeft < 10? `0${livesLeft}`:livesLeft;
    scoreDisplay.textContent = score < 10? `00${score}`: score < 100? `0${score}` : score;
}

function togglePause() {
    if(gamePaused) {
        startMsg.style.opacity = 0;
        gamePaused = false;
        window.requestAnimationFrame(main);
    }
    else {
        startMsg.style.opacity = 1;
        gamePaused = true;
        window.cancelAnimationFrame(main);
    }
}

function spacebarToggle(e) {
    if (e.code == "Space") togglePause();
}

window.onload = () => init();
gameScreen.addEventListener("click", togglePause);
window.addEventListener("keypress", spacebarToggle);
window.addEventListener("resize", resizeCanvas);