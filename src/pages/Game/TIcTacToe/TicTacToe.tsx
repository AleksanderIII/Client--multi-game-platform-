import React, { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import "./TicTacToe.less";

type Player = "X" | "O";
type Cell = Player | null;
type Board = Cell[][];

const BOARD_SIZE = 15;
const WINNING_STREAK = 5;

const initialBoard: Board = Array(BOARD_SIZE)
  .fill(null)
  .map(() => Array(BOARD_SIZE).fill(null));

interface TicTacToeProps {
  playerName: string;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ playerName }) => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [myTurn, setMyTurn] = useState<boolean>(true);
  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:5000");

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.type === "move") {
        setBoard(data.board);
        setCurrentPlayer(data.currentPlayer);
        setMyTurn(data.currentPlayer !== playerName);
        const gameWinner = calculateWinner(data.board);
        if (gameWinner) {
          setWinner(gameWinner);
        }
      } else if (data.type === "start") {
        setOpponent(data.opponent);
        setMyTurn(data.currentPlayer === playerName);
      }
    }
  }, [lastMessage]);

  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner || !myTurn) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? currentPlayer : cell
      )
    );

    sendMessage(
      JSON.stringify({
        type: "move",
        board: newBoard,
        currentPlayer: currentPlayer === "X" ? "O" : "X",
      })
    );

    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    setMyTurn(false);
  };

  const calculateWinner = (board: Board): Player | null => {
    const directions = [
      { x: 1, y: 0 }, // горизонталь
      { x: 0, y: 1 }, // вертикаль
      { x: 1, y: 1 }, // диагональ вправо вниз
      { x: 1, y: -1 }, // диагональ вправо вверх
    ];

    const checkDirection = (
      x: number,
      y: number,
      dir: { x: number; y: number }
    ) => {
      const player = board[x][y];
      if (!player) return null;

      for (let i = 1; i < WINNING_STREAK; i++) {
        const newX = x + dir.x * i;
        const newY = y + dir.y * i;

        if (
          newX < 0 ||
          newY < 0 ||
          newX >= BOARD_SIZE ||
          newY >= BOARD_SIZE ||
          board[newX][newY] !== player
        ) {
          return null;
        }
      }

      return player;
    };

    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        for (const dir of directions) {
          const winner = checkDirection(x, y, dir);
          if (winner) return winner;
        }
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setMyTurn(currentPlayer === "X");
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div>
        <span>Player: {playerName}</span>
        {opponent && <span> vs {opponent}</span>}
      </div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      {winner ? (
        <div className="winner">
          <h2>Winner: {winner}</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="turn">
          {myTurn ? "Your turn" : `${opponent}'s turn`} (Current player:{" "}
          {currentPlayer})
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
