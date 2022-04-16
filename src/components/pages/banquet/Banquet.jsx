import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import React, { useState } from "react";
import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddBanquet from "./AddBanquet";

function Banquet() {
    const dataSource = [
        {
            key: "1",
            questName: "Mike",
            mobileNumber: 777895632,
            eventType: "Wedding",
            additionalService: "N/A",
            decorations: "N/A",
            dateOfEvent: "2022-04-15"
        },
        {
            key: "2",
            questName: "John",
            mobileNumber: 777525242,
            eventType: "Birthday Party",
            additionalService: "N/A",
            decorations: "N/A",
            dateOfEvent: "2022-04-15"
        }
    ];
    const [addVisible, setAddVisible] = useState(false);

    const cancel = (e) => {};

    const confirmDelete = (id) => {
        console.log("id is :" + id);
        // deleteDesignation(id).then(
        //   (res) => {
        //     console.log(res);
        //     getAllDesignationData(currentPage, pageSize);
        //     designationDeleteSuccess();
        //     // message.success("Successfully Deleted");
        //   },
        //   (error) => {
        //     if (error.response.data) {
        //       errHandler(error.response.data);
        //       // console.log(error.response.data);
        //     }
        //   }
        // );
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
            dataIndex: "decorations",
            key: "decorations"
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
            render: (text, record = record) => (
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
                <CustomTable columns={columns} dataSource={dataSource} />
                {addVisible ? (
                    <AddBanquet
                        // getAllDesignationData={getAllDesignationData}
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
