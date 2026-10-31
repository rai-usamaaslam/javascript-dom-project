
const board = document.querySelector(".board");
const startBtn = document.querySelector(".btn-start");

const modal = document.querySelector(".modal");
const startModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");

const highScoreElem = document.querySelector("#high-score");
const Score = document.querySelector("#score");
const time = document.querySelector("#time");
const restartBtn = document.querySelector(".btn-restart");

const blockHeight = 50;
const blockWidth = 50;

let HighScore = localStorage.getItem("HighScore") || 0;
let score = 0;
let seconds = 0;

highScoreElem.innerText = HighScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalID = null;
let timerInterval = null;

const blocks = [];

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

let snake = [{ x: 1, y: 3 }];

let direction = "right";

// Create Grid
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

// Timer Function
function updateTimer() {
  seconds++;

  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  time.innerText =
    `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Render Game
function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  // Wall Collision
  if (
    head.x < 0 ||
    head.x >= rows ||
    head.y < 0 ||
    head.y >= cols
  ) {
    modal.style.display = "flex";
    startModal.style.display = "none";
    gameOverModal.style.display = "flex";

    clearInterval(intervalID);
    clearInterval(timerInterval);

    intervalID = null;
    timerInterval = null;

    score = 0;
    Score.innerText = score;

    return;
  }

  // Food Collision
  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    snake.unshift(head);

    score += 10;
    Score.innerText = score;

    if (score > HighScore) {
      HighScore = score;
      highScoreElem.innerText = HighScore;

      localStorage.setItem("HighScore", HighScore.toString());
    }
  }

  // Remove Previous Snake
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  // Snake Movement
  snake.unshift(head);
  snake.pop();

  // Render Snake
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

// Start Game
startBtn.addEventListener("click", () => {
  if (intervalID !== null) return;

  modal.style.display = "none";

  seconds = 0;
  time.innerText = "00:00";

  timerInterval = setInterval(updateTimer, 1000);

  intervalID = setInterval(() => {
    render();
  }, 300);
});

// Restart Game
restartBtn.addEventListener("click", restartGame);

function restartGame() {
  clearInterval(intervalID);
  clearInterval(timerInterval);

  intervalID = null;
  timerInterval = null;

  score = 0;
  seconds = 0;

  Score.innerText = score;
  highScoreElem.innerText = HighScore;
  time.innerText = "00:00";

  blocks[`${food.x}-${food.y}`].classList.remove("food");

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  direction = "down";

  modal.style.display = "none";
  gameOverModal.style.display = "none";

  snake = [{ x: 1, y: 3 }];

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  timerInterval = setInterval(updateTimer, 1000);

  intervalID = setInterval(() => {
    render();
  }, 300);
}

// Keyboard Controls
addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  }
});
