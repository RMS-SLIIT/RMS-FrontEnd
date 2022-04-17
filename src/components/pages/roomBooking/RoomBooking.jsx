import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { roomBokingDeleteSuccess } from "../../../helper/helper";
import {
    deleteRoomBookingByID,
    getAllRoomBooking
} from "../../../services/roomBooking/roomBookingServices";

import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddRoomBooking from "./AddRoomBooking";

function RoomBooking() {
    const [addVisible, setAddVisible] = useState(false);
    const [RoomBookingDetails, setRoomBookingDetails] = useState();

    useEffect(() => {
        getRoomBookingDetails();
    }, []);

    const cancel = (e) => {};

    const getRoomBookingDetails = () => {
        getAllRoomBooking()
            .then((data) => {
                console.log(data);
                setRoomBookingDetails(data);
            })
            .catch((err) => {});
    };

    const confirmDelete = (id) => {
        console.log("id is :" + id);
        deleteRoomBookingByID(id).then(
            (res) => {
                console.log(res);
                getRoomBookingDetails();
                roomBokingDeleteSuccess();
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const showAddRoomBooking = () => {
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
            title: "Name",
            dataIndex: "fullName",
            key: "fullName"
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
            key: "mobileNumber"
        },

        {
            title: "Check In Date",
            dataIndex: "checkInDate",
            key: "checkInDate"
        },
        {
            title: "Check Out Date",
            dataIndex: "checkOutDate",
            key: "checkOutDate"
        },

        {
            title: "No Of Person",
            dataIndex: "noOfPerson",
            key: "noOfPerson"
        },
        {
            title: "NIC",
            dataIndex: "nic",
            key: "nic"
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record = RoomBookingDetails) => (
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
                    onClick={() => showAddRoomBooking()}
                    style={{ marginLeft: 1150 }}
                >
                    Add
                </Button>
                <CustomTable
                    columns={columns}
                    dataSource={RoomBookingDetails}
                />
                {addVisible ? (
                    <AddRoomBooking
                        getRoomBookingDetails={getRoomBookingDetails}
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

export default RoomBooking;
