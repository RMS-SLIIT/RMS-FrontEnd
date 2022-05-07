import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { inventoryDeleteSuccess } from "../../../helper/helper";
import {
    deleteInventoryDetailsById,
    getAllInventoryDetails,
} from "../../../services/inventory/inventoryServices";
import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddInventory from "./AddInventory";
import EditInventory from "./EditInventory";

function Inventory() {
    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editData, setEditData] = useState([]);
    const [inventoryDetails, setInventoryDetails] = useState();

    useEffect(() => {
        getInventoryDetails();
    }, []);

    const cancel = (e) => {};

    const getInventoryDetails = () => {
        getAllInventoryDetails()
            .then((data) => {
                console.log(data);
                setInventoryDetails(data);
            })
            .catch((err) => {});
    };

    const confirmDelete = (id) => {
        console.log("id is :" + id);
        deleteInventoryDetailsById(id).then(
            (res) => {
                console.log(res);
                getInventoryDetails();
                inventoryDeleteSuccess();
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

    const showAddInventory = () => {
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
            title: "Supplier Name",
            dataIndex: "supplierName",
            key: "supplierName",
        },
        {
            title: "Supplier Disapplied Date",
            dataIndex: "supplierDisappliedDate",
            key: "supplierDisappliedDate",
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
            render: (text, record = inventoryDetails) => (
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
                    onClick={() => showAddInventory()}
                    style={{ marginLeft: 950 }}
                >
                    Add
                </Button>
                <CustomTable columns={columns} dataSource={inventoryDetails} />
                {addVisible ? (
                    <AddInventory
                        getInventoryDetails={getInventoryDetails}
                        setAddVisible={setAddVisible}
                        visible={addVisible}
                        handleOk={handleAddOk}
                        handleCancel={handleAddCancel}
                    />
                ) : editVisible ? (
                    <EditInventory
                        getInventoryDetails={getInventoryDetails}
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

export default Inventory;
