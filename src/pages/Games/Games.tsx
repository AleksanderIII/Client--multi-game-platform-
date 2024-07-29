import { useNavigate } from "react-router-dom";
import { Row, Col, Spin, Alert } from "antd";

import GameCard from "./GameCard";
import { RootState } from "../../store";
import useFetchData from "../../hooks/useFetchData";
import { fetchGamesStart, removeGameStart } from "../../store/slices/game";
import { Game } from "../../models";

import "./Games.less";
import { useDispatch } from "react-redux";

const Games: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: games,
    loading,
    error,
  } = useFetchData<Game[]>({
    fetchAction: fetchGamesStart,
    dataSelector: (state: RootState) => state.games.list,
    loadingSelector: (state: RootState) => state.games.loading,
    errorSelector: (state: RootState) => state.games.error,
  });

  const handleCardClick = (name: string) => {
    navigate(`/games/${name}`);
  };

  const handleDeleteClick = (id: number) => {
    dispatch(removeGameStart(id));
    console.log(`delete ${id}`);
  };

  const handleUpdateClick = (id: number) => {
    console.log(`update ${id}`);
  };

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className={"games-container"}>
      <Row gutter={[16, 16]}>
        {games.length ? (
          [...games]
            .sort((a, b) => {
              if (a.isReleased && !b.isReleased) {
                return -1;
              } else if (!a.isReleased && b.isReleased) {
                return 1;
              } else {
                return 0;
              }
            })
            .map((game) => (
              <Col key={game.id} xs={24} sm={12} md={8} lg={6}>
                <GameCard
                  key={`${game.id}-card`}
                  game={game}
                  loading={loading}
                  handleCardClick={handleCardClick}
                  handleDeleteClick={handleDeleteClick}
                  handleUpdateClick={handleUpdateClick}
                />
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
