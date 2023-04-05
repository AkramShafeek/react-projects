import { useEffect, useState } from "react";
import './component styles/home.css';
import MazeCreator from "./MazeCreator";

export default function (props) {
    const [mazeCreator, setMazeCreator] = useState(false);
    const [appear, setappear] = useState(false);
    
    function openMazeCreator() {
        setMazeCreator(true);
    }

    function closeMazeCreator() {
        setMazeCreator(false);
    }

    function handleClick() {
        openMazeCreator();
    }

    useEffect(()=>{
        setTimeout(()=>{
            setappear(true)
        },700)
    },[]);

    return (
        <>
            <div className="title letter-spacing-large large d-flex justify-content-center align-items-center">MATRIX MAZE</div>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                {!mazeCreator ? <button className={appear ? 'create-maze-button create-maze-btn-appear':'create-maze-button'} onClick={handleClick}>Create Maze</button> : null}
                {mazeCreator ? <MazeCreator closeMazeCreator={closeMazeCreator}></MazeCreator> : null}
            </div>
        </>
    )
}