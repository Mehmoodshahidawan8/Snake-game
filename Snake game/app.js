// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the size of the grid and the snake
const gridSize = 20;
let snake = [{ x: 9 * gridSize, y: 9 * gridSize }];
let direction = { x: 0, y: 0 };
let food = { x: 5 * gridSize, y: 5 * gridSize };
let score = 0;
let gameInterval;
let isGameRunning = false;

// Function to draw the snake
function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Function to move the snake
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Add the new head to the front of the snake
  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = score;
    generateFood(); // Generate new food
  } else {
    snake.pop(); // Remove the last segment of the snake
  }
}

// Function to generate food at random locations
function generateFood() {
  const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  food = { x, y };
}

// Function to check for collisions
function checkCollisions() {
  const head = snake[0];

  // Check if snake hits the wall
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }

  // Check if snake runs into itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Function to update the game
function update() {
  moveSnake();

  if (checkCollisions()) {
    // Game over, reset the game
    clearInterval(gameInterval);
    isGameRunning = false;
    alert('Game Over!');
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawSnake();
  drawFood();
}

// Function to handle key presses (control snake movement)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -gridSize };
  } else if (e.key === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: gridSize };
  } else if (e.key === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -gridSize, y: 0 };
  } else if (e.key === 'ArrowRight' && direction.x === 0) {
    direction = { x: gridSize, y: 0 };
  }
});

// Function to start the game
function startGame() {
  if (!isGameRunning) {
    isGameRunning = true;
    snake = [{ x: 9 * gridSize, y: 9 * gridSize }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById('score').textContent = score;
    generateFood();
    gameInterval = setInterval(update, 100);
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
  }
}

// Function to stop the game
function stopGame() {
  clearInterval(gameInterval);
  isGameRunning = false;
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
}

// Function to reset the game
function resetGame() {
  stopGame();
  startGame();
}

// Event listeners for buttons
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('stopBtn').addEventListener('click', stopGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);
