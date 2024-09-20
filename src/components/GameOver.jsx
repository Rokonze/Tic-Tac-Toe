export default function GameOver ( {winner , onRematch} ) {
    return (
        <div id="game-over">
            <h2>GAME OVER!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It is a draw!</p>}
            <p><button onClick={onRematch}>Rematch!</button></p>
        </div>
    )
}