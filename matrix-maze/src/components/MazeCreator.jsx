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

    function updateMatrixData(newMatrixData){
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
                <Matrix rows={rows} columns={columns} callback={updateMatrixData} matrixData={matrixData}></Matrix>
            </div>
            <div className='d-flex justify-content-center align-items-center gap-20'>
                <button onClick={closeMazeCreator} className='cancel'>Cancel</button>
                <button className='create'>Create</button>
            </div>
        </div>
    )
}