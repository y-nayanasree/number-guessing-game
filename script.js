
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const bestScoreDisplay = document.getElementById("bestScore");
const playAgainBtn = document.getElementById("playAgainBtn");

let secretNumber;
let attempts;
let gameOver;
let bestScore = null;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    attemptsDisplay.textContent = "0";
    message.textContent = "Let's play! Enter a number to begin.";
    message.className = "message";

    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;

    guessInput.focus();
}

function checkGuess(event) {
    event.preventDefault();

    if (gameOver) return;

    const guess = Number(guessInput.value);

    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        message.textContent = "Please enter a whole number from 1 to 100.";
        message.className = "message error";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess === secretNumber) {
        message.textContent =
            `🎉 Correct! The number was ${secretNumber}. You won in ${attempts} attempts!`;
        message.className = "message success";
        gameOver = true;

        if (bestScore === null || attempts < bestScore) {
            bestScore = attempts;
            bestScoreDisplay.textContent = bestScore;
        }

        guessInput.disabled = true;
        guessBtn.disabled = true;
    } else if (guess < secretNumber) {
        message.textContent = "📈 Too Low! Try a higher number.";
        message.className = "message";
    } else {
        message.textContent = "📉 Too High! Try a lower number.";
        message.className = "message";
    }

    if (!gameOver) {
        guessInput.value = "";
        guessInput.focus();
    }
}

guessForm.addEventListener("submit", checkGuess);
playAgainBtn.addEventListener("click", startGame);

startGame();
