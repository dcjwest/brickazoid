const staticCanvas = document.querySelector('#static-canvas');
const dynamicCanvas = document.querySelector('#dynamic-canvas');

export let canvasWidth = staticCanvas.clientWidth;
export let canvasHeight = staticCanvas.clientHeight;

/* Note: Canvas element's actual (drawing buffer) dimensions can differ compared to its dimensions displayed on different screens.
    This is due to the browser stretching the canvas to fit the display. This function ensures that the two values are always equal. */
export function resizeCanvas() {
    let displayWidth = staticCanvas.clientWidth;
    let displayHeight = staticCanvas.clientHeight;

    if (
        staticCanvas.width != displayWidth ||
        staticCanvas.height != displayHeight
    ) {
        staticCanvas.width = displayWidth;
        staticCanvas.height = displayHeight;
        dynamicCanvas.width = displayWidth;
        dynamicCanvas.height = displayHeight;

        // Also update global canvas dimensions.
        canvasWidth = displayWidth;
        canvasHeight = displayHeight;
    }
}
