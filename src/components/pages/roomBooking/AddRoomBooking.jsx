import React, { useState } from "react";
import { Form, Col, Row, DatePicker, InputNumber } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";

import { phoneNumberRegex, nicRegex } from "../../../utils/regex";
import { addRoomBookingDetails } from "../../../services/roomBooking/roomBookingServices";
import { Notification } from "../../../helper/helper";

const AddRoomBooking = (props) => {
    const [dateOfEvent, setDateOfEvent] = useState();
    const [checkIns, setCheckIns] = useState();
    const dateFormat = "YYYY-MM-DD";
    const {
        getRoomBookingDetails,
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
        addRoomBookingDetails(values)
            .then((res) => {
                console.log(res);
                Notification("Room Booking Detail Added");

                setAddVisible(false);
                getRoomBookingDetails();
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
                    className="addRoomBooking"
                    initialValues={{ remember: true }}
                >
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        required: true,
                                        max: 30,
                                        message:
                                            "Sorry you are exceeding the limit!"
                                    }
                                ]}
                                label="Name :  "
                                name="fullName"
                            >
                                <Input placeholder="Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: "Number Of Person"
                                    }
                                ]}
                                label="No of Person:  "
                                name="noOfPerson"
                            >
                                <InputNumber
                                    min={1}
                                    max={3}
                                    placeholder="No Of Person"
                                />
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
                                name="checkInDate"
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
                                name="checkOutDate"
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

export default AddRoomBooking;
