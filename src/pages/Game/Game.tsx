import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lobby from "../../components/Lobby/Lobby";
import PersonalLobby from "../../components/PersonalLobby/PersonalLobby";
import { useWebSocket } from "../../context/WebSocketContext";
import {
  playerJoined,
  playerLeft,
  setSelectedOpponent,
  startGame,
} from "../../store/slices/lobby";
import { RootState } from "../../store";
import {
  setGameId,
  updateBoard,
  setCurrentPlayer,
  setWinner,
  startGame as startTicTacToeGame,
  setPlayerSymbols,
} from "../../store/slices/ticTacToe";
import TicTacToe from "./TIcTacToe/TicTacToe";
import Chat from "../../components/Chat/Chat";

const Game: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.auth.username);
  const gameReady = useSelector((state: RootState) => state.lobby.gameReady);
  const selectedOpponent = useSelector(
    (state: RootState) => state.lobby.selectedOpponent
  );
  const personalLobbyId = useSelector(
    (state: RootState) => state.lobby.personalLobbyId
  );
  const { sendMessage, addMessageListener } = useWebSocket();

  useEffect(() => {
    if (player) {
      dispatch(playerJoined(player));
      sendMessage({
        type: "JOIN_LOBBY",
        game: decodeURIComponent(id || ""),
        player,
      });
    }
    return () => {
      if (player) {
        dispatch(playerLeft(player));
        sendMessage({
          type: "LEAVE_LOBBY",
          game: decodeURIComponent(id || ""),
          player,
        });
      }
    };
  }, [dispatch, player, sendMessage, id]);

  useEffect(() => {
    const handleGameUpdate = (message: MessageEvent) => {
      const data = JSON.parse(message.data);
      if (data.type === "GAME_STARTED") {
        dispatch(startTicTacToeGame());
        dispatch(setGameId(decodeURIComponent(id || "")));
        dispatch(updateBoard(data.state.board));
        dispatch(setCurrentPlayer(data.state.currentPlayer));
        dispatch(setPlayerSymbols(data.state.playerSymbols));
        dispatch(startGame()); // Устанавливаем gameReady в true
      } else if (data.type === "GAME_UPDATE") {
        dispatch(updateBoard(data.state.board));
        dispatch(setCurrentPlayer(data.state.currentPlayer));
        dispatch(setWinner(data.state.winner));
      } else if (data.type === "OPPONENT_SELECTED" && data.player === player) {
        dispatch(setSelectedOpponent(data.opponent));
      }
    };

    addMessageListener(handleGameUpdate);

    return () => {
      // Cleanup if needed
    };
  }, [dispatch, id, addMessageListener, player]);

  return (
    <>
      {gameReady ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            columnGap: "10px",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <TicTacToe player={player || ""} />
          <Chat id={id!} player={player || ""} game={"Tic tac toe"} />
        </div>
      ) : personalLobbyId ? (
        <PersonalLobby />
      ) : (
        <Lobby selectedOpponent={selectedOpponent} />
      )}
    </>
  );
};

export default Game;
