import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const HeaderComponent = () => (
  <Header>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ flex: 1 }}
      >
        <Menu.Item key="1">
          <Link to="/">Главная</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/games">Игры</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/players">Игроки</Link>
        </Menu.Item>
      </Menu>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}
      >
        <Menu.Item key="4">
          <Link to="/login">Вход</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/register">Регистрация</Link>
        </Menu.Item>
      </Menu>
    </div>
  </Header>
);

export default HeaderComponent;
