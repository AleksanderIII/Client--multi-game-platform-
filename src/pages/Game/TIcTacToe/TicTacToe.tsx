import React, { useState } from "react";
import "./TicTacToe.less";

interface TicTacToeProps {
  player: string;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ player }) => {
  const [board, setBoard] = useState<string[]>(Array(225).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const handleCellClick = (index: number) => {
    if (board[index] === "" && !winner) {
      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard, currentPlayer);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board: string[], player: "X" | "O") => {
    // Логика проверки победителя
  };

  return (
    <div className="tic-tac-toe">
      <h1>Welcome, {player}!</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <div className="winner">Winner: {winner}</div>}
      <div className="turn">Current turn: {currentPlayer}</div>
    </div>
  );
};

export default TicTacToe;
