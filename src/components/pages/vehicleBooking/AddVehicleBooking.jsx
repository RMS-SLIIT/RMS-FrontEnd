import React, { useState } from "react";
import { Form, Col, Row, DatePicker } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";

import {
    noSplCharRegex,
    phoneNumberRegex,
    nicRegex
} from "../../../utils/regex";
import { addVehicleBookingtDetails } from "../../../services/vehicleBooking/vehicleBookingServices.js";
import { Notification } from "../../../helper/helper";

const AddVehicleBooking = (props) => {
    const [dateOfEvent, setDateOfEvent] = useState();
    const [checkIns, setCheckIns] = useState();
    const dateFormat = "YYYY-MM-DD";
    const {
        getVehicleBookingDetails,
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
        addVehicleBookingtDetails(values)
            .then((res) => {
                console.log(res);
                Notification("New Vehicle Detail Added");
                // banquetAddSuccess();

                setAddVisible(false);
                getVehicleBookingDetails();
            })
            .catch((err) => {
                console.log(err);
            });

        form.resetFields();
    };
    const disabledDate = (current) => {
        return current <= (checkIns, "YYYY-MM-DD");
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const dateOnChange = (value, dateString) => {
        setDateOfEvent(dateString);
        setCheckIns(dateString);
    };

    return (
        <Modal
            title="New Vehicle"
            width="900px"
            action="form"
            visibleModal={show}
            handleOk={handleOk}
            handleCancel={handleCancel}
            body={
                <Form
                    id="form"
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="addVehicle"
                    initialValues={{ remember: true }}
                >
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        max: 30,
                                        message:
                                            "Sorry you are exceeding the limit!"
                                    }
                                ]}
                                label="User Name :  "
                                name="userName"
                            >
                                <Input placeholder="User Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: "Select date Of the Event"
                                    }
                                ]}
                                label="No Of Km :  "
                                name="noOfKm"
                            >
                                <Input placeholder="No Of Km" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: "Select check in date"
                                    }
                                ]}
                                label="Check In Date :  "
                                name="checkIn"
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
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: "Select check out date"
                                    }
                                ]}
                                label="Check Out Date :  "
                                name="checkOut"
                            >
                                <DatePicker
                                    allowClear={true}
                                    onChange={dateOnChange}
                                    disabledDate={disabledDate}
                                    placeholder="Event Date"
                                    showNow={true}
                                    disabledTime={true}
                                    format={dateFormat}
                                    inputReadOnly={true}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                label="Email"
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
                                className="formItem"
                                rules={[
                                    {
                                        pattern: new RegExp(phoneNumberRegex),
                                        message: "Enter valid Mobile Number"
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
                                className="formItem"
                                label="Cost :  "
                                name="cost"
                            >
                                <Input placeholder="cost" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        pattern: new RegExp(nicRegex),
                                        message: "Enter NIC number"
                                    }
                                ]}
                                label="NIC :  "
                                name="nic"
                                nicRegex
                            >
                                <Input placeholder="NIC" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        />
    );
};

export default AddVehicleBooking;
