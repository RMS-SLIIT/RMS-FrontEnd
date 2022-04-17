import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import { Button, Divider, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { employeDeleteSuccess } from "../../../helper/helper";
import {
    deleteEmployeeByID,
    getAllEmployee
} from "../../../services/employee/employeeServices";
import { deleteConfirmMsg } from "../../../utils/messages";
import CustomCard from "../../atoms/CustomCard/CustomCard";
import CustomTable from "../../atoms/Table/CustomTable";
import AddEmployee from "./AddEmployee";

function Employee() {
    const [addVisible, setAddVisible] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState();

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
            key: "employeeId"
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
            key: "mobileNumber"
        },
        {
            title: "Job Post",
            dataIndex: "jobPost",
            key: "jobPost"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address"
        },
        {
            title: "Date Of Birth",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth"
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
                    onClick={() => showAddEmployee()}
                    style={{ marginLeft: 1150 }}
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
                ) : (
                    <></>
                )}
            </CustomCard>
        </div>
    );
}

export default Employee;
