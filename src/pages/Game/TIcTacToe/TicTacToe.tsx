import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useWebSocket } from "../../../context/WebSocketContext";
import { updateBoard } from "../../../store/slices/ticTacToe";
import { HeartFilled, StarFilled } from "@ant-design/icons";

import "./TicTacToe.less";

interface TicTacToeProps {
  player: string;
}

const SYMBOLS: { [key: string]: JSX.Element } = {
  X: <HeartFilled className="icon--X" />,
  O: <StarFilled className="icon--O" />,
};

const TicTacToe: React.FC<TicTacToeProps> = ({ player }) => {
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.ticTacToe.board);
  const currentPlayer = useSelector(
    (state: RootState) => state.ticTacToe.currentPlayer
  );
  const winner = useSelector((state: RootState) => state.ticTacToe.winner);
  const gameStarted = useSelector(
    (state: RootState) => state.ticTacToe.gameStarted
  );
  const gameId = useSelector((state: RootState) => state.ticTacToe.gameId);
  const playersSymbols = useSelector(
    (state: RootState) => state.ticTacToe.playerSymbols
  );
  const { sendMessage } = useWebSocket();

  const handleCellClick = (index: number) => {
    if (
      !gameStarted ||
      board[index] !== "" ||
      winner ||
      currentPlayer !== player
    ) {
      return;
    }

    sendMessage({
      type: "MAKE_MOVE",
      game: gameId,
      player,
      move: {
        row: Math.floor(index / 15),
        col: index % 15,
      },
    });

    dispatch(updateBoard(board));
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            className={`cell${cell === "X" ? " cell--X" : ""}${
              cell === "O" ? " cell--O" : ""
            }`}
            key={index}
            onClick={() => handleCellClick(index)}
          >
            {SYMBOLS[cell] || cell}
          </div>
        ))}
      </div>
      {winner && (
        <h2>
          Winner:{" "}
          {Object.keys(playersSymbols).filter(
            (item) => playersSymbols[item] === winner
          )}
        </h2>
      )}
    </div>
  );
};

export default TicTacToe;
