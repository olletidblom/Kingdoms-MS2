
import { pickCard, hide_c_board, overlay, cardBoard, gameBoard, selectedDOM, calculate } from "./domElements.js";
import { cards, shuffleCards } from "./cards.js";
import { initializeBoard, renderBoard, renderCards } from "./initGame.js";
import { show_Card, select_Card, place_Card } from "./gameLogic.js";





// init game 

const rows = 5;
const cols = 6;
const board = initializeBoard(rows, cols)

const c_rows = 5;
const c_cols = 5;
const c_board = initializeBoard(c_rows, c_cols)

const gameState = {
    selectedCard: null, // Shared state for selected card
};



renderBoard(gameBoard, rows, cols)
renderCards(cardBoard, c_rows, c_cols)
shuffleCards(cards, c_rows, c_cols, c_board)


show_Card(pickCard, overlay, cardBoard, hide_c_board)
select_Card(gameState,c_board, selectedDOM, hide_c_board)
place_Card(gameState, board, selectedDOM, c_board, )




