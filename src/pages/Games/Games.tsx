import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { fetchGamesStart } from "../../store/slices/game";
import { Card, Row, Col, Spin, Alert, Tag } from "antd";
import "./Games.less"; // Создайте файл стилей для дополнительной стилизации

const { Meta } = Card;

const Games: React.FC = () => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.games.list);
  const loading = useSelector((state: RootState) => state.games.loading);
  const error = useSelector((state: RootState) => state.games.error);

  useEffect(() => {
    dispatch(fetchGamesStart());
  }, [dispatch]);

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="games-container">
      <Row gutter={[16, 16]}>
        {games.length ? (
          games.map((game) => (
            <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
              <Card className="game-card" bordered={false}>
                <div className="card-content">
                  <div className="card-cover">
                    <img
                      alt={game.name}
                      src={game.imageUrl || "./images/no_image.png"}
                    />
                  </div>
                  <Meta
                    title={game.name}
                    description={
                      <>
                        <p>
                          <strong>Genre:</strong> {game.genre}
                        </p>
                        <p>
                          <strong>Release Date:</strong>{" "}
                          {game.releaseDate
                            ? new Date(game.releaseDate).toLocaleDateString()
                            : "TBA"}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          <Tag color={game.isReleased ? "green" : "red"}>
                            {game.isReleased ? "Released" : "Unreleased"}
                          </Tag>
                        </p>
                      </>
                    }
                  />
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <p>No data</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Games;
