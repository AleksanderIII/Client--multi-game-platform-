import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const GameComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [winner, setWinner] = useState<string | null>(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://localhost:5000"
  );

  useEffect(() => {
    // Подключение к игре при загрузке компонента
    sendJsonMessage({ type: "join", gameId: "some_game_id" });
  }, []);

  useEffect(() => {
    if (lastJsonMessage) {
      const { type, board, currentPlayer, winner } = lastJsonMessage;

      if (type === "start") {
        setIsLoading(false); // Показать игровое поле, когда игра началась
        setBoard(board);
        setCurrentPlayer(currentPlayer);
        setWinner(winner);
      } else if (type === "move") {
        setBoard(board);
        setCurrentPlayer(currentPlayer);
        setWinner(winner);
      } else if (type === "error") {
        // Обработка ошибок, если необходимо
      }
    }
  }, [lastJsonMessage]);

  const handleClick = (row: number, col: number) => {
    // Обработка клика по ячейке игрового поля
    sendJsonMessage({
      type: "move",
      gameId: "some_game_id",
      move: { row, col },
    });
  };

  const resetGame = () => {
    setIsLoading(true);
    setBoard([]);
    setCurrentPlayer("");
    setWinner(null);
    sendJsonMessage({ type: "join", gameId: "some_game_id" });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Tic Tac Toe</h1>
          <div className="board">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="cell"
                    onClick={() => handleClick(rowIndex, colIndex)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {winner ? (
            <div className="winner">
              <h2>Winner: {winner}</h2>
              <button onClick={resetGame}>Play Again</button>
            </div>
          ) : (
            <div className="turn">Next player: {currentPlayer}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameComponent;
