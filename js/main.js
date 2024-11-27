import { pickCard, hide_c_board, overlay, cardBoard, gameBoard, selectedDOM, placeCastle, castleBoard } from "./domElements.js";
import { cards, shuffleCards } from "./cards.js";
import { initializeBoard, renderBoard, renderCards } from "./initGame.js";
import { show_Card, select_Card, place_Card, select_Castle } from "./gameLogic.js";
import { setupStartScreen } from "./startscreen.js";

function startGame(players) {
    console.log("Game starting with players:", players);

    // Hide setup and display the game screen
    document.getElementById("player-setup").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    // Initialize game state
    const rows = 5;
    const cols = 6;
    const board = initializeBoard(rows, cols);

    const c_rows = 5;
    const c_cols = 5;
    const c_board = initializeBoard(c_rows, c_cols);

    const gameState = {
        players,
        board,
        c_board,
        selected: null,
        currentPlayerIndex: 0,
    };

    // Render the game board and cards
    renderBoard(gameBoard, rows, cols);
    renderCards(cardBoard, c_rows, c_cols);
    shuffleCards(cards, c_rows, c_cols, c_board);

    // Set up UI and interactions
    show_Card(pickCard, overlay, cardBoard, hide_c_board); // Show card modal

    // Attach event listener for "Place Castle" button
    placeCastle.addEventListener("click", () => {
        select_Castle(gameState, castleBoard, overlay, hide_c_board, selectedDOM);
    });

    select_Card(gameState, c_board, selectedDOM, hide_c_board); // Handle card selection
    place_Card(gameState, board, selectedDOM); // Handle placement on the board

    // Display the first player's turn
    document.getElementById("playerTurn").innerText = `${players[0].name}'s Turn`;

    // Start the game loop
    startGameLoop(gameState);
}

function startGameLoop(gameState) {
    const { board, players } = gameState;

    // Check if the game board is filled
    const isBoardFilled = () => board.every(row => row.every(cell => cell !== null));
}

// Handle end-game logic
function endGame(gameState) {
    const { players } = gameState;

    // Calculate the winner based on scores
    const winner = players.reduce((prev, curr) => (prev.score > curr.score ? prev : curr));
    alert(`Game Over! The winner is ${winner.name} with ${winner.score} points.`);
}

// Set up the start screen
setupStartScreen(startGame);