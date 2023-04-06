import { useState, useEffect } from 'react';
import './component styles/commonStyles.css'
import './component styles/matrix.css'

export default function Matrix(props) {

    const [rows, setRows] = useState(props.rows)
    const [columns, setColumns] = useState(props.columns)
    const [matrixDataState, setMatrixDataState] = useState([[true]]);

    var matrixData = []; 

    useEffect(() => {
        console.log('use effect called')
        setRows(props.rows)
        setColumns(props.columns)
        for (let i = 0; i < props.rows; i++) {
            let row = [];
            for (let j = 0; j < props.columns; j++) {
                if (matrixDataState !== undefined && matrixDataState[i] !== undefined && matrixDataState[i][j] !== undefined) {    
                    row[j] = matrixDataState[i][j]    
                }
                else {        
                    row[j] = true
                }
            }
            matrixData[i] = row;
        }
        setMatrixDataState(matrixData);
    }, [props.rows, props.columns])


    function handleCellClick(event) {

        let cell = event.target;

        if (cell.style.backgroundColor === 'rgb(247, 247, 247)')
            cell.style.backgroundColor = '#131C2B'
        else
            cell.style.backgroundColor = 'rgb(247, 247, 247)'

        if (cell.style.transform === 'rotateY(0deg)')
            cell.style.transform = 'rotateY(180deg)'
        else
            cell.style.transform = 'rotateY(0deg)'

        let r = Number.parseInt(cell.getAttribute('r'))
        let c = Number.parseInt(cell.getAttribute('c'))

        matrixData = matrixDataState
        matrixData[r][c] = !matrixData[r][c];

        setMatrixDataState(matrixData)

        // console.log(matrixData)
    }

    var cellStyles = {
        backgroundColor: 'rgb(247, 247, 247)',
        transform: 'rotateY(0deg)',
        width: '100%',
        height: '100%'
    }
    const rowStyles = {
        height: '25px'
    }

    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let cells = [];
        for (let j = 0; j < columns; j++) {
            cells.push(<div className="cell" onClick={handleCellClick} style={cellStyles} r={i} c={j} key={j}></div>);
        }
        let row = <div className='row d-flex justify-content-center align-items-center' style={rowStyles} key={i}>{cells}</div>
        matrix.push(row)
    }

    return (
        <div className='matrix d-flex flex-column justify-content-center align-items-center'>            
            {matrix}
        </div>
    );
}

Matrix.defaultProps = {
    rows: 0,
    columns: 0
}