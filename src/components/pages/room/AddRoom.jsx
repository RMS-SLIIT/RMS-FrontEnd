import React, { useState } from "react";
import { Form, Col, Row } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./AddRoom.css";
import {
    noSplCharRegex,
    onlyNumberRegex,
    phoneNumberRegex,
} from "../../../utils/regex";
import { addRoomDetail } from "../../../services/roomDetail/roomDetailServices";
import { Notification } from "../../../helper/helper";

const AddRoom = (props) => {
    const {
        getRoomDetails,
        viewData,
        setAddVisible,
        visible,
        handleOk,
        handleCancel,
    } = props;

    const [form] = Form.useForm();

    let show = visible;
    form.setFieldsValue(viewData && viewData);

    const onFinish = (values) => {
        console.log("Success:", values);
        addRoomDetail(values)
            .then((res) => {
                console.log(res);
                Notification("New Room Detail Added");

                setAddVisible(false);
                getRoomDetails();
            })
            .catch((err) => {
                console.log(err);
            });

        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            title="New Room Detail"
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
                    className="addRoom"
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
                                            "Sorry you are exceeding the limit!",
                                    },

                                    {
                                        pattern: new RegExp(noSplCharRegex),
                                        message: "Enter valid Name",
                                    },
                                ]}
                                label="Room Type :  "
                                name="roomType"
                            >
                                <Input placeholder="Room Type" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Customer Number can't be empty",
                                    },

                                    {
                                        pattern: new RegExp(phoneNumberRegex),
                                        message:
                                            "Enter valid Number Ex: 07xxxxxxxx",
                                    },
                                ]}
                                label="Customer No :  "
                                name="customerNo"
                            >
                                <Input placeholder="Customer No" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        max: 30,
                                        message:
                                            "Sorry you are exceeding the limit!",
                                    },

                                    {
                                        pattern: new RegExp(noSplCharRegex),
                                        message: "Enter valid Name",
                                    },
                                ]}
                                label="Facilities :  "
                                name="facilities"
                            >
                                <Input placeholder="Facilities" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        required: true,
                                        message: "Room Number can't be empty",
                                    },
                                    {
                                        pattern: new RegExp(onlyNumberRegex),
                                        message:
                                            "Enter valid Number (only Numbers)",
                                    },
                                ]}
                                label="Room No :  "
                                name="roomNo"
                            >
                                <Input placeholder="Room No" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        required: true,
                                        message: "Room Number can't be empty",
                                    },
                                    {
                                        pattern: new RegExp(onlyNumberRegex),
                                        message:
                                            "Enter valid Number (only Numbers)",
                                    },
                                ]}
                                label="Period :  "
                                name="period"
                            >
                                <Input placeholder="Period" />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={{ padding: "5px" }}>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        required: true,
                                        message: "Room Number can't be empty",
                                    },
                                    {
                                        pattern: new RegExp(onlyNumberRegex),
                                        message:
                                            "Enter valid Number (only Numbers)",
                                    },
                                ]}
                                label="Cost Per Day :  "
                                name="costPerDay"
                            >
                                <Input placeholder="Cost Per Day" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        />
    );
};

export default AddRoom;
