import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Divider, Popconfirm, Col, Row, Input } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { convertSearchUrl } from "../../../helper/helper";
import { foodDeleteSuccess } from "../../../helper/helper";
import {
    getTableMulitiSearch,
    deleteFoodById,
    getAllFood,
} from "../../../services/Food/foodServices";
import Highlighter from "react-highlight-words";
import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddFood from "./AddFood";
import EditFood from "./EditFood";

function Food() {
    const [addVisible, setAddVisible] = useState(false);
    const [searchText, setSearchText] = useState();
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState("");
    const [foodDetails, setFoodDetails] = useState();
    const [total, setTotal] = useState(0);

    const [searchUrl, setSearchUrl] = useState({
        foodName: "",
    });
    const searchInput = useRef();
    useEffect(() => {
        getFoodDetails();
    }, []);

    const cancel = (e) => {};

    const getFoodDetails = () => {
        let total = 0;
        getAllFood()
            .then((data) => {
                console.log(data);
                setFoodDetails(data);
                data.map((tot) => {
                    total = total + tot.price * tot.quantity;
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
            foodName: dataIndex === "foodName" ? value : searchUrl.foodName,
        };
        setSearchUrl(updateUrl);
        searchApi(updateUrl);
    };

    const searchApi = (updateUrl) => {
        let searchName = convertSearchUrl(updateUrl);
        getTableMulitiSearch("foodsearch", searchName).then((data) => {
            setFoodDetails(data);
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
            foodName: dataIndex === "foodName" ? "" : searchUrl.foodName,
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
                                    dataIndex === "foodName"
                                        ? "Search foodName"
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
        deleteFoodById(id).then(
            (res) => {
                console.log(res);
                getFoodDetails();
                foodDeleteSuccess();
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

    const showAddFood = () => {
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
            title: "Food Name",
            dataIndex: "foodName",
            key: "foodName",
            ...getColumnSearchProps("foodName"),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record = foodDetails) => (
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
                        onClick={() => showAddFood()}
                        style={{ marginLeft: 950 }}
                    >
                        Add
                    </Button>
                    <CustomTable columns={columns} dataSource={foodDetails} />
                    {addVisible ? (
                        <AddFood
                            getFoodDetails={getFoodDetails}
                            setAddVisible={setAddVisible}
                            visible={addVisible}
                            handleOk={handleAddOk}
                            handleCancel={handleAddCancel}
                        />
                    ) : editVisible ? (
                        <EditFood
                            getFoodDetails={getFoodDetails}
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
            <div>Total Price :{total} </div>
        </>
    );
}

export default Food;
