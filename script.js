const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;  // Size of the grid cells
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;

let snake = [
    { x: 9 * gridSize, y: 10 * gridSize },  // Initial snake position
];
let direction = { x: 0, y: 0 };  // Initial direction (not moving)
let food = randomFoodPosition();
let score = 0;

function drawGrid() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function moveSnake() {
    const newHead = { 
        x: snake[0].x + direction.x * gridSize, 
        y: snake[0].y + direction.y * gridSize 
    };
    snake.unshift(newHead);

    // Check for collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
        food = randomFoodPosition();
        score++;
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * cols) * gridSize,
        y: Math.floor(Math.random() * rows) * gridSize,
    };
}

function checkCollision() {
    // Check for wall collision
    if (
        snake[0].x < 0 || snake[0].x >= canvas.width || 
        snake[0].y < 0 || snake[0].y >= canvas.height
    ) {
        return true;
    }

    // Check for collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

function update() {
    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        //document.location.reload();
    } else {
        drawGrid();
        moveSnake();
        drawSnake();
        drawFood();
    }
}

// Handle key input
window.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Game loop
setInterval(update, 100);
