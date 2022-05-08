import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Popconfirm, Col, Row, Input } from "antd";
import React, { useEffect, useState, useRef } from "react";
import {
    convertSearchUrl,
    transportDeleteSuccess,
} from "../../../helper/helper";
import { inventoryDeleteSuccess } from "../../../helper/helper";
import {
    getTableMulitiSearch,
    deleteTransportById,
    getAllTransport,
} from "../../../services/Transport/transportServices";
import Highlighter from "react-highlight-words";
import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddTransport from "./AddTransport";
import EditTransport from "./EditTransport";

function Transport() {
    const [addVisible, setAddVisible] = useState(false);
    const [searchText, setSearchText] = useState();
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState("");
    const [transportDetails, setTransportDetails] = useState();
    const [total, setTotal] = useState(0);

    const [searchUrl, setSearchUrl] = useState({
        vehicleType: "",
    });
    const searchInput = useRef();
    useEffect(() => {
        getTransportDetails();
    }, []);

    const cancel = (e) => {};

    const getTransportDetails = () => {
        let total = 0;
        getAllTransport()
            .then((data) => {
                console.log(data);
                setTransportDetails(data);
                data.map((tot) => {
                    total = tot.cost + total;
                });
                setTotal(total);
            })
            .catch((err) => {});
    };
    const onChangeSearch = (e, dataIndex) => {
        const { value } = e.target;
        setSearchedColumn(dataIndex);
        let updateUrl = {
            id: dataIndex === "id" ? value : searchUrl.id,
            vehicleType:
                dataIndex === "vehicleType" ? value : searchUrl.vehicleType,
        };
        setSearchUrl(updateUrl);
        searchApi(updateUrl);
    };

    const searchApi = (updateUrl) => {
        let searchName = convertSearchUrl(updateUrl);
        getTableMulitiSearch("transportsearch", searchName).then((data) => {
            setTransportDetails(data);
        });
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
            vehicleType:
                dataIndex === "vehicleType" ? "" : searchUrl.vehicleType,
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
                                    dataIndex === "vehicleType"
                                        ? "Search vehicleType"
                                        : ""
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
        deleteTransportById(id).then(
            (res) => {
                console.log(res);
                getTransportDetails();
                transportDeleteSuccess();
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

    const showAddTransport = () => {
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
            title: "Vehicle Type",
            dataIndex: "vehicleType",
            key: "vehicleType",
            ...getColumnSearchProps("vehicleType"),
        },

        {
            title: "Vehicle Name",
            dataIndex: "vehicleName",
            key: "vehicleName",
        },
        {
            title: "Cost",
            dataIndex: "cost",
            key: "cost",
        },
        {
            title: "Vehicle Facilities",
            dataIndex: "vehiclefacilities",
            key: "vehiclefacilities",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record = transportDetails) => (
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
        <>
            <div>
                <CustomCard width="100%" manage>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => showAddTransport()}
                        style={{ marginLeft: 950 }}
                    >
                        Add
                    </Button>
                    <CustomTable
                        columns={columns}
                        dataSource={transportDetails}
                    />
                    {addVisible ? (
                        <AddTransport
                            getTransportDetails={getTransportDetails}
                            setAddVisible={setAddVisible}
                            visible={addVisible}
                            handleOk={handleAddOk}
                            handleCancel={handleAddCancel}
                        />
                    ) : editVisible ? (
                        <EditTransport
                            getTransportDetails={getTransportDetails}
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
            <div>Total Cost {total}</div>
        </>
    );
}

export default Transport;
