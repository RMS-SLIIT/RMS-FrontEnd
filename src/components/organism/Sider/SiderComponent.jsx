import { Layout, Menu } from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { useState } from "react";
import "./SiderComponent.css";
import Banquet from "../../pages/banquet/Banquet";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderComponent() {
    var currentYear = new Date().getFullYear();

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">
                    <p
                        style={{
                            color: "white",
                            fontSize: 35,
                            fontWeight: 600,
                            fontFamily: "cursive",
                            marginLeft: 40
                        }}
                    >
                        RMS
                    </p>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
                    </Menu.Item>
                    <Menu.Item key="10" icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                />
                <Content style={{ margin: "0 16px" }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360 }}
                    >
                        <Banquet />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    RMS {currentYear} Created by Rishi|Siva|Janani|Ramya
                </Footer>
            </Layout>
        </Layout>
    );
}

export default SiderComponent;
