let pickcard = document.getElementById("pickcard");
let hidecards = document.getElementById("hidecards");
const overlay = document.getElementById("overlay");
const cardBoard = document.getElementById("card-board");
const gameBoard = document.getElementById("game-board");
const cardsBoard = document.getElementById("card-board");
const selected = document.getElementById("selectedCard"); 
let calculate = document.getElementById("calcscore"); 
// Card Array
const cards = [
    { image: "url(/assets/images/tiles/+6_1.png", name: "Knight", value: 6 },
    { image: "url(/assets/images/tiles/+6_2.png", name: "Knight", value: 6 },
    { image: "url(/assets/images/tiles/+5_1.png", name: "Prince", value: 5 },
    { image: "url(/assets/images/tiles/+5_2.png", name: "Prince", value: 5 },
    { image: "url(/assets/images/tiles/+4_1.png", name: "Forth", value: 4 },
    { image: "url(/assets/images/tiles/+4_2.png", name: "Forth", value: 4 },
    { image: "url(/assets/images/tiles/+3_1.png", name: "Third", value: 3 },
    { image: "url(/assets/images/tiles/+3_2.png", name: "Third", value: 3 },
    { image: "url(/assets/images/tiles/+2_1.png", name: "Two", value: 2 },
    { image: "url(/assets/images/tiles/+2_2.png", name: "Two", value: 2 },
    { image: "url(/assets/images/tiles/+1_1.png", name: "One", value: 1 },
    { image: "url(/assets/images/tiles/+1_2.png", name: "One", value: 1 },
    { image: "url(/assets/images/tiles/-6.png", name: "Demon", value: -6 },
    { image: "url(/assets/images/tiles/-5.png", name: "Orcs", value: -5 },
    { image: "url(/assets/images/tiles/-4.png", name: "Orcs", value: -4 },
    { image: "url(/assets/images/tiles/-3.png", name: "Wolves", value: -3 },
    { image: "url(/assets/images/tiles/-2.png", name: "Nasty", value: -2 },
    { image: "url(/assets/images/tiles/-1.png", name: "Poison", value: -1 },
    { image: "url(/assets/images/tiles/dragon.png", name: "Dragon", value: null, effect:"dragon" },
    { image: "url(/assets/images/tiles/goldmine.png", name: "Goldmine", value: null, effect:"goldmine" },
    { image: "url(/assets/images/tiles/mountain.png", name: "Mountain", value: null, effect:"mountain" },
    { image: "url(/assets/images/tiles/mountain.png", name: "Mountain", value: null, effect:"mountain" }
];

// Game Board Setup
const rows = 5;
const cols = 6;
const board = [];

const c_rows = 5;
const c_cols = 5; 
const c_board = []; 
let selectedCard = null; // Track the currently selected card

// Initialize board and c_board arrays
for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < cols; col++) {
        board[row][col] = null;
    }
}

for (let row = 0; row < c_rows; row++) {
    c_board[row] = [];
    for (let col = 0; col < c_cols; col++) {
        c_board[row][col] = null;
    }
}

// Get board elements


// Render the game board in HTML
function renderBoard() {
    gameBoard.innerHTML = ""; // Clear any existing tiles
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = document.createElement("div");
            tile.classList.add("b-tiles");
            tile.dataset.row = row;
            tile.dataset.col = col;
            gameBoard.appendChild(tile);
        }
    }
    console.log("Game board rendered");
}

// Render the cards in HTML
function renderCards() {
    cardsBoard.innerHTML = ""; // Clear any existing tiles
    for (let row = 0; row < c_rows; row++) {
        for (let col = 0; col < c_cols; col++) {
            const c_tile = document.createElement("div");
            c_tile.classList.add("c-tiles");
            c_tile.dataset.row = row;
            c_tile.dataset.col = col;
            cardsBoard.appendChild(c_tile);
        }
    }
    console.log("Cards rendered");
}

// Shuffle and place cards in c_board
function shuffleCards() {
    let shuffledCards = [...cards];  // Copy the cards array
    shuffledCards = shuffledCards.sort(() => Math.random() - 0.5); // Shuffle the cards

    let cardIndex = 0;
    for (let row = 0; row < c_rows; row++) {
        for (let col = 0; col < c_cols; col++) {
            if (cardIndex < shuffledCards.length) {
                c_board[row][col] = shuffledCards[cardIndex];
                cardIndex++;
            } else {
                c_board[row][col] = null; // Leave empty if out of cards
            }
        }
    }
    console.log("Cards shuffled and placed on c_board", c_board);
    const cardTiles = document.querySelectorAll(".c-tiles");
    cardTiles.forEach((cardTile, index) => {
        const row = Math.floor(index / c_cols);
        const col = index % c_cols;

        if (!c_board[row][col]) {
            cardTile.style.display = "none"; // Hide empty tiles in card-board
        }
    });
}

//Show Cards
pickcard.addEventListener("click", () => {
    overlay.style.display = "block"; // Visa overlay
    cardBoard.style.display = "grid"; // Visa card-board
    hidecards.style.display = "inline"; 
    
});

// Function to select a card from card-board
function setupCardSelection() {
    const cards = document.querySelectorAll(".c-tiles");
    cards.forEach(cardTile => {
        cardTile.addEventListener("click", () => {
            const row = cardTile.dataset.row;
            const col = cardTile.dataset.col;
            selectedCard = c_board[row][col]; // Set the selected card
            selectedCard.row = row; // Track row and col in selectedCard for later use
            selectedCard.col = col;

            if (selectedCard) {
                //cardTile.textContent = `${selectedCard.name} (${selectedCard.value || selectedCard.effect})`;
                cardTile.style.backgroundImage = `${selectedCard.image}`  // Show name and value/effect

                hidecards.style.display = "none"
                selected.style.backgroundImage = selectedCard.image;  // Show name and value/effect
                selected.style.visibility ="visible" 
                console.log(`Selected card: ${selectedCard.name} with value ${selectedCard.value} url:${selectedCard.image}`);
            } else {
                console.log("No card found at this location on card board");
            }
        });
    });
}

// Function to place selected card on the game-board
function setupBoardPlacement() {
    const boardTiles = document.querySelectorAll(".b-tiles");
    
    boardTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const row = tile.dataset.row;
            const col = tile.dataset.col;

            if (selectedCard) {
                // Place the card on the board and update display
                board[row][col] = { ...selectedCard }; // Copy selectedCard data into board
                // tile.textContent = `${selectedCard.name} (${selectedCard.value || selectedCard.effect})` // Display the card's name on the tile
                tile.style.backgroundImage = `${selectedCard.image}`
                console.log(`Placed ${selectedCard.name} at (${row}, ${col}) on the game board`);
                selected.style.visibility = "hidden"; 

                // Hide the corresponding card tile in card-board
                const cardTile = document.querySelector(`.c-tiles[data-row="${selectedCard.row}"][data-col="${selectedCard.col}"]`);
                if (cardTile) {
                    cardTile.style.visibility = "hidden"; // Hide the card visually but keep space occupied
                    

                    c_board[selectedCard.row][selectedCard.col] = null; // Remove it from c_board

                
                }

                // Clear the selected card after placement
                selectedCard = null;
            } else {
                console.log("No card selected to place");
            }
            console.log(board)
        });
    });
}

function calculateScores() {
    const rowScores = Array(rows).fill(0); // Initialize row scores
    const colScores = Array(cols).fill(0); // Initialize column scores

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = board[row][col];
            if (tile && tile.value !== null) { // Check if the tile has a card with a value
                rowScores[row] += tile.value; // Add to the row's score
                colScores[col] += tile.value; // Add to the column's score
            }
        }
    }

    return { rowScores, colScores };
}

calculate.addEventListener("click", () => { 
    console.log(calculateScores()); 
    
})



// Render and initialize boards
renderBoard();
renderCards();
shuffleCards();
setupCardSelection();
setupBoardPlacement();





