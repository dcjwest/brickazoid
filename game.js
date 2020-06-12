import { resizeCanvas, canvasWidth, canvasHeight } from "./components/canvasDimensions.js";
import { drawBall, updateBall, ballOutOfBounds } from "./components/ball.js";
import { drawBat, updateBat } from "./components/bat.js";
import { drawBricks, updateBricks } from "./components/bricks.js";

let livesLeft = 3;
let gamePaused = true;
let gameOver = false;

const gameScreen = document.querySelector(".game-screen");

const ctx = document.querySelector("canvas").getContext("2d");
const livesDisplay = gameScreen.querySelector("#lives");

// Main game loop function to trigger updating/drawing of game elements on canvas.
function main() {
    if (gamePaused) return;

    if (gameOver) {
        if (confirm("GAME OVER. Click okay to restart.")) window.location = "/";
        return;
    }

    window.requestAnimationFrame(main);

    update();
    draw();
}

function update() {
    updateBricks();
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

function checkDeath() {
    gameOver = ballOutOfBounds();
}

function init() {
    resizeCanvas();
    draw();
    livesDisplay.textContent = `0${livesLeft}`;
}

function togglePause() {
    if(gamePaused) {
        gamePaused = false;
        window.requestAnimationFrame(main);
    }
    else {
        gamePaused = true;
        window.cancelAnimationFrame(main);
    }
}

window.onload = () => init();
gameScreen.addEventListener("click", togglePause);
window.addEventListener("resize", resizeCanvas);