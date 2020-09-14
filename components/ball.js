import { canvasWidth, canvasHeight } from './canvasDimensions.js';
import {
    brickWall,
    brickRowCount,
    brickColumnCount,
    brickWidth,
    brickHeight,
    removeBrick,
} from './bricks.js';
import { BAT_SIZE, batXCoord, batYCoord } from './bat.js';
import { updateScore } from '../game.js';

const BALL_RADIUS = 0.012 * canvasHeight;
const BALL_SIZE = 2 * BALL_RADIUS;
let ballSpeed = 5; // Default ball speed set on easy level.

// Ball's initial position.
let ballXCoord = canvasWidth / 2 - BALL_RADIUS;
let ballYCoord = batYCoord - BALL_SIZE;
let firstLaunch = true; // Determines whether ball is starting from rest.

let ball_dx = ballSpeed; // Rate of change in ball's X position.
let ball_dy = -ballSpeed; // Rate of change in ball's Y position.

// Reset ball's position after falling out of bounds.
export function setBallStartPosition() {
    ballXCoord = canvasWidth / 2 - BALL_RADIUS;
    ballYCoord = batYCoord - BALL_SIZE;
    ball_dy = -ballSpeed;
    firstLaunch = true;
}

export function setBallSpeed(speed = 5) {
    ballSpeed = speed;
    ball_dx = ballSpeed;
    ball_dy = -ballSpeed;
}

export function updateBall() {
    detectBrickCollision();
    // Reverse ball's X direction if it collides with left/right wall.
    if (
        ballXCoord + ball_dx < 0 ||
        ballXCoord + ball_dx > canvasWidth - BALL_SIZE
    ) {
        if (!firstLaunch) {
            ball_dx = ball_dx < 0 ? -ballSpeed : ballSpeed;
        }
        ball_dx = -ball_dx;
    }

    // Reverse ball's Y direction if it collides with ceiling.
    if (ballYCoord + ball_dy < 0) ball_dy = -ball_dy;

    /* Reverse ball's Y direction if it collides with the bat. First check if ball's X position falls within the bounds
        of the bat. Secondly, check if increasing ball's Y position collides it with the top edge of bat. */
    if (
        ballXCoord > batXCoord &&
        ballXCoord < batXCoord + BAT_SIZE.width &&
        ballYCoord + ball_dy > batYCoord - BALL_SIZE &&
        ballYCoord + ball_dy < batYCoord + BAT_SIZE.height
    ) {
        ball_dy = -ball_dy;
    }

    // Vary initial launch angle by randomising ball's X rate of change and direction.
    if (firstLaunch) {
        let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        ball_dx =
            plusOrMinus * (Math.random() * 0.3 * ballSpeed + 0.3 * ballSpeed);
        firstLaunch = false;
    }

    ballXCoord += ball_dx;
    ballYCoord += ball_dy;
}

export function drawBall(ctx) {
    let ballImage = new Image();
    ballImage.src = './images/ball.png';
    ballImage.onload = () =>
        ctx.drawImage(ballImage, ballXCoord, ballYCoord, BALL_SIZE, BALL_SIZE);
    ctx.drawImage(ballImage, ballXCoord, ballYCoord, BALL_SIZE, BALL_SIZE);
}

export function ballOutOfBounds() {
    return ballYCoord + ball_dy > canvasHeight;
}

function detectBrickCollision() {
    for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < brickColumnCount; c++) {
            let currentBrick = brickWall[r][c];

            if (currentBrick.status === 1) {
                if (
                    ballXCoord >= currentBrick.x &&
                    ballXCoord <= currentBrick.x + brickWidth &&
                    ballYCoord >= currentBrick.y - BALL_RADIUS &&
                    ballYCoord <= currentBrick.y + brickHeight + BALL_RADIUS
                ) {
                    if (!currentBrick.durable) updateScore(10);
                    removeBrick(r, c);
                    ball_dy = -ball_dy;
                }
            }
        }
    }
}
