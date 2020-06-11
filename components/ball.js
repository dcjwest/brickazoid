const BALL_RADIUS = 8;
const BALL_SPEED = 5;

let canvasWidth = document.querySelector("canvas").clientWidth;
let canvasHeight = document.querySelector("canvas").clientHeight;

// Ball's initial position.
let ballXCoord = canvasWidth / 2;
let ballYCoord = canvasHeight - BALL_RADIUS;
let firstLaunch = true; // Determines whether ball is starting from rest.

let ball_dx = BALL_SPEED; // Rate of change in ball's X position.
let ball_dy = -BALL_SPEED; // Rate of change in ball's Y position.

export function updateBall() {
    // Confirm canvas dimensions in case of screen/browser window resize.
    canvasWidth = document.querySelector("canvas").clientWidth;
    canvasHeight = document.querySelector("canvas").clientHeight;

    // Reverse ball's X direction if it collides with left/right wall.
    if (ballXCoord + ball_dx < BALL_RADIUS || ballXCoord + ball_dx > canvasWidth - BALL_RADIUS) {
        ball_dx = -ball_dx;
    }
    // Reverse ball's X direction if it collides with ceiling/ground.
    if (ballYCoord + ball_dy < BALL_RADIUS || ballYCoord + ball_dy > canvasHeight - BALL_RADIUS) {
        ball_dy = -ball_dy;
    }

    // TO DO: Vary initial launch angle by randomising ball's X rate of change and direction.
    // if (firstLaunch) {
    //     let plusOrMinus = Math.random() < 0.5? -1 : 1;
    //     ball_dx = plusOrMinus * (Math.random() * 0.15*BALL_SPEED + 0.15*BALL_SPEED);

    //     ballXCoord += ball_dx
    //     ballYCoord += ball_dy;

    //     firstLaunch = false;
    // }
    
    ballXCoord += ball_dx;
    ballYCoord += ball_dy;
}

export function drawBall(ctx) {
    let ballGradient = ctx.createRadialGradient(ballXCoord, ballYCoord, 0.1*BALL_RADIUS, ballXCoord, ballYCoord, 1.1*BALL_RADIUS);
    ballGradient.addColorStop(0, "#fff");
    ballGradient.addColorStop(1, "#555");
    
    ctx.beginPath();
    ctx.arc(ballXCoord, ballYCoord, BALL_RADIUS, 0, Math.PI*2 );
    ctx.fillStyle = ballGradient;
    ctx.fill();
    ctx.closePath();
}
