import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { banquetDeleteSuccess } from "../../../helper/helper";
import {
    deleteBanquetDetailsById,
    getAllBanquetDetails
} from "../../../services/banquet/banquetServices";
import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddBanquet from "./AddBanquet";

function Banquet() {
    const [addVisible, setAddVisible] = useState(false);
    const [banquetDetails, setBanquetDetails] = useState();

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
            key: "guestName"
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
            key: "mobileNumber"
        },
        {
            title: "Event Type",
            dataIndex: "eventType",
            key: "eventType"
        },
        {
            title: "Additional Service",
            dataIndex: "additionalService",
            key: "additionalService"
        },
        {
            title: "Decorations",
            dataIndex: "decoration",
            key: "decoration"
        },
        {
            title: "Date Of Event",
            dataIndex: "dateOfEvent",
            key: "dateOfEvent"
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
                        // onClick={() => showEdit(record)}
                    />

                    <Divider type="vertical" />
                    <Popconfirm
                        title={deleteConfirmMsg}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: "red"
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
                                fontSize: "18px"
                            }}
                        />
                    </Popconfirm>
                </span>
            )
        }
    ];
    return (
        <div>
            <CustomCard width="100%" manage>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => showAddBanquet()}
                    style={{ marginLeft: 1150 }}
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
                ) : (
                    <></>
                )}
            </CustomCard>
        </div>
    );
}

export default Banquet;
