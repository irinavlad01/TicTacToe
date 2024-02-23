import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import {useState} from 'react'
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const INITIAL_GAME_BOARD = [
  [null, null, null], 
  [null, null, null], 
  [null, null, null]
];

const PLAYERS = {
  X: 'Player 1', 
  O: 'Player 2'
}

//for general constants we use the all capital letter notation, to make it more clear

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function derivedWinner(gameBoard, players){
  let winner = null;

  for (const combination of WINNING_COMBINATIONS ){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    //we've derived another computed value (the square symbols) from a computed value (gameBoard)
  
    if(firstSquareSymbol 
      && firstSquareSymbol === secondSquareSymbol
      && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol]; //dynamically accesing a property when the property is stored in a constant
      }
  }

  return winner;
}

function derivedGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
  //trebuie sa facem o copie serioasa, nu doar sa atribuim acelasi array unei alte valori.
  //trebuie o copie deep, nu doar outter array, ci si inner arrays

  for(const turn of gameTurns){ //if turns is an empty array, the loop won't execute
        const { square, player } = turn; //destructuring
        const {row, col} = square; //destructuring

        gameBoard[row][col] = player;
  } //this is a derived state. Adica din state-ul turelor de joc putem sa extragem si tabla de joc cu mutarile facute

  return gameBoard;
}

function App() {
  //const [activePlayer, setActivePlayer] = useState('X'); //used to lift state up. Both Player and GameBoard component use the active player state
  const [gameTurns, setGameTurns] = useState([]); //it will be an array full of object
  const [players, setPlayers]= useState(PLAYERS)

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns)

  const winner = derivedWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner //all the turns possible but no winner


  function handlePlayerSwitch(rowIndex, colIndex){
    //setActivePlayer(curActivePlayer => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns]; //we add the new turn in front of the old turns array, so that the first item in this array is always the latest turn

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, 
        [symbol] : newName //js syntax to set the key dynamically
      }
    })
  }

  return ( 
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'}
          onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'}
          onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onPlayerSwitch={handlePlayerSwitch} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
