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

    function addCellToSolution(id){
        let cell = document.getElementById(id);
        cell.style.backgroundColor = '#5fe245fd';
    }
    function removeCellFromSolution(id){
        let cell = document.getElementById(id);
        cell.style.backgroundColor = '#64dd4c73'
    }
    
    var rMove = [0, 1, 0, -1];
    var cMove = [1, 0, -1, 0];

    function backtrackingSolver(i, j, visited, path) {

        console.log('recursion called')

        // out of bounds condition
        if (i >= rows || i < 0)
            return false;
        if (j >= columns || j < 0)
            return false;

        // already visited cell condition
        if (visited[i * columns + j])
            return false;

        // blocked cell condition
        if (!matrixData[i][j])
            return false;

        // solved condition
        if (i === rows - 1 && j === columns - 1) {
            addCellToSolution(`(${i},${j})`);
            path.push(`(${i},${j})`);
            return true;
        }

        visited[i * columns + j] = true;

        let r,c,k;

        for (k = 0; k < 4; k++) {
            r = i + rMove[k];
            c = j + cMove[k];
            if (backtrackingSolver(r, c, visited, path)) {
                addCellToSolution(`(${i},${j})`);
                path.push(`(${i},${j})`);
                return true;
            }
            else
                continue;
        }
        path.pop();
        removeCellFromSolution(`(${i},${j})`);
        return false;
    }
    function solveMaze() {
        let path = [];
        let visited = [];
        if (backtrackingSolver(0, 0, visited, path))
            console.log(path);
        else
            console.log('couldnt solve maze')
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