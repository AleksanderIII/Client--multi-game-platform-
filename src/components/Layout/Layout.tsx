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
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/games">Games</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/players">Players</Link>
          </Menu.Item>
          <Menu.Item key="4" style={{ float: "right" }}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="5" style={{ float: "right" }}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Outlet /> {/* Место для отображения текущего контента */}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2024 Created by Your Team
      </Footer>
    </Layout>
  );
};

export default AppLayout;
