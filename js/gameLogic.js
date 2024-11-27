export function show_Card(pickCard, overlay, cardBoard, hideCards){

    pickCard.addEventListener("click", () => {
        overlay.style.display = "block"; // Visa overlay
        cardBoard.style.display = "grid"; // Visa card-board
        hideCards.style.display = "inline";

})};




export function select_Castle(gameState, castleBoard, overlay, hideCards, selectedDOM) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const playerCastles = currentPlayer.castles; // Get castles for current player

    // Clear the castle board before rendering new data
    castleBoard.innerHTML = "";

    // Dynamically render castles based on the current player's data
    playerCastles.forEach((castle, index) => {
        if (castle.amount > 0) { // Only render castles with remaining amount
            const castleTile = document.createElement("div");
            castleTile.classList.add("c-tiles");
            castleTile.style.backgroundImage = `url(${castle.image})`;
            castleTile.style.backgroundSize = "cover";
            castleTile.dataset.index = index;

            // Add click event listener for selecting a castle
            castleTile.addEventListener("click", () => {
                // Update the gameState with the selected castle
                gameState.selected = castle;

                // Update the selectedDOM to reflect the selected castle
                selectedDOM.style.backgroundImage = `url(${castle.image})`;
                selectedDOM.style.visibility = "visible";

                // Decrease the castle amount
                castle.amount -= 1;

                console.log(`Castle selected: ${castle.image}, Remaining: ${castle.amount}`);

                // Close the castle modal
                overlay.style.display = "none";
                castleBoard.style.display = "none";
                hideCards.style.display = "none";
            });

            castleBoard.appendChild(castleTile);
        }
    });

    // Show the castle selection modal
    overlay.style.display = "block";
    castleBoard.style.display = "grid";
    hideCards.style.display = "inline";

    console.log("Castle selection modal updated for current player.");
}



export function select_Card(gameState, c_board, selectedDOM, hideCards) {
    const cards = document.querySelectorAll(".c-tiles");
    cards.forEach(cardTile => {
        cardTile.addEventListener("click", () => {
            const row = cardTile.dataset.row;
            const col = cardTile.dataset.col;
            const selectedCard = c_board[row][col];
            if (selectedCard) {
                selectedCard.row = row;
                selectedCard.col = col;
                gameState.selected = selectedCard; // Update shared state with the card

                // Update the selected DOM to display the selected card
                selectedDOM.style.backgroundImage = `url(${selectedCard.image})`;
                selectedDOM.style.visibility = "visible";

                // Hide the card board
                hideCards.style.display = "none";
                cardTile.style.visibility = "hidden";
            } else {
                alert("Please select a valid card.");
            }
        });
    });
}

export function place_Card(gameState, board, selectedDOM) {
    const boardTiles = document.querySelectorAll(".b-tiles");
    boardTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const row = tile.dataset.row;
            const col = tile.dataset.col;

            if (gameState.selected) {
                // Ensure the cell is empty
                if (board[row][col] !== null) {
                    alert("This spot is already taken!");
                    return;
                }

                // Place the selected item (card or castle) on the board
                board[row][col] = { ...gameState.selected }; // Add to board data
                tile.style.backgroundImage = `url(${gameState.selected.image})`;
                selectedDOM.style.visibility = "hidden";

                // Update player state if it's a castle
                if (gameState.selected.amount !== undefined) {
                    gameState.selected.amount -= 1; // Decrement castle amount
                    console.log(`${gameState.selected.amount} remaining for ${gameState.selected.image}`);
                }

                console.log(`${gameState.players[gameState.currentPlayerIndex].name} placed an item.`);

                // Clear the selected item
                gameState.selected = null;

                // Switch to the next player's turn
                gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;

                // Update the UI to show the next player's turn
                document.getElementById("playerTurn").innerText = `${gameState.players[gameState.currentPlayerIndex].name}'s Turn`;
            } else {
                alert("No item selected to place.");
            }
        });
    });
}