import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Input, Popconfirm, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { banquetDeleteSuccess, convertSearchUrl } from "../../../helper/helper";
import {
    deleteBanquetDetailsById,
    getAllBanquetDetails,
    getTableMulitiSearch,
} from "../../../services/banquet/banquetServices";
import { deleteConfirmMsg } from "../../../utils/messages";
import Highlighter from "react-highlight-words";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddBanquet from "./AddBanquet";
import EditBanquet from "./EditBanquet";

function Banquet() {
    const [addVisible, setAddVisible] = useState(false);
    const [banquetDetails, setBanquetDetails] = useState();
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState([]);
    const [searchText, setSearchText] = useState();
    const [searchedColumn, setSearchedColumn] = useState("");

    const [searchUrl, setSearchUrl] = useState({
        guestName: "",
    });
    const searchInput = useRef();

    useEffect(() => {
        getBanquetDetails();
    }, []);

    const cancel = (e) => {};

    const getBanquetDetails = () => {
        getAllBanquetDetails()
            .then((data) => {
                console.log(data);
                setBanquetDetails(data);
            })
            .catch((err) => {});
    };

    const onChangeSearch = (e, dataIndex) => {
        const { value } = e.target;
        setSearchedColumn(dataIndex);
        let updateUrl = {
            id: dataIndex === "id" ? value : searchUrl.id,
            guestName: dataIndex === "guestName" ? value : searchUrl.guestName,
        };
        setSearchUrl(updateUrl);
        searchApi(updateUrl);
    };

    const searchApi = (updateUrl) => {
        let searchName = convertSearchUrl(updateUrl);
        getTableMulitiSearch("banquetsearch", searchName).then((data) => {
            setBanquetDetails(data);
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
            guestName: dataIndex === "nic" ? "" : searchUrl.guestName,
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
                                    dataIndex === "guestName"
                                        ? "Search Quest Name"
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
        deleteBanquetDetailsById(id).then(
            (res) => {
                console.log(res);
                getBanquetDetails();
                banquetDeleteSuccess();
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

    const showAddBanquet = () => {
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
            title: "Guest Name",
            dataIndex: "guestName",
            key: "guestName",
            ...getColumnSearchProps("guestName"),
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
            key: "mobileNumber",
        },
        {
            title: "Event Type",
            dataIndex: "eventType",
            key: "eventType",
        },
        {
            title: "Additional Service",
            dataIndex: "additionalService",
            key: "additionalService",
        },
        {
            title: "Decorations",
            dataIndex: "decoration",
            key: "decoration",
        },
        {
            title: "Date Of Event",
            dataIndex: "dateOfEvent",
            key: "dateOfEvent",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record = banquetDetails) => (
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
                    onClick={() => showAddBanquet()}
                    style={{ marginLeft: 950 }}
                >
                    Add
                </Button>
                <CustomTable columns={columns} dataSource={banquetDetails} />
                {addVisible ? (
                    <AddBanquet
                        getBanquetDetails={getBanquetDetails}
                        setAddVisible={setAddVisible}
                        visible={addVisible}
                        handleOk={handleAddOk}
                        handleCancel={handleAddCancel}
                    />
                ) : editVisible ? (
                    <EditBanquet
                        getBanquetDetails={getBanquetDetails}
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

export default Banquet;
