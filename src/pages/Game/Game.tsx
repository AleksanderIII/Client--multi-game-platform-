import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lobby, { generateUUID } from "../../components/Lobby/Lobby";
import PersonalLobby from "../../components/PersonalLobby/PersonalLobby";
import { useWebSocket } from "../../context/WebSocketContext";
import { playerJoined } from "../../store/slices/lobby";
import { RootState } from "../../store";
import TicTacToe from "./TIcTacToe/TicTacToe";

const Game: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.auth.username);
  const gameReady = useSelector((state: RootState) => state.lobby.gameReady);
  const personalLobbyId = useSelector(
    (state: RootState) => state.lobby.personalLobbyId
  );
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    if (player) {
      dispatch(playerJoined(player));
      sendMessage({
        type: "JOIN_LOBBY",
        game: decodeURIComponent(id || ""),
        player,
        clientID: generateUUID(),
      });
    }
    return () => {
      // Оставим комментарий на случай, если потребуется позже
      /*  
      if (player) {
        dispatch(playerLeft(player));
        sendMessage({
          type: "LEAVE_LOBBY",
          game: decodeURIComponent(id || ""),
          player,
        });
      }
      */
    };
  }, [dispatch, player, sendMessage, id]);

  const GameComponent = TicTacToe; // Замените на соответствующий компонент вашей игры

  return (
    <div>
      {gameReady ? (
        <GameComponent player={player || ""} />
      ) : personalLobbyId ? (
        <PersonalLobby />
      ) : (
        <Lobby
          handleStartGame={() =>
            sendMessage({
              type: "START_GAME",
              game: decodeURIComponent(id || ""),
              player,
            })
          }
        />
      )}
    </div>
  );
};

export default Game;
