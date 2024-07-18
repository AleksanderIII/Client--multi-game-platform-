import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setPlayerReady, startGame } from "../../store/slices/lobby";
import { useWebSocket } from "../../context/WebSocketContext";
import { Button, Card } from "antd";

const PersonalLobby: React.FC = () => {
  const players = useSelector((state: RootState) => state.lobby.players);
  const player = useSelector((state: RootState) => state.auth.username);
  const personalLobbyId = useSelector(
    (state: RootState) => state.lobby.personalLobbyId
  );
  const isPlayerReady = useSelector(
    (state: RootState) => state.lobby.isPlayerReady
  );
  const dispatch = useDispatch();
  const { sendMessage, addMessageListener } = useWebSocket();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "START_GAME" && data.game === "Tic tac toe") {
        dispatch(startGame()); // Вызываем экшн для обновления состояния
      }
    };

    // Добавляем слушатель для сообщений WebSocket
    addMessageListener(handleMessage);

    return () => {
      // Удаляем слушатель при размонтировании компонента
      //   removeMessageListener(handleMessage);
    };
  }, [dispatch, addMessageListener]);

  const handleReady = () => {
    if (player) {
      dispatch(setPlayerReady(player));
      sendMessage({
        type: "PLAYER_READY",
        game: "Tic tac toe",
        personalLobbyId,
        player,
      });
    }
  };

  return (
    <div>
      <h1>Personal Lobby</h1>
      <p>Игроки:</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {players
          .filter((item) => item !== player)
          .map((p) => (
            <Card
              key={p}
              style={{ width: 300, margin: "10px" }}
              actions={[
                <Button
                  type="primary"
                  onClick={handleReady}
                  disabled={isPlayerReady}
                >
                  {isPlayerReady ? "Готов!" : "Подтвердить готовность"}
                </Button>,
              ]}
            >
              <Card.Meta title={p} />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default PersonalLobby;
