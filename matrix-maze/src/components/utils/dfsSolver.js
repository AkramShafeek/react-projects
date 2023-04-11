export default function dfsSolver(i, j, visited, path, addCellToSolution, removeCellFromSolution, rows, columns, matrixData, pause) {
    var rMove = [0, 1, 0, -1];
    var cMove = [1, 0, -1, 0];

    return new Promise(async (resolve) => {

        // out of bounds condition
        if (i >= rows || i < 0) {
            resolve(false);
            return;
        }
        if (j >= columns || j < 0) {
            resolve(false);
            return;
        }

        // already visited cell condition
        if (visited[`(${i},${j})`]) {
            resolve(false);
            return;
        }

        // blocked cell condition
        if (!matrixData[i][j]) {
            resolve(false);
            return;
        }

        // solved condition
        if (i === rows - 1 && j === columns - 1) {
            addCellToSolution(`(${i},${j})`);
            path.push(`(${i},${j})`);
            resolve(true);
            return;
        }

        visited[`(${i},${j})`] = true;
        addCellToSolution(`(${i},${j})`);

        let r, c, k;

        for (k = 0; k < 4; k++) {
            r = i + rMove[k];
            c = j + cMove[k];

            await pause();

            if (await dfsSolver(r, c, visited, path, addCellToSolution, removeCellFromSolution, rows, columns, matrixData, pause)) {
                path.push(`(${i},${j})`);
                resolve(true);
                return;
            }
        }

        path.pop();
        removeCellFromSolution(`(${i},${j})`);
        resolve(false);
        return;
    })
}