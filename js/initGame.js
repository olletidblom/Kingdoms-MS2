export function initializeBoard(rows, cols) {
    const board = Array.from({ length: rows }, () => Array(cols).fill(null));
    return board; 
}

export function renderBoard(gameBoard, rows, cols) {
    gameBoard.innerHTML = "";
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = document.createElement("div");
            tile.classList.add("b-tiles");
            tile.dataset.row = row;
            tile.dataset.col = col;
            gameBoard.appendChild(tile);
        }
    }
}

export function renderCards(cardBoard, c_rows, c_cols) {
    cardBoard.innerHTML = "";
    for (let row = 0; row < c_rows; row++) {
        for (let col = 0; col < c_cols; col++) {
            const c_tile = document.createElement("div");
            c_tile.classList.add("c-tiles");
            c_tile.dataset.row = row;
            c_tile.dataset.col = col;
            cardBoard.appendChild(c_tile);
        }
    }
    console.log("Rendered")
}