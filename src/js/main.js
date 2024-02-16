const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;
// ctx.fillStyle = "blue";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// Number of "M" lines (8 in this case)
const numLines = 8;

// Point coordinates (initially in the center)
const points = [];
const centerX = width / 2;
const centerY = height / 2;
const radius = Math.min(centerX, centerY) / 2; // Ensure radius fits within canvas
for (let i = 0; i < numLines; i++) {
  const angle = (i / numLines) * Math.PI * 2;
  points.push({
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
    angle: angle,
  });
}

// Animation speed (lower is faster)
const animationSpeed = 1;

// Movement direction and magnitude
const maxMovement = 5; // Maximum distance each point can move per frame
const directionChangeFrequency = 1000; // How often directions change (higher is more frequent)
let moveDirections = [];
for (let i = 0; i < numLines; i++) {
  moveDirections.push({
    x: (Math.random() - 0.5) * 2, // Random initial x direction (-1 to 1)
    y: (Math.random() - 0.5) * 2, // Random initial y direction (-1 to 1)
  });
}
let directionChangeCounter = 0;

function drawPolygon() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "darkslateblue";
//   ctx.strokeStyle = "white";
  ctx.lineWidth = 16;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const point = points[i];
    if (i === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  ctx.closePath();
  ctx.stroke();
}

function updatePoints() {
  for (let i = 0; i < numLines; i++) {
    // Update angle
    points[i].angle += animationSpeed;

    // Update position based on direction and speed
    points[i].x += moveDirections[i].x * maxMovement;
    points[i].y += moveDirections[i].y * maxMovement;

    // Handle edge collision (bounce)
    if (points[i].x < 0 || points[i].x > width) {
      moveDirections[i].x *= -1;
    }
    if (points[i].y < 0 || points[i].y > height) {
      moveDirections[i].y *= -1;
    }
  }

  // Randomly change direction at intervals
  directionChangeCounter++;
  if (directionChangeCounter >= directionChangeFrequency) {
    for (let i = 0; i < numLines; i++) {
      moveDirections[i].x = (Math.random() - 0.5) * 2;
      moveDirections[i].y = (Math.random() - 0.5) * 2;
    }
    directionChangeCounter = 0;
  }
}

function animate() {
  requestAnimationFrame(animate);
  updatePoints();
  drawPolygon();
}

animate();
