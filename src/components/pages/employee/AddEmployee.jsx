import React, { useState } from "react";
import { Form, Row, Col, DatePicker } from "antd";
import { empIdRegex, phoneNumberRegex } from "../../../utils/regex";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import { addEmployee } from "../../../services/employee/employeeServices";
import { employeeAddSuccess, Notification } from "../../../helper/helper";
import "./AddEmployee.css";

const AddEmployee = (props) => {
    const [dateOfBirth, setDateOfBirth] = useState();
    const dateFormat = "YYYY-MM-DD";

    const {
        getAllEmployeeData,
        viewData,
        setAddVisible,
        visible,
        handleOk,
        handleCancel
    } = props;

    const [form] = Form.useForm();

    let show = visible;
    form.setFieldsValue(viewData && viewData);

    const onFinish = (values) => {
        console.log("Success:", values);
        addEmployee(values)
            .then((res) => {
                console.log(res);
                Notification("New Employee Detail Added");

                setAddVisible(false);
                getAllEmployeeData();
            })
            .catch((err) => {
                console.log(err);
            });

        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const dateOnChange = (value, dateString) => {
        setDateOfBirth(dateString);
    };

    return (
        <Modal
            action="form"
            width="900px"
            title="Add Employee"
            visibleModal={show}
            className="addEmployee"
            handleOk={handleOk}
            handleCancel={handleCancel}
            body={
                <div>
                    <Form
                        id="form"
                        form={form}
                        name="addemp"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >
                        <Row>
                            <Col span={12} style={{ padding: "5px" }}>
                                <Form.Item
                                    label="Employee ID"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter employee ID"
                                        },
                                        {
                                            pattern: new RegExp(empIdRegex),
                                            message:
                                                "Use valid format eg - Emp-001,Emp_001,Emp:001"
                                        },
                                        {
                                            message:
                                                "Sorry you are exceeding the limit!",
                                            max: 20
                                        }
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
                                            message: "Enter valid mobile number"
                                        }
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

                                            message: "Enter valid email address"
                                        },
                                        {
                                            required: true,
                                            message: "Enter email address"
                                        }
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
                                            message: "Enter Job Post"
                                        },
                                        {
                                            max: 20,
                                            message:
                                                "Sorry you are exceeding the limit"
                                        }
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
                                                "Sorry you are exceeding the limit!"
                                        }
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

                            <Col span={12} style={{ padding: "5px" }}>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Select Date of Birth"
                                        }
                                    ]}
                                    label="Date Of Birth :  "
                                    name="dateOfBirth"
                                >
                                    <DatePicker
                                        allowClear={true}
                                        onChange={dateOnChange}
                                        placeholder="Event Date"
                                        showNow={true}
                                        disabledTime={true}
                                        format={dateFormat}
                                        inputReadOnly={true}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            }
        />
    );
};
export default AddEmployee;
