import { useState } from 'react';
import './component styles/mazeCreator.css'
import './component styles/commonStyles.css'

export default function (props) {
    const [scale, setScale] = useState(null);
    const [opened, setOpened] = useState(false);

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
            <div>Enter Matrix dimensions</div>
            <div>Rows and columns</div>
            <div>Click on a tile to toggle into a wall</div>
            <div>Here comes the live visual of matrix</div>
            <div className='d-flex justify-content-center align-items-center gap-20'>
                <button onClick={closeMazeCreator}>Close</button>
                <button>Create</button>
            </div>
        </div>
    )
}