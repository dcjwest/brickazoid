import { drawBall, updateBall } from "./components/ball.js";

let gamePaused = true;
let livesLeft = 3;

const gameScreen = document.querySelector(".game-screen");
const canvas = gameScreen.querySelector("canvas");
const ctx = canvas.getContext("2d");
const livesDisplay = gameScreen.querySelector("#lives");

// Main game loop function to trigger updating/drawing of game elements on canvas.
function main() {
    if(gamePaused) return;

    window.requestAnimationFrame(main);

    update();
    draw();
}

/* Note: Canvas element's actual (drawing buffer) dimensions can differ compared to its dimensions displayed on different screens.
    This is due to the browser stretching the canvas to fit the display. This function ensures that the two values are always equal. */
function resizeCanvas() {
    let displayWidth = canvas.clientWidth;
    let displayHeight = canvas.clientHeight;

    if (canvas.width != displayWidth || canvas.height != displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}

function update() {
    updateBall();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ctx);
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
window.addEventListener("resize", init);
gameScreen.addEventListener("click", togglePause);
