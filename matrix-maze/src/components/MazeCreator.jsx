import { useState } from 'react';
import './component styles/mazeCreator.css'
import './component styles/commonStyles.css'
import Matrix from './Matrix';

export default function MazeCreator(props) {
    const [scale, setScale] = useState(null);
    const [opened, setOpened] = useState(false);
    const [rows, setRows] = useState(1);
    const [columns, setcolumns] = useState(1);
    const [matrixData, setMatrixData] = useState(null);

    function updateMatrixData(newMatrixData) {
        setMatrixData(newMatrixData);
    }

    function updateRows(event) {
        if (event.target.value > 0 && event.target.value <= 15)
            setRows(event.target.value)
    }
    function updateColumns(event) {
        if (event.target.value > 0 && event.target.value <= 20)
            setcolumns(event.target.value)
    }

    if (!opened)
        setTimeout(() => {
            setOpened(true);
            setScale({ opacity: '1', transform: 'scale(1)' });
        }, 100);

    function closeMazeCreator() {
        setScale({ opacity: '0', transform: 'scale(0.5)' });
        setTimeout(() => {
            props.closeMazeCreator();
        }, 250)
    }

    function getMatrixData(newMatrixData) {
        setMatrixData(newMatrixData);
    }

    function addCellToSolution(id) {
        let cell = document.getElementById(id);
        cell.style.backgroundColor = '#5fe245fd';
    }
    function removeCellFromSolution(id) {
        let cell = document.getElementById(id);
        cell.style.backgroundColor = '#64dd4c73'
    }
    function pause() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('continue');
            }, 100)
        })
    }

    var rMove = [0, 1, 0, -1];
    var cMove = [1, 0, -1, 0];

    function backtrackingSolver(i, j, visited, path) {
        return new Promise(async (resolve, reject) => {
            // console.log(i, j)
            // console.log('recursion called')

            // out of bounds condition
            if (i >= rows || i < 0) {
                resolve(false);
                return;
                // console.log('resolved')
            }
            if (j >= columns || j < 0) {
                resolve(false);
                return;
                // console.log('resolved')
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
            // visited[i * columns + j] = true;
            console.log('visited ' + `(${i},${j})`)
            addCellToSolution(`(${i},${j})`);

            let r, c, k;

            for (k = 0; k < 4; k++) {
                r = i + rMove[k];
                c = j + cMove[k];

                await pause();

                if (await backtrackingSolver(r, c, visited, path)) {
                    console.log('returned where it started')
                    path.push(`(${i},${j})`);
                    resolve(true);
                    return;
                }

                // console.log('at the end of for loop')
            }
            path.pop();
            removeCellFromSolution(`(${i},${j})`);
            resolve(false);
            return;
        })
    }

    async function bfsSolver() {
        let i = 0;
        let j = 0;
        let bfsQueue = [];
        let visited = {};
        
        bfsQueue.push({ r: i, c: j });
        visited[`(0,0)`] = true;
        
        while (bfsQueue.length) {
            let pos = bfsQueue.shift();
            await pause();
            addCellToSolution(`(${pos.r},${pos.c})`)
            console.log('visited ' + `(${pos.r},${pos.c})`)
            // console.log(visited)
            //check for its neighbors
            for (let k = 0; k < 4; k++) {
                let r = pos.r + rMove[k];
                let c = pos.c + cMove[k];
                // out of bounds condition

                if (r >= rows || r < 0) {
                    // resolve(false);
                    continue;
                    // console.log('resolved')
                }
                else if (c >= columns || c < 0) {
                    // resolve(false);
                    continue;
                    // console.log('resolved')
                }
                
                // already visited cell condition
                else if (visited[`(${r},${c})`]) {
                    // resolve(false);
                    // console.log('')                    
                    console.log('already visited ' + `(${r},${c})`)
                    continue;
                }

                // blocked cell condition
                else if (!matrixData[r][c]) {
                    // resolve(false);
                    continue;
                }
                // solved condition
                else if (r === rows - 1 && c === columns - 1) {
                    addCellToSolution(`(${r},${c})`);
                    // resolve(true);
                    break;
                }
                else {
                    console.log('adding to queue: ' + `(${r},${c})`)
                    visited[`(${r},${c})`] = true;
                    bfsQueue.push({r:r,c:c})
                }
            }
        }
        console.log (visited)
    }

    async function solveMaze() {
        let path = [];
        let visited = {};
        if (await backtrackingSolver(0, 0, visited, path))
            console.log(path);
        else
            console.log('couldnt solve maze')

        console.log(visited);
        // bfsSolver();
    }


    return (
        <div id="mazeCreator" className='appear-animation d-flex flex-column justify-content-center align-items-center gap-20' style={scale}>
            <div className='m-font'>
                Enter Matrix dimensions
            </div>
            <div className='d-flex gap-20 align-items-center'>
                <input type="number" onChange={updateRows} value={rows} />
                X
                <input type="number" onChange={updateColumns} value={columns} />
            </div>
            <div className='m-font'>Click on a tile to toggle into a wall</div>
            <div className='matrixContainer d-flex justify-content-center align-items-center'>
                <Matrix rows={rows} columns={columns} callback={updateMatrixData} sendMatrixData={getMatrixData}></Matrix>
            </div>
            <div className='d-flex justify-content-center align-items-center gap-20'>
                <button onClick={closeMazeCreator} className='cancel'>Cancel</button>
                <button className='create' onClick={solveMaze}>Solve</button>
            </div>
        </div>
    )
}