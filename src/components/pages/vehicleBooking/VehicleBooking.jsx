import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { VehicleBookingDeleteSuccess } from "../../../helper/helper";
import {
    deleteVehicleBookingDetailsById,
    getAllVehicleBookingDetails
} from "../../../services/vehicleBooking/vehicleBookingServices.js";

import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddVehicleBooking from "./AddVehicleBooking";

function VehicleBooking() {
    const [addVisible, setAddVisible] = useState(false);
    const [vehicleBookingDetails, setVehicldeBookingDetails] = useState();

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
            key: "userName"
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
            key: "mobileNumber"
        },
        {
            title: "No Of Km ",
            dataIndex: "noOfKm",
            key: "noOfKm"
        },
        {
            title: "Check In",
            dataIndex: "checkIn",
            key: "checkIn"
        },
        {
            title: "Check Out ",
            dataIndex: "checkOut",
            key: "checkOut"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Cost",
            dataIndex: "cost",
            key: "cost"
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
            render: (text, record = vehicleBookingDetails) => (
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
                    onClick={() => showAddVehicleBooking()}
                    style={{ marginLeft: 1150 }}
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
                ) : (
                    <></>
                )}
            </CustomCard>
        </div>
    );
}

export default VehicleBooking;
