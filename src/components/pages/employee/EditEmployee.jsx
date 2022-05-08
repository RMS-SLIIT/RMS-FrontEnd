import React from "react";
import { Form, Col, Row } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./AddEmployee.css";
import {
    empIdRegex,
    noSplCharRegex,
    onlyNumberRegex,
    phoneNumberRegex,
    priceRegex,
} from "../../../utils/regex";
import { updateEmployee } from "../../../services/employee/employeeServices";
import { employeUpdateSuccess } from "../../../helper/helper";

function EditEmployee(props) {
    const {
        editData,
        setEditVisible,
        visible,
        handleOk,
        handleCancel,
        getAllEmployeeData,
    } = props;
    const [form] = Form.useForm();
    let show = visible;

    form.setFieldsValue(editData && editData);

    const onFinish = (values) => {
        console.log("Success:", values);
        updateEmployee(values)
            .then((res) => {
                console.log(res);

                form.resetFields();
                employeUpdateSuccess();

                getAllEmployeeData();
                setEditVisible(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            action="form"
            width="900px"
            title="Edit Employee"
            visibleModal={show}
            className="addEmployee"
            handleOk={handleOk}
            handleCancel={handleCancel}
            body={
                <div>
                    <Form
                        id="form"
                        form={form}
                        name="editemp"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >
                        <Row>
                            <Col span={12} style={{ padding: "5px" }}>
                                <Form.Item
                                    label="Employee ID"
                                    hidden={true}
                                    name="id"
                                >
                                    <Input
                                        disabled={true}
                                        style={{ width: "70%" }}
                                        placeholder="Employee Id"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Employee ID"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter employee ID",
                                        },
                                        {
                                            pattern: new RegExp(empIdRegex),
                                            message:
                                                "Use valid format eg - Emp-001,Emp_001,Emp:001",
                                        },
                                        {
                                            message:
                                                "Sorry you are exceeding the limit!",
                                            max: 20,
                                        },
                                    ]}
                                    name="employeeId"
                                >
                                    <Input
                                        style={{ width: "70%" }}
                                        placeholder="Employee Id"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} style={{ padding: "5px" }}>
                                <Form.Item
                                    rules={[
                                        {
                                            pattern: new RegExp(
                                                phoneNumberRegex
                                            ),
                                            message:
                                                "Enter valid mobile number",
                                        },
                                    ]}
                                    label="Mobile Number :  "
                                    name="mobileNumber"
                                >
                                    <Input placeholder="07x xxxx xxx" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ padding: "5px" }}>
                                <Form.Item
                                    label="Email Id"
                                    rules={[
                                        {
                                            type: "email",

                                            message:
                                                "Enter valid email address",
                                        },
                                        {
                                            required: true,
                                            message: "Enter email address",
                                        },
                                    ]}
                                    name="email"
                                >
                                    <Input placeholder="example@example.com" />
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ padding: "5px" }}>
                                <Form.Item
                                    label="Job Post"
                                    name="jobPost"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter Job Post",
                                        },
                                        {
                                            max: 20,
                                            message:
                                                "Sorry you are exceeding the limit",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Job Post" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    rules={[
                                        {
                                            required: false,
                                            max: 100,
                                            message:
                                                "Sorry you are exceeding the limit!",
                                        },
                                    ]}
                                    label="Address :  "
                                    name="address"
                                >
                                    <Input
                                        width="100%"
                                        fullWidth
                                        placeholder="Address"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            }
        />
    );
}

export default EditEmployee;
