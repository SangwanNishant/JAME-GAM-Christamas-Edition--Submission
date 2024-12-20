const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// Fullscreen canvas setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.appendChild(canvas);

const backgroundImage = new Image();
backgroundImage.src = 'assets/goodbg.png';

let scrollSpeed = 1.5; // Speed of scrolling
let bgOffset = 0; // Horizontal scrolling offset

backgroundImage.onload = () => {
    const bgWidth = backgroundImage.width;
    const bgHeight = canvas.height; // Scale height to canvas

    // Animation loop
    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate how many tiles of the image are needed to fill the canvas
        const tiles = Math.ceil(canvas.width / bgWidth) + 2;

        // Draw tiles
        for (let i = 0; i < tiles; i++) {
            const x = -bgOffset + i * bgWidth;
            ctx.drawImage(backgroundImage, x, 0, bgWidth, bgHeight);
        }

        // Move the background
        bgOffset += scrollSpeed;

        // Reset bgOffset to prevent overflow
        if (bgOffset >= bgWidth) {
            bgOffset = 0;
        }

        requestAnimationFrame(draw); // Loop
    }

    draw(); // Start the animation
};
