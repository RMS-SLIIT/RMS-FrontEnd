import React from "react";
import { Form, Col, Row } from "antd";
import Input from "../../atoms/Input/CustomInput";
import Modal from "../../organism/Modal/CustomModal";
import "./AddRoomBooking.css";
import {
    noSplCharRegex,
    onlyNumberRegex,
    phoneNumberRegex,
    priceRegex,
} from "../../../utils/regex";
import { roomBokingUpdateSuccess } from "../../../helper/helper";
import { updateRoomBooking } from "../../../services/roomBooking/roomBookingServices";

function EditInventory(props) {
    const {
        editData,
        setEditVisible,
        visible,
        handleOk,
        handleCancel,
        getRoomBookingDetails,
    } = props;
    const [form] = Form.useForm();
    let show = visible;

    form.setFieldsValue(editData && editData);

    const onFinish = (values) => {
        console.log("Success:", values);
        updateRoomBooking(values)
            .then((res) => {
                console.log(res);

                form.resetFields();
                roomBokingUpdateSuccess();

                getRoomBookingDetails();
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
            title="Edit Room Booking Detail"
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
                                label="Room Booking ID"
                                hidden={true}
                                name="id"
                            >
                                <Input
                                    disabled={true}
                                    style={{ width: "70%" }}
                                    placeholder="Room Booking Id"
                                />
                            </Form.Item>
                            <Form.Item
                                className="formItem"
                                rules={[
                                    {
                                        required: true,
                                        max: 30,
                                        message:
                                            "Sorry you are exceeding the limit!",
                                    },
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
                                        message: "Number Of Person",
                                    },
                                ]}
                                label="No of Person:  "
                                name="noOfPerson"
                            >
                                <Input placeholder="No Of Person" />
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
                                        message: "Enter valid Mobile Number",
                                    },
                                ]}
                                label="Mobile Number :  "
                                name="mobileNumber"
                            >
                                <Input placeholder="07x xxxx xxx" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        />
    );
}

export default EditInventory;
