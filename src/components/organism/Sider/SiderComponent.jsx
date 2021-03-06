import { Layout, Menu, Tooltip } from "antd";
import {
    LogoutOutlined,
    KeyOutlined,
    UserSwitchOutlined,
    CarOutlined,
    BulbOutlined,
    AppstoreAddOutlined,
    WindowsOutlined,
    HeatMapOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./SiderComponent.css";
import Banquet from "../../pages/banquet/Banquet";
import VehicleBooking from "../../pages/vehicleBooking/VehicleBooking";
import RoomBooking from "../../pages/roomBooking/RoomBooking";
import Employee from "../../pages/employee/Employee";
import Inventory from "../../pages/inventory/Inventory";
import Room from "../../pages/room/Room";
import Food from "../../pages/Food/Food";
import Transport from "../../pages/Transport/Transport";
import { Link, Routes, Route } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

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
                            marginLeft: 40,
                        }}
                    >
                        RMS
                    </p>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" icon={<BulbOutlined />}>
                        <Link to="/">
                            <Tooltip
                                trigger="hover"
                                placement="topRight"
                                title="Banquet"
                            >
                                Banquet
                            </Tooltip>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CarOutlined />}>
                        <Link to="/vehicleBooking">
                            <Tooltip
                                trigger="hover"
                                placement="topRight"
                                title="Vehicle Booking"
                            >
                                Vehicle Booking
                            </Tooltip>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserSwitchOutlined />}>
                        <Link to="/employee">
                            <Tooltip
                                trigger="hover"
                                placement="topRight"
                                title="Employee"
                            >
                                Employee
                            </Tooltip>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<KeyOutlined />}>
                        <Link to="/roomBooking">
                            <Tooltip
                                trigger="hover"
                                placement="topRight"
                                title="Room Booking"
                            >
                                Room Booking
                            </Tooltip>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<AppstoreAddOutlined />}>
                        <Link to="/inventory">
                            <Tooltip
                                trigger="hover"
                                placement="topRight"
                                title="Inventory"
                            >
                                Inventory
                            </Tooltip>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<WindowsOutlined />}>
                        <Link to="/rooms">
                            <Tooltip
                                trigger="hover"
                                placement="topRight"
                                title="Rooms"
                            >
                                Rooms
                            </Tooltip>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<CarOutlined />}>
                        <Link to="/transport">
                            <Tooltip
                                trigger="hover"
                                placement="topRight"
                                title="Transport"
                            >
                                Transport
                            </Tooltip>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8" icon={<HeatMapOutlined />}>
                        <Link to="/food">
                            <Tooltip
                                trigger="hover"
                                placement="topRight"
                                title="Food"
                            >
                                Food
                            </Tooltip>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="9" icon={<LogoutOutlined />}>
                        <Tooltip
                            trigger="hover"
                            placement="topRight"
                            title="Logout"
                        >
                            Logout
                        </Tooltip>
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
                        <Routes>
                            <Route path="/" element={<Banquet />} />
                            <Route
                                path="/vehicleBooking"
                                exact
                                element={<VehicleBooking />}
                            />
                            <Route
                                path="/employee"
                                exact
                                element={<Employee />}
                            />
                            <Route
                                path="/roomBooking"
                                exact
                                element={<RoomBooking />}
                            />
                            <Route
                                path="/inventory"
                                exact
                                element={<Inventory />}
                            />
                            <Route path="/rooms" exact element={<Room />} />
                            <Route
                                path="/transport"
                                exact
                                element={<Transport />}
                            />
                            <Route path="/food" exact element={<Food />} />
                        </Routes>
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
