const canvas = document.querySelector("canvas");
export let canvasWidth = canvas.clientWidth;
export let canvasHeight = canvas.clientHeight;

/* Note: Canvas element's actual (drawing buffer) dimensions can differ compared to its dimensions displayed on different screens.
    This is due to the browser stretching the canvas to fit the display. This function ensures that the two values are always equal. */
    export function resizeCanvas() {
        let displayWidth = canvas.clientWidth;
        let displayHeight = canvas.clientHeight;
    
        if (canvas.width != displayWidth || canvas.height != displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;

            // Also update global canvas dimensions.
            canvasWidth = displayWidth;
            canvasHeight = displayHeight;
        }
    }
