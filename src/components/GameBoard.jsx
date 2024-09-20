

export default function GameBoard({ onSelectSquare, board }) {

    

    // const [ gameBoard , setGameBoard ] = useState(initialGameBoard);

    // function handleSelect(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArr => [...innerArr])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((item, colIndex) => 
                            <li key={colIndex}><button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={item !== null}>{item}</button></li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}