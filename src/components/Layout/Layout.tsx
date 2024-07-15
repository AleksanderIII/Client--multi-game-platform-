import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./Layout.less"; // Подключаем стили

const { Header, Content, Footer } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Главная</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/games">Игры</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/players">Игроки</Link>
          </Menu.Item>
          <Menu.Item key="4" style={{ float: "right" }}>
            <Link to="/login">Вход</Link>
          </Menu.Item>
          <Menu.Item key="5" style={{ float: "right" }}>
            <Link to="/register">Регистрация</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Outlet /> {/* Место для отображения текущего контента */}
        </div>
      </Content>
      <Footer style={{ textAlign: "center", borderTop: "1px solid" }}>
        ©2024 Created by Aleksandr Matyushik
      </Footer>
    </Layout>
  );
};

export default AppLayout;
