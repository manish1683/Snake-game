// JavaScript for handling modal and game interaction

// Modal
const modal = document.getElementById('loginModal');
const closeButton = document.querySelector('.close');
const startButton = document.getElementById('startButton');
const loginForm = document.getElementById('loginForm');

// Event listeners
startButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function outsideClick(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}

// Handle form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const avatar = document.getElementById('avatar').value;
    const age = document.getElementById('age').value;
    const difficulty = document.getElementById('difficulty').value;

    // Store user data in localStorage for use in the game
    localStorage.setItem('username', username);
    localStorage.setItem('avatar', avatar);
    localStorage.setItem('age', age);
    localStorage.setItem('difficulty', difficulty);

    // Close modal after submitting form
    closeModal();

    // Start the game with selected difficulty
    startGame(difficulty);
});

// Game variables and functions
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const canvasSize = canvas.width;
const initialSnakeLength = 3;
const snakeColor = ['#008000', '#32CD32', '#228B22']; // Different shades of green
let snake = [];
let food = { x: 200, y: 200 };
let dx = gridSize;
let dy = 0;
let gameInterval = null;
let isPaused = false;
let score = 0;

function startGame(difficulty) {
    if (gameInterval === null) {
        snake = [];
        for (let i = 0; i < initialSnakeLength; i++) {
            snake.push({ x: 100 - i * gridSize, y: 100 });
        }
        score = 0;
        document.getElementById('score').textContent = score;
        gameInterval = setInterval(updateGame, getGameSpeed(difficulty));
    }
}

function getGameSpeed(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 200;
        case 'medium':
            return 150;
        case 'hard':
            return 100;
        default:
            return 150;
    }
}

function pauseGame() {
    if (!isPaused) {
        clearInterval(gameInterval);
        isPaused = true;
    } else {
        gameInterval = setInterval(updateGame, getGameSpeed(localStorage.getItem('difficulty')));
        isPaused = false;
    }
}

function restartGame() {
    clearInterval(gameInterval);
    snake = [];
    for (let i = 0; i < initialSnakeLength; i++) {
        snake.push({ x: 100 - i * gridSize, y: 100 });
    }
    dx = gridSize;
    dy = 0;
    food = generateFood();
    score = 0;
    document.getElementById('score').textContent = score;
    drawSnake();
    drawFood();
    gameInterval = setInterval(updateGame, getGameSpeed(localStorage.getItem('difficulty')));
}

function updateGame() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();

    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        restartGame();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = snakeColor[index % snakeColor.length];
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = '#FF0000'; // Red color for food
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        food = generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * canvasSize / gridSize) * gridSize;
    const y = Math.floor(Math.random() * canvasSize / gridSize) * gridSize;
    return { x, y };
}

function checkCollision() {
    if (
        snake[0].x < 0 || snake[0].x >= canvasSize ||
        snake[0].y < 0 || snake[0].y >= canvasSize
    ) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Event listeners for game controls
document.addEventListener('keydown', function(event) {
    const keyPressed = event.key;

    switch (keyPressed) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = gridSize;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = gridSize;
                dy = 0;
            }
            break;
        case 'p':
            pauseGame();
            break;
        case 'r':
            restartGame();
            break;
        default:
            break;
    }
});
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        food = generateFood();
    } else {
        snake.pop();
    }

    // Example animation class
    animateSnakeMovement();
}
function pauseGame() {
    if (!isPaused) {
        clearInterval(gameInterval);
        isPaused = true;
    } else {
        gameInterval = setInterval(updateGame, getGameSpeed(localStorage.getItem('difficulty')));
        isPaused = false;
    }
}
function restartGame() {
    clearInterval(gameInterval);
    snake = [];
    for (let i = 0; i < initialSnakeLength; i++) {
        snake.push({ x: 100 - i * gridSize, y: 100 });
    }
    dx = gridSize;
    dy = 0;
    food = generateFood();
    score = 0;
    document.getElementById('score').textContent = score;
    drawSnake();
    drawFood();
    gameInterval = setInterval(updateGame, getGameSpeed(localStorage.getItem('difficulty')));
    isPaused = false; // Ensure game is not paused after restart
}
const pauseButton = document.getElementById('pauseButton');
const restartButton = document.getElementById('restartButton');

pauseButton.addEventListener('click', pauseGame);
restartButton.addEventListener('click', restartGame);



function animateSnakeMovement() {
    // Add a class to animate snake's movement
    const snakeHead = document.querySelector('#gameCanvas');

    snakeHead.classList.add('snake-move-animation');

    // Remove the class after the animation duration
    setTimeout(() => {
        snakeHead.classList.remove('snake-move-animation');
    }, 500); // Adjust duration as needed
}

document.addEventListener('keydown', function(event) {
    const keyPressed = event.key.toLowerCase(); // Convert to lowercase for uniformity

    switch (keyPressed) {
        case 'arrowup':
        case 'w':
            if (dy === 0) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case 'arrowdown':
        case 's':
            if (dy === 0) {
                dx = 0;
                dy = gridSize;
            }
            break;
        case 'arrowleft':
        case 'a':
            if (dx === 0) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case 'arrowright':
        case 'd':
            if (dx === 0) {
                dx = gridSize;
                dy = 0;
            }
            break;
        case 'p':
            pauseGame();
            break;
        case 'r':
            restartGame();
            break;
        default:
            break;
    }
});
