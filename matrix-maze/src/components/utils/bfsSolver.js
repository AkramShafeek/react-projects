export default function bfsSolver(addValueToCell, rows, columns, matrixData) {
    let i = 0;
    let j = 0;
    let bfsQueue = [];
    let visited = {};

    var rMove = [0, 1, 0, -1];
    var cMove = [1, 0, -1, 0];

    bfsQueue.push({ r: i, c: j, value: 0 });
    visited[`(0,0)`] = true;
    addValueToCell(`(0,0)`, 0)

    while (bfsQueue.length) {
        let pos = bfsQueue.shift();
        let value = pos.value + 1;

        //check for its neighbors
        for (let k = 0; k < 4; k++) {
            let r = pos.r + rMove[k];
            let c = pos.c + cMove[k];

            // out of bounds condition
            if (r >= rows || r < 0) {
                continue;
            }
            else if (c >= columns || c < 0) {
                continue;
            }

            // already visited cell condition
            else if (visited[`(${r},${c})`]) {
                continue;
            }

            // blocked cell condition
            else if (!matrixData[r][c]) {
                continue;
            }

            // solved condition
            else if (r === rows - 1 && c === columns - 1) {
                // add cell to visited
                visited[`(${r},${c})`] = true;
                // add value to cell
                addValueToCell(`(${r},${c})`, value)

                break;
            }
            else {
                // add cell to visited
                visited[`(${r},${c})`] = true;
                // add value to cell
                addValueToCell(`(${r},${c})`, value)
                // push cell to queue
                bfsQueue.push({ r: r, c: c, value: value })
            }
        }
    }
}