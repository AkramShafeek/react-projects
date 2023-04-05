import './component styles/home.css'

export default function () {
    return (
        <>
            <div className="title letter-spacing-large large d-flex justify-content-center align-items-center">MATRIX MAZE</div>
            <div className="d-flex justify-content-center align-items-center" style={{height:'100%'}}>
                <button className='create-maze-button'>Create Maze</button>
            </div>
        </>
    )
}