
/* Game Board */


const rows = 5;
const cols = 6;
const board = [];


for (let row = 0; row < rows; row++) {
    board[row] = []
    for (let col = 0; col < cols; col++) {
        board[row][col] = null;
    }
}




/* Tiles Array*/
const cards = [
    { name: "Knight", value: 6 },
    { name: "Knight", value: 6 },
    { name: "Prince", value: 5 },
    { name: "Prince", value: 5 },
    { name: "Forth", value: 4 },
    { name: "Forth", value: 4 },
    { name: "Third", value: 3 },
    { name: "Third", value: 3 },
    { name: "Two", value: 2 },
    { name: "Two", value: 2 },
    { name: "One", value: 1 },
    { name: "One", value: 1 },
    { name: "Demon", value: -6 },
    { name: "Orcs", value: -5 },
    { name: "Witch", value: -4 },
    { name: "Wolves", value: -3 },
    { name: "Nasty", value: -2 },
    { name: "Poison", value: -1 },
    { name: "Dragon", value: null, effect:"dragon" },
    { name: "Goldmine", value: null, effect:"goldmine" },
    { name: "Mointain", value: null, effect:"mountain" },
    { name: "Mointain", value: null, effect:"mountain"},


]









