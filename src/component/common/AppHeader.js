import React from "react";
import { Layout, Avatar, Space } from "antd";
import { SettingOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import "./AppHeader.css";

const { Header } = Layout;

const AppHeader = () => (
    <Header className="app-header">
        <Space className="header-icons">
            <BellOutlined className="header-icon" />
            <SettingOutlined className="header-icon" />
            <Avatar icon={<UserOutlined />} className="header-avatar" style={{fontSize:"12px"}}/>
        </Space>
    </Header>
);

export default AppHeader;
