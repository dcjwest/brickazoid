import { canvasWidth } from "./canvasDimensions.js";
let brickRowCount = 5;
let brickColumnCount = 10;
export let brickWidth = canvasWidth / (brickColumnCount + 0.5); // Half brickWidth will be used for padding and left offset.
export let brickHeight = 0.5 * brickWidth;
let brickPadding = 0.5 * brickWidth / 10;
let brickOffsetLeft = 0.5 * brickPadding;
let brickOffsetTop = 2*brickWidth;
let brickWall = [];
const brickColors = [
    { path: "./assets/images/bricks/brick_silver.png" },
    { path: "./assets/images/bricks/brick_red.png" },
    { path: "./assets/images/bricks/brick_yellow.png" },
    { path: "./assets/images/bricks/brick_green.png" },
    { path: "./assets/images/bricks/brick_violet.png" }
];

// Initialise bricks
for (let r = 0; r < brickRowCount; r++) {
    brickWall[r] = [];
    for (let c = 0; c < brickColumnCount; c++) {
        brickWall[r][c] = { x: 0, y: 0, status: 1 };
    }
}

export function updateBricks() {
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
                brickImage.onload = () => ctx.drawImage(brickImage, brickXCoord, brickYCoord, brickWidth, brickHeight);
                ctx.drawImage(brickImage, brickXCoord, brickYCoord, brickWidth, brickHeight);
            }
        }
    }
}

export function removeBrick(rowIndex, columnIndex) {
    brickWall[rowIndex][columnIndex].status = 0;
}

export { brickWall, brickRowCount, brickColumnCount }
