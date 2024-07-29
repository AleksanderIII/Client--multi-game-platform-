import { memo } from "react";
import { Skeleton, Card, Tag, Button } from "antd";
import { Game } from "../../models";

const { Meta } = Card;

interface IGameCardProps {
  handleCardClick: (name: string) => void;
  handleDeleteClick: (id: number) => void;
  handleUpdateClick: (id: number) => void;
  loading: boolean;
  game: Game;
}

const GameCard = memo(
  ({
    handleCardClick,
    handleDeleteClick,
    handleUpdateClick,
    loading,
    game,
  }: IGameCardProps) => {
    return (
      <Card
        className={"game-card"}
        bordered={false}
        onClick={() => handleCardClick(game.name)}
        hoverable
      >
        {loading ? (
          <Skeleton active />
        ) : (
          <div className={"card-content"}>
            <div className={"card-cover"}>
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
                  <p className="card-controls">
                    <Button
                      type="default"
                      danger
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(game.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      type="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateClick(game.id);
                      }}
                    >
                      Update
                    </Button>
                  </p>
                </>
              }
            />
          </div>
        )}
      </Card>
    );
  }
);

export default GameCard;
