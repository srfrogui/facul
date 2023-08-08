// Get canvas and context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Ball position and speed
var ballX = canvas.width / 2;
var ballY = canvas.height - 30;
var ballSpeedX = 2;
var ballSpeedY = -2;

// Ball speed increase over time
var initialBallSpeedX = 2;
var initialBallSpeedY = -2;
var ballSpeedIncreaseRate = 0.3;

// Paddle speed increase over time
var initialPaddleSpeed = 3;
var paddleSpeedIncreaseRate = 0.05;

// Paddle position and size
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var paddleSpeed = initialPaddleSpeed;

// Score
var score = 0;
var scoreElement = document.getElementById("score");

// Game over
var gameStarted = false;
var gameOver = document.getElementById("gameOver");
var playerNameInput = document.getElementById("playerName");
var saveScoreButton = document.getElementById("saveScore");

// Keyboard event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Handle keyboard input
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Collision detection function
function detectCollision() {
    if (ballX > paddleX && ballX < paddleX + paddleWidth && ballY > canvas.height - 10) {
        ballSpeedY = -ballSpeedY;
        score++;
        scoreElement.textContent = "Score: " + score;
    }
}

// Update ball and paddle speed
function updateSpeed() {
    ballSpeedX = initialBallSpeedX + ballSpeedIncreaseRate * score;
    ballSpeedY = initialBallSpeedY - ballSpeedIncreaseRate * score;

    paddleSpeed = initialPaddleSpeed + paddleSpeedIncreaseRate * score;
}

// Main game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // Draw paddle
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - 10, paddleWidth, 5);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Collision detection with walls
    if (ballX + ballSpeedX > canvas.width - 10 || ballX + ballSpeedX < 10) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballSpeedY < 10) {
        ballSpeedY = -ballSpeedY;
    }

    // Collision detection with paddle
    if (ballY > canvas.height - 20 && ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        score++;
        scoreElement.textContent = "Score: " + score;
    }

    // Move paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    // Game over
    if (ballY > canvas.height) {
        gameStarted = false;
        gameOver.style.display = "block";
    }

    // Repeat game loop
    if (gameStarted) {
        requestAnimationFrame(draw);
    }
}

// Start game
function startGame() {
    gameStarted = true;
    gameOver.style.display = "none";
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2;
    score = 0;
    scoreElement.textContent = "Score: 0";
    draw();
}

// Save player's score
saveScoreButton.addEventListener("click", function() {
    var playerName = playerNameInput.value;
    if (playerName) {
        fetch("save_score.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: playerName, pontuacao: score })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            playerNameInput.value = "";
            gameStarted = true;
            gameOver.style.display = "none";
            updateSpeed(); // Update speed after saving score
            draw();
        })
        .catch(function(error) {
            console.error("Error saving score:", error);
        });
    }
});

// Start game button
var startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

// Start the game loop when the page loads
document.addEventListener("DOMContentLoaded", function() {
    // Load scoreboard updates using SSE
    var topPlayersElement = document.getElementById("topPlayers");
    var eventSource = new EventSource("scoreboard_updates.php");

    eventSource.addEventListener("update", function(event) {
        var topPlayers = JSON.parse(event.data);
        topPlayersElement.innerHTML = "";

        topPlayers.forEach(function(player) {
            var listItem = document.createElement("li");
            listItem.textContent = player.nome + " - " + player.pontuacao;
            topPlayersElement.appendChild(listItem);
        });
    });

    // Add click event to play again button
    var playAgainButton = document.getElementById("playAgain");
    playAgainButton.addEventListener("click", function() {
        gameStarted = true;
        gameOver.style.display = "none";
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        paddleX = (canvas.width - paddleWidth) / 2;
        score = 0;
        scoreElement.textContent = "Score: 0";
        updateSpeed(); // Reset speed
        draw();
    });
});
