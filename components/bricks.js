import { canvasWidth } from "./canvasDimensions.js";

export let brickRowCount = 6;
export let brickColumnCount = 10;
export let brickWidth = canvasWidth / (brickColumnCount + 0.5); // Half brickWidth will be used for padding and left offset.
export let brickHeight = 0.5 * brickWidth;
export let brickWall = [];

let brickPadding = 0.5 * brickWidth / 10; // Gap between each brick.
let brickOffsetLeft = brickPadding; // Gap between bricks and canvas left wall.
let brickOffsetTop = 2 * brickWidth; // Gap between bricks and  canvas top wall.

const brickColors = [
    { path: "./images/bricks/brick_silver.png" },
    { path: "./images/bricks/brick_red.png" },
    { path: "./images/bricks/brick_yellow.png" },
    { path: "./images/bricks/brick_green.png" },
    { path: "./images/bricks/brick_blue.png" },
    { path: "./images/bricks/brick_pink.png" }
];

// Initialise array of bricks.
export function initBricks() {
    for (let r = 0; r < brickRowCount; r++) {
        brickWall[r] = [];
        for (let c = 0; c < brickColumnCount; c++) {
            brickWall[r][c] = { x: 0, y: 0, status: 1 };
            if (r === 0) brickWall[r][c].durable = true; // Make final row harder to break through.
        }
    }
}

initBricks();

// Calculate number of unbroken bricks left.
export function getBrickTotal() {
    let brickTotal = 0;
    for (let r = 0; r < brickRowCount; r++) {
        brickTotal += brickWall[r].filter(brick => brick.status === 1).length;
    }
    return brickTotal;
}

export function drawBricks(ctx) {
    for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < brickColumnCount; c++) {
            if (brickWall[r][c].status === 1) {
                let brickXCoord = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickYCoord = r * (brickHeight + brickPadding) + brickOffsetTop;
                brickWall[r][c].x = brickXCoord;
                brickWall[r][c].y = brickYCoord;

                let brickImage = new Image();
                brickImage.src = brickColors[r].path;
                
                if (brickWall[r][c].hasOwnProperty("durable")) {
                    if (!brickWall[r][c].durable) brickImage.src ="./images/bricks/brick_silver_cracked.png";
                }

                brickImage.onload = () => ctx.drawImage(brickImage, brickXCoord, brickYCoord, brickWidth, brickHeight);
                ctx.drawImage(brickImage, brickXCoord, brickYCoord, brickWidth, brickHeight);
            }
        }
    }
}

export function removeBrick(rowIndex, columnIndex) {
    if (brickWall[rowIndex][columnIndex].durable) {
        brickWall[rowIndex][columnIndex].durable = false;
    }
    else {
        brickWall[rowIndex][columnIndex].status = 0;
    }
}
