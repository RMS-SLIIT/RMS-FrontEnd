import React, { useState } from "react";
import { Form, Col, Row, DatePicker } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./AddRoom.css";
import {
    noSplCharRegex,
    onlyNumberRegex,
    phoneNumberRegex,
    priceRegex,
} from "../../../utils/regex";
import { updateRoomDetail } from "../../../services/roomDetail/roomDetailServices";
import { RoomUpdateSuccess } from "../../../helper/helper";

function EditRoom(props) {
    const {
        editData,
        setEditVisible,
        visible,
        handleOk,
        handleCancel,
        getRoomDetails,
    } = props;
    const [form] = Form.useForm();
    let show = visible;

    form.setFieldsValue(editData && editData);

    const onFinish = (values) => {
        console.log("Success:", values);
        updateRoomDetail(values)
            .then((res) => {
                console.log(res);

                form.resetFields();
                RoomUpdateSuccess();

                getRoomDetails();
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
            title="Edit Room Detail"
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
                            <Form.Item label="Room ID" hidden={true} name="id">
                                <Input
                                    disabled={true}
                                    style={{ width: "70%" }}
                                    placeholder="Room Id"
                                />
                            </Form.Item>
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
}

export default EditRoom;
