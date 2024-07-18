import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import {
  setPlayers,
  setSelectedOpponent,
  startPersonalLobby,
} from "../../store/slices/lobby";
import { useWebSocket } from "../../context/WebSocketContext";
import { Card, Button } from "antd";

// Функция для генерации UUID
export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface LobbyProps {
  handleStartGame: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ handleStartGame }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const player = useSelector((state: RootState) => state.auth.username);
  const players = useSelector((state: RootState) => state.lobby.players).filter(
    (item) => item !== player
  );
  const gameName = "Tic tac toe";
  const dispatch = useDispatch();
  const { sendMessage, addMessageListener } = useWebSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "LOBBY_UPDATE" && data.game === gameName) {
        dispatch(setPlayers(data.players));
      }

      if (data.type === "OPPONENT_SELECTED" && data.game === gameName) {
        dispatch(setSelectedOpponent(data.opponent));
      }

      if (data.type === "PERSONAL_LOBBY_START" && data.game === gameName) {
        dispatch(startPersonalLobby(data.personalLobbyId));
        //  navigate(`/game/${data.personalLobbyId}`); // Переход на страницу игры
      }
    };

    addMessageListener(handleMessage);

    sendMessage({
      type: "JOIN_LOBBY",
      game: gameName,
      player,
      clientID: generateUUID(),
    });

    return () => {
      /*     sendMessage({
        type: "LEAVE_LOBBY",
        game: gameName,
        player,
      });*/
    };
  }, [gameName, player, dispatch, sendMessage, addMessageListener, navigate]);

  const handlePlayerSelect = (opponent: string) => {
    setSelectedPlayer(opponent);
    sendMessage({
      type: "SELECT_OPPONENT",
      game: gameName,
      opponent,
    });
  };

  return (
    <div>
      <h1>Lobby</h1>
      {players.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {players.map((p) => (
            <Card
              key={p}
              title={p}
              style={{ width: 300, margin: "16px" }}
              actions={[
                p !== player && (
                  <Button type="primary" onClick={() => handlePlayerSelect(p)}>
                    Выбрать
                  </Button>
                ),
              ]}
            >
              <p>Описание игрока или другие данные</p>
            </Card>
          ))}
        </div>
      ) : (
        <p>Нет доступных оппонентов</p>
      )}
      {selectedPlayer && <p>Вы выбрали: {selectedPlayer}</p>}
    </div>
  );
};

export default Lobby;
