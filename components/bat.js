import { canvasWidth, canvasHeight } from "./canvasDimensions.js";

const BAT_HEIGHT = 0.03*canvasHeight;
const BAT_WIDTH = 5*BAT_HEIGHT;
export const batSize = { width: BAT_WIDTH, height: BAT_HEIGHT };

// Bat's initial position.
export let batXCoord = (canvasWidth / 2) - 0.5*BAT_WIDTH;
export let batYCoord = canvasHeight - 2*BAT_HEIGHT;

// Handle keyboard arrow key presses.
let rightPressed = false;
let leftPressed = false;

// Reset bat's position after ball falls out of bounds.
export function setBatStartPosition() {
    batXCoord = (canvasWidth / 2) - 0.5*BAT_WIDTH;
    batYCoord = canvasHeight - 2*BAT_HEIGHT;
}

export function updateBat() {
    if (leftPressed && batXCoord > 0) batXCoord -= 10;
    if (rightPressed && batXCoord < canvasWidth - BAT_WIDTH) batXCoord += 10;
}

export function drawBat(ctx) {
    let batImage = new Image();
    batImage.src = "./images/bats/bat_orange.png";
    batImage.onload = () => ctx.drawImage(batImage, batXCoord, batYCoord, BAT_WIDTH, BAT_HEIGHT);
    ctx.drawImage(batImage, batXCoord, batYCoord, BAT_WIDTH, BAT_HEIGHT);
}

export function handleMouseControl(e) {
    let canvasBounding = document.querySelector('canvas').getBoundingClientRect();
    let mouseXCoord = e.clientX - canvasBounding.left;

    if (mouseXCoord >= 0 && mouseXCoord < canvasWidth) batXCoord = mouseXCoord - 0.5*BAT_WIDTH;
}

window.addEventListener("keydown", e => {
    if (e.code == "ArrowLeft") leftPressed = true;
    if (e.code == "ArrowRight") rightPressed = true;
});

window.addEventListener("keyup", e => {
    if (e.code == "ArrowLeft") leftPressed = false;
    if (e.code == "ArrowRight") rightPressed = false;
});
