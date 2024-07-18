import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import HeaderComponent from "../Header/Header";

import "./Layout.less";

const { Content, Footer } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout className="layout">
      <HeaderComponent />
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
