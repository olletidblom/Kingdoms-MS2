
const generateCastles = (color) => {
    return {
        castles: {
            castle1: { image: `assets/images/castles/${color}1.png`, multi: 1, amount: 4 },
            castle2: { image: `assets/images/castles/${color}2.png`, multi: 2, amount: 3 },
            castle3: { image: `assets/images/castles/${color}3.png`, multi: 3, amount: 2 },
            castle4: { image: `assets/images/castles/${color}4.png`, multi: 4, amount: 1 },
        },
        chosenBy: null
    };
};

export const castles = {
    blue: generateCastles("blue"),
    red: generateCastles("red"),
    green: generateCastles("green"),
    yellow: generateCastles("yellow"),
};

