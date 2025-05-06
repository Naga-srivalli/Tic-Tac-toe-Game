let username = '';
let usernameContainer = document.getElementById("username-container");
let gameContainer = document.getElementById("game-container");
let usernameInput = document.getElementById("username");
let submitButton = document.getElementById("submit-username");

let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newbtn = document.querySelector(".New");
let message = document.querySelector(".msg");
let messp = document.querySelector("#mes");

let turnO = false; // Computer starts
let gameOver = false;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

// Handle username submission
submitButton.addEventListener("click", () => {
    username = usernameInput.value.trim();
    if (username !== "") {
        usernameContainer.style.display = "none"; // Hide username input section
        gameContainer.style.display = "block"; // Show the game section
        updateUsernameDisplay(username); // Show the username in the game UI
        resetGame(); // Start the game
    } else {
        alert("Please enter a valid username");
    }
});

// Update the username display in the game
function updateUsernameDisplay(username) {
    let usernameDisplay = document.createElement("h2");
    usernameDisplay.innerText = `Welcome, ${username}`;
    document.getElementById("game-container").insertBefore(usernameDisplay, document.querySelector(".game"));
}

// Function for computer to make a random move
const computerMove = () => {
    const availableBoxes = [...boxes].filter(box => box.innerText === "");
    if (availableBoxes.length > 0 && !gameOver) {
        const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        randomBox.innerText = "X";
        randomBox.classList.add("X");
        randomBox.disabled = true;
        turnO = true;
        checkWinner();
    }
};

// Function to reset the game
const resetGame = () => {
    turnO = false;
    gameOver = false;
    enableboxes();
    message.classList.add("hide");
    messp.innerText = "";
    setTimeout(computerMove, 300); // Computer starts after slight delay
};

// Function to check winner
const checkWinner = () => {
    for (let pattern of winpatterns) {
        const [a, b, c] = pattern;
        const val1 = boxes[a].innerText;
        const val2 = boxes[b].innerText;
        const val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return;
        }
    }

    if ([...boxes].every(box => box.innerText !== "")) {
        messp.innerText = "It's a Draw!";
        message.classList.remove("hide");
        gameOver = true;
        disableboxes();
    }
};

// Function to show the winner
const showWinner = (winner) => {
    messp.innerText = `Congratulations, Winner is ${winner}`;
    message.classList.remove("hide");
    gameOver = true;
    disableboxes();
};

// Disable all boxes
const disableboxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable all boxes and reset them
const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("X", "O");
    });
};

// Event listener for player’s move (after computer’s first move)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || gameOver || !turnO) return;

        box.innerText = "O";
        box.classList.add("O");
        box.disabled = true;
        turnO = false;
        checkWinner();

        if (!gameOver) {
            setTimeout(computerMove, 500);
        }
    });
});

// Event listener for reset button
resetbtn.addEventListener("click", resetGame);

// Event listener for new game button
newbtn.addEventListener("click", () => {
    resetGame(); // Reset the game when New Game button is clicked
    // Optionally, you can clear the username and show the username input again
    usernameContainer.style.display = "block";
    gameContainer.style.display = "none";
});
