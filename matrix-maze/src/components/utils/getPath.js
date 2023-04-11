export default function getPath(rows,columns,matrixData){
    let path = [];
    let bfsQueue = [];
    let visited = {};

    var rMove = [0, 1, 0, -1];
    var cMove = [1, 0, -1, 0];

    bfsQueue.push({ r: rows-1, c: columns-1});
    path.push(`(${rows-1},${columns-1})`);
    visited[`(${rows-1},${columns-1})`] = true;
    
    while (bfsQueue.length) {
        let pos = bfsQueue.shift();
        let currCell = document.getElementById(`(${pos.r},${pos.c})`);

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
            // blocked cell condition
            else if (!matrixData[r][c]) {
                continue;
            }

            // already visited cell condition
            else if(visited[`(${r},${c})`]){
                continue;
            }

            else if (document.getElementById(`(${r},${c})`).value == Number.parseInt(currCell.value) - 1) {
                path.push(`(${r},${c})`);
                bfsQueue.push({ r: r, c: c});
                visited[`(${r},${c})`] = true;
            }                
        }
    }

    return path;
}