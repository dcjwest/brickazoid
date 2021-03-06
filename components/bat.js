import { canvasWidth, canvasHeight } from './canvasDimensions.js';
import { ballSpeed } from './ball.js';
const dynamicCanvas = document.querySelector('#dynamic-canvas');
const canvasBounding = dynamicCanvas.getBoundingClientRect();

const BAT_HEIGHT = 0.03 * canvasHeight;
const BAT_WIDTH = 5 * BAT_HEIGHT;
export const BAT_SIZE = { width: BAT_WIDTH, height: BAT_HEIGHT };

// Bat's initial position.
export let batXCoord = canvasWidth / 2 - 0.5 * BAT_WIDTH;
export let batYCoord = canvasHeight - 2 * BAT_HEIGHT;

// Variables to check keyboard arrow key presses.
let rightPressed = false;
let leftPressed = false;

// Reset bat's position after ball falls out of bounds.
export function setBatStartPosition() {
    batXCoord = canvasWidth / 2 - 0.5 * BAT_WIDTH;
    batYCoord = canvasHeight - 2 * BAT_HEIGHT;
}

// Handle bat's movement when controlled with keyboard arrows.
export function updateBat() {
    let batSpeed = ballSpeed >= 9 ? 9 : 5;
    if (leftPressed && batXCoord > 0) batXCoord -= batSpeed;
    if (rightPressed && batXCoord < canvasWidth - BAT_WIDTH)
        batXCoord += batSpeed;
}

export function drawBat(ctx) {
    let batImage = new Image();
    batImage.src = './images/bat.png';
    batImage.onload = () =>
        ctx.drawImage(batImage, batXCoord, batYCoord, BAT_WIDTH, BAT_HEIGHT);
    ctx.drawImage(batImage, batXCoord, batYCoord, BAT_WIDTH, BAT_HEIGHT);
}

// Handle bat's movement when controlled with mouse.
export function handleMouseControl(e) {
    let mouseXCoord = e.clientX - canvasBounding.left;
    // Confine mouse movement of bat within canvas walls.
    if (mouseXCoord >= 0 && mouseXCoord < canvasWidth)
        batXCoord = mouseXCoord - 0.5 * BAT_WIDTH;
}

// Handle bat's movement for touch-compatible devices.
export function handleTouchControl(e) {
    let touch = e.changedTouches[0];
    let touchXCoord = touch.clientX - canvasBounding.left;
    // Confine touch movement of bat within canvas walls.
    if (touchXCoord >= 0 && touchXCoord < canvasWidth)
        batXCoord = touchXCoord - 0.5 * BAT_WIDTH;
}

window.addEventListener('keydown', e => {
    if (e.code == 'ArrowLeft') leftPressed = true;
    if (e.code == 'ArrowRight') rightPressed = true;
});

window.addEventListener('keyup', e => {
    if (e.code == 'ArrowLeft') leftPressed = false;
    if (e.code == 'ArrowRight') rightPressed = false;
});
