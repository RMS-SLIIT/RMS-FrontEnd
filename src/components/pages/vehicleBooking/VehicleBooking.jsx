import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Input, Popconfirm, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
    convertSearchUrl,
    VehicleBookingDeleteSuccess,
} from "../../../helper/helper";
import {
    deleteVehicleBookingDetailsById,
    getAllVehicleBookingDetails,
    getTableMulitiSearch,
} from "../../../services/vehicleBooking/vehicleBookingServices.js";

import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddVehicleBooking from "./AddVehicleBooking";
import EditVehicleBooking from "./EditVehicleBooking";
import Highlighter from "react-highlight-words";

function VehicleBooking() {
    const [addVisible, setAddVisible] = useState(false);
    const [vehicleBookingDetails, setVehicldeBookingDetails] = useState();
    const [searchText, setSearchText] = useState();
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState("");

    const [searchUrl, setSearchUrl] = useState({
        nic: "",
    });
    const searchInput = useRef();

    useEffect(() => {
        getVehicleBookingDetails();
    }, []);

    const cancel = (e) => {};

    const getVehicleBookingDetails = () => {
        getAllVehicleBookingDetails()
            .then((data) => {
                console.log(data);
                setVehicldeBookingDetails(data);
            })
            .catch((err) => {});
    };

    const onChangeSearch = (e, dataIndex) => {
        const { value } = e.target;
        setSearchedColumn(dataIndex);
        let updateUrl = {
            id: dataIndex === "id" ? value : searchUrl.id,
            nic: dataIndex === "nic" ? value : searchUrl.nic,
        };
        setSearchUrl(updateUrl);
        searchApi(updateUrl);
    };

    const searchApi = (updateUrl) => {
        let searchName = convertSearchUrl(updateUrl);
        getTableMulitiSearch("vehiclebookingsearch", searchName).then(
            (data) => {
                setVehicldeBookingDetails(data);
            }
        );
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        searchApi(searchUrl);
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        let updateUrl = {
            id: dataIndex === "id" ? "" : searchUrl.id,
            nic: dataIndex === "nic" ? "" : searchUrl.nic,
        };
        setSearchUrl(updateUrl);
        searchApi(updateUrl);
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div className="tabel-search-popup">
                <Row gutter={10} className="tabel-search-popup-row-one">
                    <Col span={24}>
                        {
                            <Input
                                tableSearch
                                ref={searchInput}
                                width="100%"
                                placeholder={
                                    dataIndex === "nic" ? "Search NIC" : ""
                                }
                                value={searchUrl[dataIndex]}
                                onChange={(e) => onChangeSearch(e, dataIndex)}
                                onPressEnter={() =>
                                    handleSearch(
                                        selectedKeys,
                                        confirm,
                                        dataIndex
                                    )
                                }
                            />
                        }
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={12}>
                        <Button
                            tableSearch
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys, confirm, dataIndex)
                            }
                            icon={<SearchOutlined />}
                            size="small"
                        >
                            Search
                        </Button>
                    </Col>
                    <Col span={12}>
                        {" "}
                        <Button
                            tableSearch
                            onClick={() => handleReset(clearFilters, dataIndex)}
                            size="small"
                        >
                            Reset
                        </Button>
                    </Col>
                </Row>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color:
                        searchUrl[dataIndex] && searchUrl[dataIndex].length > 0
                            ? "#1890ff"
                            : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : "",

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchUrl[dataIndex]]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const confirmDelete = (id) => {
        console.log("id is :" + id);
        deleteVehicleBookingDetailsById(id).then(
            (res) => {
                console.log(res);
                getVehicleBookingDetails();
                VehicleBookingDeleteSuccess();
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const handleEditOk = () => {
        setEditVisible(false);
    };
    const handleEditCancel = () => {
        setEditVisible(false);
    };

    const showEdit = (record) => {
        setEditData({ ...record });
        setEditVisible(true);
    };

    const showAddVehicleBooking = () => {
        setAddVisible(true);
    };

    const handleAddOk = () => {
        setAddVisible(false);
    };
    const handleAddCancel = () => {
        setAddVisible(false);
    };
    const columns = [
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
            key: "mobileNumber",
        },
        {
            title: "No Of Km ",
            dataIndex: "noOfKm",
            key: "noOfKm",
        },
        {
            title: "Check In",
            dataIndex: "checkIn",
            key: "checkIn",
        },
        {
            title: "Check Out ",
            dataIndex: "checkOut",
            key: "checkOut",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Cost",
            dataIndex: "cost",
            key: "cost",
        },
        {
            title: "NIC",
            dataIndex: "nic",
            key: "nic",
            ...getColumnSearchProps("nic"),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record = vehicleBookingDetails) => (
                <span key={record.id}>
                    <EditOutlined
                        style={{ fontSize: "18px", color: "blue" }}
                        onClick={() => showEdit(record)}
                    />

                    <Divider type="vertical" />
                    <Popconfirm
                        title={deleteConfirmMsg}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: "red",
                                }}
                            />
                        }
                        onConfirm={() => confirmDelete(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{
                                color: "red",
                                fontSize: "18px",
                            }}
                        />
                    </Popconfirm>
                </span>
            ),
        },
    ];
    return (
        <div>
            <CustomCard width="100%" manage>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => showAddVehicleBooking()}
                    style={{ marginLeft: 950 }}
                >
                    Add
                </Button>
                <CustomTable
                    columns={columns}
                    dataSource={vehicleBookingDetails}
                />
                {addVisible ? (
                    <AddVehicleBooking
                        getVehicleBookingDetails={getVehicleBookingDetails}
                        setAddVisible={setAddVisible}
                        visible={addVisible}
                        handleOk={handleAddOk}
                        handleCancel={handleAddCancel}
                    />
                ) : editVisible ? (
                    <EditVehicleBooking
                        getVehicleBookingDetails={getVehicleBookingDetails}
                        setEditVisible={setEditVisible}
                        editData={editData}
                        visible={editVisible}
                        handleOk={handleEditOk}
                        handleCancel={handleEditCancel}
                    />
                ) : (
                    <></>
                )}
            </CustomCard>
        </div>
    );
}

export default VehicleBooking;
