import {  useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";



const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivedActivePlayers(gameTurns) {
  let currentPlayer = 'x';
      if(gameTurns.length > 0 && gameTurns[0].player==='x')
        currentPlayer = 'o';

  return currentPlayer;
}

function derivedWinner(gameBoard, players) {

  let winner = null;

  for( const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol];
      
    }
  }

  return winner;

}

function derivedGameBoard (gameTurns) {
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for ( const turn of gameTurns) {
      const {square, player } = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  
  const [players, setPlayers] = useState({x: 'Player 1', o: 'Player 2'});

  const [gameTurns, setGameTurns] = useState([]);
  

  const activePlayer = derivedActivePlayers(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  
  const isDraw = gameTurns.length === 9 && !winner;

  function handleRematch() {
    setGameTurns([]);
  }


  function handleSelectSquare (rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayers(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];

      return updatedTurns;
    });
  }

  function handleNameChange (symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol='x' isActive={activePlayer === 'x'} onNameChange={handleNameChange}/>
          <Player name="Player 2" symbol='o' isActive={activePlayer === 'o'} onNameChange={handleNameChange}/>
          
        </ol>
        {(winner || isDraw )&& <GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
