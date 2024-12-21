const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

// Fullscreen canvas setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.appendChild(canvas);

// Background image setup
const backgroundImage = new Image();
backgroundImage.src = "assets/gamescene.png"; // Replace with your actual background image path

// Player image setup
const playerImage = new Image();
playerImage.src = "assets/mc.png"; // Replace with your actual player image path

// Obstacle images setup
const obstacleJumpImage = new Image();
obstacleJumpImage.src = "assets/rock.png"; // Replace with your actual obstacle image for jump

const obstacleDuckImage = new Image();
obstacleDuckImage.src = "assets/bird.png"; // Replace with your actual obstacle image for duck

// Game variables
let scrollSpeed = 5; // Initial speed of scrolling
const obstacles = []; // Define the obstacles array to store obstacles
const player = {
  x: canvas.width * 0.2, // Player's X position (stationary horizontally)
  y: canvas.height * 0.8 - 180, // Player's initial Y position
  width: 150, // Player's width
  height: 180, // Player's height
  isJumping: false, // Player jump state
  isDucking: false, // Player duck state
  velocityY: 0, // Vertical velocity for jumping
  gravity: 0.8, // Gravity effect
  jumpHeight: -50, // Huge jump height (more negative = higher jump)
  speed: 5, // Speed of player movement
};

// Key press handlers
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Function to create obstacles
function createObstacle() {
  const type = Math.random() < 0.5 ? "jump" : "duck"; // Alternate obstacle type

  const obstacle = {
    x: canvas.width, // Start off-screen
    y: type === "jump" ? canvas.height * 0.8 - 100 : canvas.height * 0.8 - 250, // Adjusted height for jump and duck
    width: 100,
    height: type === "jump" ? 100 : 150,
    type: type,
    speed: 6, // Speed of obstacle movement
  };

  obstacles.push(obstacle);

  // Generate a new obstacle after a random delay
  setTimeout(createObstacle, Math.random() * 3000 + 2000); // 2-5 seconds
}

// Background image onload
backgroundImage.onload = () => {
  // Animation loop
  function draw(timestamp) {
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background to fill entire screen
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Handle player jumping
    if ((keys["ArrowUp"] || keys["w"]) && !player.isJumping) {
      player.isJumping = true;
      player.velocityY = player.jumpHeight;
    }

    // Apply gravity and update player's Y position
    player.y += player.velocityY;
    player.velocityY += player.gravity;

    // Prevent player from falling below ground level
    if (player.y > canvas.height * 0.8 - player.height) {
      player.y = canvas.height * 0.8 - player.height;
      player.isJumping = false;
    }

    // Handle player ducking
    if (keys["ArrowDown"] || keys["s"]) {
      player.isDucking = true;
      player.height = 100; // Shrink the player's height
    } else {
      player.isDucking = false;
      player.height = 180; // Reset to original height
    }

    // Handle player movement (left and right)
    if (keys["a"] || keys["ArrowLeft"]) {
      player.x -= player.speed; // Move left
    }
    if (keys["d"] || keys["ArrowRight"]) {
      player.x += player.speed; // Move right
    }

    // Prevent the player from going off-screen
    player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));

    // Draw the player
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Draw and update obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obstacle = obstacles[i];

      // Move obstacle to the left
      obstacle.x -= obstacle.speed;

      // Draw the obstacle
      if (obstacle.type === "jump") {
        ctx.drawImage(
          obstacleJumpImage,
          obstacle.x,
          obstacle.y,
          obstacle.width,
          obstacle.height
        );
      } else {
        ctx.drawImage(
          obstacleDuckImage,
          obstacle.x,
          obstacle.y,
          obstacle.width,
          obstacle.height
        );
      }

      // Remove obstacle if off-screen
      if (obstacle.x + obstacle.width < 0) {
        obstacles.splice(i, 1);
      }

      // Simple bounding box collision detection
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        // Collision detected
        alert("Game Over!");
        document.location.reload();
      }
    }

    requestAnimationFrame(draw); // Loop
  }

  createObstacle(); // Start obstacle generation
  draw(0); // Start the animation
};
