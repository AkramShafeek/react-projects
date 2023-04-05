import './component styles/commonStyles.css'
import './component styles/matrix.css'
export default function Matrix(props) {

    var matrixData = [];
    console.log(props.rows)
    console.log(props.columns)
    for(let i = 0;i<props.rows;i++)
    {
        let row = [];
        for(let j = 0;j<props.columns;j++)
        {
            row[j] = true
        }
        matrixData[i] = row;
    }

    console.log(matrixData)

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
        
        matrixData[r][c] = !matrixData[r][c];        

        console.log(matrixData)
    }
    
    const cellStyles = {
        backgroundColor: 'rgb(247, 247, 247)',
        transform: 'rotateY(0deg)',
        width: '100%',
        height: '100%'
    }
    const rowStyles = {
        height: '25px'
    }
    
    let matrix = [];
    for (let i = 0; i < props.rows; i++) {
        let cells = [];
        for (let j = 0; j < props.columns; j++) {
            cells.push(<div className="cell" onClick={handleCellClick} key={j} style={cellStyles} r={i} c={j}></div>);
        }
        let row = <div className='row d-flex justify-content-center align-items-center' key={i} style={rowStyles}>{cells}</div>
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