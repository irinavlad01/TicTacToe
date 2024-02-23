import React from "react"

function GameBoard({onPlayerSwitch, board}) { //, currentPlayerSymbol as prop
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard(prevGameBoard => {
    //             const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])] //brand new array full of brand new nested arrays
    //             updatedGameBoard[rowIndex][colIndex] = currentPlayerSymbol;
    //             return updatedGameBoard;
    //     });

    //     onPlayerSwitch();
    // }
    //anonymous function so that it doesn't execute immediatly inside onClick
    //in the onClick event it used to be () => handleSelectSquare(rowIndex, colIndex), which also filled the boxes with the right symbol


  return (
    <ol id='game-board'>
        {board.map((row, rowIndex) => (
        <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => (<li key={colIndex}>
                    <button onClick={() => onPlayerSwitch(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button> 
                </li>))}
            </ol>
        </li>
        ))}
    </ol>
  )
}

export default GameBoard
