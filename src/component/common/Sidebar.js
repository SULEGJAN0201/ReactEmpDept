
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { TeamOutlined, ApartmentOutlined, BankOutlined } from "@ant-design/icons";
import './Sidebar.css'; // Sidebar-specific styles
import '../../styles/CommonStyle.css'

const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={handleCollapse}
            breakpoint="lg"
            className="custom-sidebar"
        >
            <div className={`logo ${collapsed ? "collapsed-logo" : "expanded-logo"}`}>
                {collapsed ? (
                    <BankOutlined className="logo-icon" style={{fontSize:"12px"}}/>
                ) : (
                    <span className="logo-text">ORGANIZATION</span>
                )}
            </div>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                className="custom-menu"
                items={[
                    {
                        key: "1",
                        icon: <TeamOutlined />,
                        label: (
                            <Link to="/employees" className="menu-link">
                                Employees
                            </Link>
                        ),
                    },
                    {
                        key: "2",
                        icon: <ApartmentOutlined />,
                        label: (
                            <Link to="/departments" className="menu-link">
                                Departments
                            </Link>
                        ),
                    },
                ]}
            />
        </Sider>
    );
};

export default Sidebar;
