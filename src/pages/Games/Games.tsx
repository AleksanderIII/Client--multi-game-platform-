import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setGames } from "../../store/slices/game";
import { useNavigate } from "react-router-dom";
import { Card, Row } from "antd";

import "./Games.less";

const { Meta } = Card;

const Games: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const games = useSelector((state: RootState) => state.games);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Редирект на страницу входа, если не аутентифицирован
      return;
    }

    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/games", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setGames(data));
        } else {
          // Обработка ошибок
          console.error("Failed to fetch games");
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [dispatch, isAuthenticated, navigate, token]);

  const handleClick = (id: string) => {
    navigate(`/games/${id}`);
  };

  if (!games) {
    return <div>Loading...</div>;
  }

  return (
    <div className="site-card-wrapper">
      <h1>List of Games</h1>
      <div className="games-grid">
        {games.map((game: any) => (
          <div key={game.id} onClick={() => handleClick(game.name)}>
            <Card
              title={game.name}
              hoverable
              cover={
                <img
                  alt={game.name}
                  style={{
                    width: "auto",
                    height: "150px",
                    objectFit: "cover",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  src={game.imageUrl ? game.imageUrl : "/images/no_image.png"}
                />
              } // Замените на свою логику для изображения
            >
              <Meta
                description={
                  <div>
                    <p>Genre: {game.genre}</p>
                    <p>
                      Release Date:{" "}
                      {new Date(game.releaseDate).toLocaleDateString()}
                    </p>
                    {!game.isReleased && (
                      <p style={{ color: "orange", fontWeight: "bold" }}>
                        In Development
                      </p>
                    )}
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

export default Games;
