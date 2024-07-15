import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Spin, Alert } from "antd";
import { RootState } from "../../store";
import { fetchPlayers } from "../../store/slices/player";
import { Player } from "../../models";

const Players: React.FC = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.players.list);
  const loading = useSelector((state: RootState) => state.players.loading);
  const error = useSelector((state: RootState) => state.players.error);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message={`Error: ${error}`} type="error" />;
  }

  return (
    <div>
      <h2>Players</h2>
      <List
        dataSource={players}
        renderItem={(player: Player) => (
          <List.Item key={player.id}>
            <List.Item.Meta
              title={player.name}
              description={`Age: ${player.age}, Team: ${player.team}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Players;
