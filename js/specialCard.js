export function applyDragonEffect(cells) {
    let modifiedScore = 0;

    cells.forEach(cell => {
        if (cell && cell.value !== undefined) {
            if (cell.value > 0) {
                // Ignore positive values (turn them to 0 for scoring)
                modifiedScore += 0;
            } else if (cell.value < 0) {
                // Keep negative values
                modifiedScore += cell.value;
            }
        }
    });

    return modifiedScore;
}