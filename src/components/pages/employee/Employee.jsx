import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Input, Popconfirm, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { convertSearchUrl, employeDeleteSuccess } from "../../../helper/helper";
import {
    deleteEmployeeByID,
    getAllEmployee,
    getTableMulitiSearch,
} from "../../../services/employee/employeeServices";
import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import Highlighter from "react-highlight-words";

function Employee() {
    const [addVisible, setAddVisible] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState();
    const [searchText, setSearchText] = useState();
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState("");

    const [searchUrl, setSearchUrl] = useState({
        jobPost: "",
    });
    const searchInput = useRef();

    useEffect(() => {
        getAllEmployeeData();
    }, []);

    const cancel = (e) => {};

    const getAllEmployeeData = () => {
        getAllEmployee()
            .then((data) => {
                console.log(data);
                setEmployeeDetails(data);
            })
            .catch((err) => {});
    };

    const onChangeSearch = (e, dataIndex) => {
        const { value } = e.target;
        setSearchedColumn(dataIndex);
        let updateUrl = {
            id: dataIndex === "id" ? value : searchUrl.id,
            jobPost: dataIndex === "jobPost" ? value : searchUrl.jobPost,
        };
        setSearchUrl(updateUrl);
        searchApi(updateUrl);
    };

    const searchApi = (updateUrl) => {
        let searchName = convertSearchUrl(updateUrl);
        getTableMulitiSearch("employeesearch", searchName).then((data) => {
            setEmployeeDetails(data);
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
            jobPost: dataIndex === "jobPost" ? "" : searchUrl.jobPost,
        };
        setSearchUrl(updateUrl);
        searchApi(updateUrl);
        setSearchText("");
    };

    const confirmDelete = (id) => {
        console.log("id is :" + id);
        deleteEmployeeByID(id).then(
            (res) => {
                console.log(res);
                getAllEmployeeData();
                employeDeleteSuccess();
            },
            (error) => {
                console.log(error);
            }
        );
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
                                    dataIndex === "jobPost"
                                        ? "Search jobPost"
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

    const showAddEmployee = () => {
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
            title: "Employee Id",
            dataIndex: "employeeId",
            key: "employeeId",
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
            key: "mobileNumber",
        },
        {
            title: "Job Post",
            dataIndex: "jobPost",
            key: "jobPost",
            ...getColumnSearchProps("jobPost"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Date Of Birth",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record = employeeDetails) => (
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
                    onClick={() => showAddEmployee()}
                    style={{ marginLeft: 950 }}
                >
                    Add
                </Button>
                <CustomTable columns={columns} dataSource={employeeDetails} />
                {addVisible ? (
                    <AddEmployee
                        getAllEmployeeData={getAllEmployeeData}
                        setAddVisible={setAddVisible}
                        visible={addVisible}
                        handleOk={handleAddOk}
                        handleCancel={handleAddCancel}
                    />
                ) : editVisible ? (
                    <EditEmployee
                        getAllEmployeeData={getAllEmployeeData}
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

export default Employee;
