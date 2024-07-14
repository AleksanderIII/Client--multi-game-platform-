import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setPlayers } from "../../store/slices/player";
import { useNavigate } from "react-router-dom";
import { Card, Row } from "antd";

import "./Players.less";

const { Meta } = Card;

const Players: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const players = useSelector((state: RootState) => state.players);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Редирект на страницу входа, если не аутентифицирован
      return;
    }

    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/players", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setPlayers(data));
        } else {
          // Обработка ошибок
          console.error("Failed to fetch players");
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, [dispatch, isAuthenticated, navigate, token]);

  if (!players) {
    return <div>Loading...</div>;
  }

  return (
    <div className="site-card-wrapper">
      <h1>List of Players</h1>
      <div className="players-grid">
        {players.map((player: any) => (
          <div key={player.id}>
            <Card
              title={player.name}
              hoverable
              cover={
                <img
                  alt={player.name}
                  style={{
                    width: "auto",
                    height: "150px",
                    objectFit: "cover",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  src={
                    player.imageUrl ? player.imageUrl : "/images/no_image.png"
                  }
                />
              } // Замените на свою логику для изображения
            >
              <Meta
                description={
                  <div>
                    <p>Age: {player.age}</p>
                    <p>Team: {player.team}</p>
                  </div>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
