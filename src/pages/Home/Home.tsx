import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";

import "./Home.less";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div className="home">
      <div>
        <Title level={1}>Добро пожаловать на Мульти-Игровую Платформу!</Title>
        <Paragraph>
          Здесь вы найдете множество игр различных жанров. Мы уже разработали
          классическую игру "Крестики-нолики", и в настоящее время активно
          работаем над добавлением новых игр. Следите за обновлениями!
        </Paragraph>
      </div>

      <div>
        <Title level={2}>Доступная игра</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Крестики-нолики">
              <Paragraph>
                Наслаждайтесь классической игрой "Крестики-нолики". Испытайте
                удачу и стратегическое мышление в этой вечной игре.
              </Paragraph>
              <Link to="/games/tic-tac-toe">Играть сейчас</Link>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Title level={2}>Планируемые жанры</Title>
        <div className="cards-grid">
          <Card title="Экшены">
            <Paragraph>
              Погружайтесь в мир захватывающих экшен-игр с быстрыми сражениями и
              яркими взрывами.
            </Paragraph>
          </Card>
          <Card title="Приключения">
            <Paragraph>
              Откройте для себя удивительные приключенческие игры и
              отправляйтесь в путешествие по неизвестным мирам.
            </Paragraph>
          </Card>
          <Card title="Стратегии">
            <Paragraph>
              Испытайте свои умственные способности с лучшими стратегическими
              играми. Планируйте, управляйте и побеждайте.
            </Paragraph>
          </Card>
          <Card title="Спортивные игры">
            <Paragraph>
              Самые лучшие спортивные игры, от футбола до баскетбола, от тенниса
              до гольфа.
            </Paragraph>
          </Card>
          <Card title="Головоломки">
            <Paragraph>
              Увлекательные головоломки, которые заставят вас думать и
              анализировать каждый ход.
            </Paragraph>
          </Card>
          <Card title="Ролевые игры">
            <Paragraph>
              Ролевые игры, где вы сможете стать героем в эпическом путешествии,
              полном магии и приключений.
            </Paragraph>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
